import React, { useEffect } from 'react'
import { Button, Typography, Space, notification } from 'antd'
import { connect } from 'react-redux'
import { FILTER_API, COMPREHENSION_FILTER_API } from '../constants/server'
import { setComprehensionFilter} from '../actions/actionComprehensionFilter'
import { fetchData } from '../actions/fetchData'
import { RESPONSE_SUCCESS, NO_QUESTION_RESPONSE } from '../constants/response'
import { handleRankedListResponse, handleStateTimelineResponse } from '../helpers/responseHelper'
import { setImageSources } from '../actions/actionFetchDataSources'
import { addStateTimelineData, setStatePointer, setStateTimeline } from '../actions/actionFetchDataSources'
import { setIsLoadingSearch, setQueryData } from '../actions/actionQueryData'
import { setVisualSimilaritySourcesVisible, setNegativeItems, setPositiveItems} from '../actions/actionVisualSimilaritySearch'


const { Text } = Typography


function ComprehensionFilterContainer(props) {

    const onComprehensionFilter = (rclevel) => {
        // Get current state timeline
        const currentState = props.stateTimeline.statePointer.value
        let stateId = props.stateTimeline.states[currentState].state

        // Form params for query
        const params = {
            user_id: props.userConfig.userId,
            state_id: stateId,
            level: rclevel,
        }

        props.dispatch(setIsLoadingSearch(true))

        // Hide the visual similarity search scrollable panel
        props.dispatch(setVisualSimilaritySourcesVisible(false))
        // Reset positive and negative items for visual similarity search and relevant feedback
        props.dispatch(setPositiveItems([]))
        props.dispatch(setNegativeItems([]))

        // Query to filter 
        props.dispatch(fetchData(COMPREHENSION_FILTER_API, 'POST', params)).then((response) => {
            if (response.result !== RESPONSE_SUCCESS) {
                notification.error({
                    message: `Comprehension Filter: ${response.result}`,
                    placement: 'bottomRight',
                })
                return
            }
            const data = response.reply
            const method = "ACTIVE_SEARCH"

            // Update state timeline data
            const state = handleStateTimelineResponse(data.state_id, method, rclevel)
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

            // Update ranked list
            const rankedList = handleRankedListResponse(data.ranked_list)
            props.dispatch(setImageSources(rankedList))
            props.dispatch(setIsLoadingSearch(false))
        })
    }


    const onLowButtonClicked = () => {
        props.dispatch(setComprehensionFilter("low"))
        onComprehensionFilter("low")
    }

    const onMediumButtonClicked = () => {
        props.dispatch(setComprehensionFilter("medium"))
        onComprehensionFilter("medium")
    }

    const onHighButtonClicked = () => {
        props.dispatch(setComprehensionFilter("high"))
        onComprehensionFilter("high")
    }

    return (
        <>
            <Space>
                <Text style={{ color: "white" }} strong>
                   Comprehension Level:  
                </Text>
                <Button
                    type="primary"
                    style={{ width: 80, height: 35 }}
                    onClick={onLowButtonClicked}
	    	    danger>Low</Button>
                <Button
                    type="info"
                    style={{ width: 80, height: 35 }}
                    onClick={onMediumButtonClicked}
                    info>Medium</Button>
                <Button
                    type="primary"
                    style={{ width: 80, height: 35 }}
                    onClick={onHighButtonClicked}
                    >High</Button>
            </Space>
        </>
    )
}


const mapStatesToProps = (state) => ({
    comprehensionFilter: state.comprehensionFilter,
    stateTimeline: state.stateTimeline,
    query: state.query,
    userConfig: state.userConfig,
})


export default connect(mapStatesToProps)(ComprehensionFilterContainer);
