import React, { useEffect } from 'react'
import { Button, Typography, Space, notification } from 'antd'
import { connect } from 'react-redux'
import { FILTER_API, INTERACTIVE_QUESTION_API } from '../constants/server'
import { setInteractiveChoice, setInteractiveQuestion } from '../actions/actionInteractiveQuestion'
import { fetchData } from '../actions/fetchData'
import { RESPONSE_SUCCESS, NO_QUESTION_RESPONSE } from '../constants/response'
import { handleRankedListResponse, handleStateTimelineResponse } from '../helpers/responseHelper'
import { setImageSources } from '../actions/actionFetchDataSources'
import { addStateTimelineData, setStatePointer, setStateTimeline } from '../actions/actionFetchDataSources'
import { setIsLoadingSearch, setQueryData } from '../actions/actionQueryData'
import { setVisualSimilaritySourcesVisible, setNegativeItems, setPositiveItems} from '../actions/actionVisualSimilaritySearch'


const { Text } = Typography


function InteractiveQuestionnairContainer(props) {

    const onActiveSearch = (questionQuery) => {
        // Get current state timeline
        const currentState = props.stateTimeline.statePointer.value
        let stateId = props.stateTimeline.states[currentState].state

        // Form params for query
        const params = {
            user_id: props.userConfig.userId,
            state_id: stateId,
            query: questionQuery,
        }

        // Set query
        props.dispatch(setQueryData({
            stateId: stateId,
            query: questionQuery,
        }))
        props.dispatch(setIsLoadingSearch(true))

        // Hide the visual similarity search scrollable panel
        props.dispatch(setVisualSimilaritySourcesVisible(false))
        // Reset positive and negative items for visual similarity search and relevant feedback
        props.dispatch(setPositiveItems([]))
        props.dispatch(setNegativeItems([]))

        // Query to filter 
        props.dispatch(fetchData(FILTER_API, 'POST', params)).then((response) => {
            if (response.result !== RESPONSE_SUCCESS) {
                notification.error({
                    message: `Active Search: ${response.result}`,
                    placement: 'bottomRight',
                })
                return
            }
            const data = response.reply
            const method = "ACTIVE_SEARCH"

            // Update state timeline data
            const state = handleStateTimelineResponse(data.state_id, method, questionQuery)
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
                    return
                }
                const data = response.reply
                if (data.question === NO_QUESTION_RESPONSE) {
                    // No question
                    props.dispatch(setInteractiveQuestion(""))
                }
                else {
                    const newQuestion = data.question.split('/').pop()
                    props.dispatch(setInteractiveQuestion(newQuestion))
                }
            })
        })
    }


    const onYesButtonClicked = () => {
        props.dispatch(setInteractiveChoice("YES"))
        const question = props.interactiveQuestion.question
        const query = `${question};;`
        onActiveSearch(query)
    }

    const onNoButtonClicked = () => {
        props.dispatch(setInteractiveChoice("NO"))
        const question = props.interactiveQuestion.question
        const query = `-${question};;`
        onActiveSearch(query)
    }

    return (
        <>
            <Space>
                <Text style={{ color: "white" }} strong>
                    {/* This is a really long long long long long long long question. */}
                    Question:
                </Text>

                <Text style={{ color: "white" }} strong>
                    {props.interactiveQuestion.question === '' ? 'None' : `Is there a ${props.interactiveQuestion.question}?`}
                </Text>
                <Button
                    type="primary"
                    style={{ width: 60, height: 35 }}
                    disabled={props.interactiveQuestion.question === '' ? true : false}
                    onClick={onYesButtonClicked}
                >Yes</Button>
                <Button
                    type="primary"
                    style={{ width: 60, height: 35 }}
                    disabled={props.interactiveQuestion.question === '' ? true : false}
                    onClick={onNoButtonClicked}
                    danger>No</Button>
            </Space>
        </>
    )
}


const mapStatesToProps = (state) => ({
    interactiveQuestion: state.interactiveQuestion,
    stateTimeline: state.stateTimeline,
    query: state.query,
    userConfig: state.userConfig,
})


export default connect(mapStatesToProps)(InteractiveQuestionnairContainer);