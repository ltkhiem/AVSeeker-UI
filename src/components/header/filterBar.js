import React, { useState } from 'react'
import { AutoComplete, Input, notification } from 'antd';
import { fetchData } from '../../actions/fetchData';
import { connect } from 'react-redux'
import { FILTER_API, INTERACTIVE_QUESTION_API } from '../../constants/server';
import { NO_QUESTION_RESPONSE, RESPONSE_SUCCESS } from '../../constants/response';
import { handleRankedListResponse, handleStateTimelineResponse } from '../../helpers/responseHelper';
import { setImageSources, setStatePointer, addStateTimelineData, setStateTimeline } from '../../actions/actionFetchDataSources';
import { setIsLoadingSearch, setQueryData } from '../../actions/actionQueryData';
import { setInteractiveQuestion } from '../../actions/actionInteractiveQuestion';


const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat),
});


function FilterBar(props) {
    const [value, setValue] = useState('')
    const [options, setOptions] = useState([])


    const onSearch = (searchText) => {
        // setOptions(
        //     !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
        // )
    }


    const onSearchClick = () => {
        const currentState = props.stateTimeline.statePointer.value
        const stateId = props.stateTimeline.states[currentState].state

        const params = {
            user_id: props.userConfig.userId,
            state_id: stateId,
            query: value,
        }

        props.dispatch(setQueryData({
            stateId: stateId,
            query: value,
        }))

        props.dispatch(setIsLoadingSearch(true))

        props.dispatch(fetchData(FILTER_API, 'POST', params)).then((response) => {
            if (response.result !== RESPONSE_SUCCESS) {
                notification.error({
                    message: `Filter: ${response.result}`,
                    placement: 'bottomRight',
                })
            }

            const data = response.reply
            const method = "FILTER"

            // Update state timeline data
            const state = handleStateTimelineResponse(data.state_id, method, value)
            if (props.stateTimeline.statePointer.value === props.stateTimeline.states.length - 1) {
                // In case the pointer is still at the last state of the timeline
                const newStatePointer = {
                    value: props.stateTimeline.states.length,
                    previous: props.stateTimeline.statePointer.value
                }
                props.dispatch(setStatePointer(newStatePointer))
                props.dispatch(addStateTimelineData(state))
            }
            else {
                // In case the pointer was changed to a state other than the last state of the timeline
                const newStatePointer = {
                    value: props.stateTimeline.statePointer.value + 1,
                    previous: props.stateTimeline.statePointer.value
                }
                const states = [
                    ...props.stateTimeline.states.slice(0, props.stateTimeline.statePointer.value + 1),
                    state]
                props.dispatch(setStatePointer(newStatePointer))
                props.dispatch(setStateTimeline(states))
            }

            // Update rankedList data
            const rankedList = handleRankedListResponse(data.ranked_list)
            props.dispatch(setImageSources(rankedList))

            // Get new question
            const params = {
                state_id: data.state_id,
            }
            props.dispatch(fetchData(INTERACTIVE_QUESTION_API, 'POST', params)).then((response) => {
                if (response.result !== RESPONSE_SUCCESS) {
                    notification.error({
                        message: `Interactive Question: ${response.result}`,
                        placement: 'bottomRight',
                    })
                }
                const data = response.reply
                if (data.question === NO_QUESTION_RESPONSE) {
                    props.dispatch(setInteractiveQuestion(""))
                }
                else {
                    const newQuestion = data.question.split('/').pop()
                    props.dispatch(setInteractiveQuestion(newQuestion))
                }
            })
        })

    }


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
        >
            <Input.Search size="large" placeholder="Filter"
                enterButton
                onSearch={onSearchClick}
            />
        </AutoComplete>
    )
}


const mapStatesToProps = (state) => ({
    stateTimeline: state.stateTimeline,
    query: state.query,
    userConfig: state.userConfig,
})


export default connect(mapStatesToProps)(FilterBar);