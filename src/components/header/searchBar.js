import React, { useState, useRef, useEffect } from 'react'
import { AutoComplete, Input, notification } from 'antd';
import { fetchData } from '../../actions/fetchData';
import { connect } from 'react-redux'
import { SEARCH_API, INTERACTIVE_QUESTION_API } from '../../constants/server';
import { NO_QUESTION_RESPONSE, RESPONSE_SUCCESS } from '../../constants/response';
import { handleRankedListResponse, handleStateTimelineResponse } from '../../helpers/responseHelper';
import { setImageSources, setStateTimeline, setStatePointer } from '../../actions/actionFetchDataSources';
import { setIsLoadingSearch, setQueryData } from '../../actions/actionQueryData';
import { setPositiveItems, setNegativeItems } from '../../actions/actionVisualSimilaritySearch';
import { setVisualSimilaritySourcesVisible } from '../../actions/actionVisualSimilaritySearch';


import { setTriggerSearch } from '../../actions/actionTriggerSearch';

const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat),
});


function SearchBar(props) {
    const searchRef = useRef(null);
    const firstUpdate = useRef(true);
    const [value, setValue] = useState('')
    const [options, setOptions] = useState([])


    const onSearch = (searchText) => {
        // setOptions(
        //     !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
        // )
    }

    const onSearchClick = () => {
        searchRef.current.blur() // Prevent autofocus

        const params = {
            user_id: props.userConfig.userId,
            state_id: "",
            query: value,
        }

        props.dispatch(setQueryData({
            stateId: "",
            query: value,
        }))

        props.dispatch(setIsLoadingSearch(true))

         // Hide the visual similarity search scrollable panel
        props.dispatch(setVisualSimilaritySourcesVisible(false))

        // Reset positive and negative items for visual similarity search and relevant feedback
        props.dispatch(setPositiveItems([]))
        props.dispatch(setNegativeItems([]))


        props.dispatch(fetchData(SEARCH_API, 'POST', params)).then((response) => {
            if (response.result !== RESPONSE_SUCCESS) {
                notification.error({
                    message: `Filter: ${response.result}`,
                    placement: 'bottomRight',
                })
                return
            }

            const data = response.reply
            const method = "SEARCH"

            // Update state timeline data
            // Reset timeline
            const newStatePointer = {
                value: 1,
                previous: 0
            }
            props.dispatch(setStatePointer(newStatePointer))
            const state = handleStateTimelineResponse(data.state_id, method, value) // value parameter here is the query
            const newState = [{
                datetime: new Date().toLocaleString(),
                state: '',
                method: 'START',
                query: '',
            }, state]
            props.dispatch(setStateTimeline(newState))

            // Update rankedList data
            const rankedList = handleRankedListResponse(data.ranked_list)
            props.dispatch(setImageSources(rankedList))
            props.dispatch(setIsLoadingSearch(false))
        })

    }


    useEffect(() => {
	if (firstUpdate.current) {
	     firstUpdate.current = false;
	} else {
	     if (props.triggerSearch.triggerSearch) {
		onSearchClick();
	     }
	}
    }, [props.triggerSearch])


    const onSelect = (data) => {
        console.log('onSelect', data)
    }

    const onChange = (data) => {
        setValue(data)
    }

    return (
        <AutoComplete
            dropdownMatchSelectWidth={252}
            value={value}
            options={options}
            style={props.style}
            onSelect={onSelect}
            onSearch={onSearch}
            onChange={onChange}
            ref={searchRef}
        >
            <Input.Search size="large" placeholder="Search" enterButton
                onSearch={onSearchClick}
            />
        </AutoComplete>
    )
}

const mapStatesToProps = (state) => ({
    stateTimeline: state.stateTimeline,
    query: state.query,
    userConfig: state.userConfig,
    triggerSearch: state.triggerSearch,
})

export default connect(mapStatesToProps)(SearchBar);
