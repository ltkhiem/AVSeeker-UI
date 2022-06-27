import { connect } from 'react-redux'
import { notification, Popover } from 'antd';
import HorizontalTimeline from 'react-horizontal-timeline';
import { setStatePointer, setImageSources, setStateTimeline } from '../../actions/actionFetchDataSources';
import { LOAD_STATE_TIMELINE_RESULT_API, INTERACTIVE_QUESTION_API } from '../../constants/server';
import { RESPONSE_SUCCESS, NO_QUESTION_RESPONSE } from '../../constants/response';
import { fetchData } from '../../actions/fetchData';
import { handleRankedListResponse } from '../../helpers/responseHelper';
import { setInteractiveQuestion } from '../../actions/actionInteractiveQuestion';
import { setIsLoadingSearch } from '../../actions/actionQueryData';
import { setNegativeItems, setPositiveItems, setVisualSimilaritySourcesVisible } from '../../actions/actionVisualSimilaritySearch';


function StateTimeline(props) {


    const onTimelineItemClicked = (index) => {
        // Click on an item on the timeline
        const method = props.stateTimeline.states[index].method

        if (method !== 'START') {
            if (index === props.stateTimeline.statePointer.value) {
                // Click on the same item
                // Do nothing
                if (props.visualSimilaritySources.visualSimilaritySourcesVisible) {
                    // Hide the visual similarity search scrollable panel and show the search/filter/active search panel
                    props.dispatch(setVisualSimilaritySourcesVisible(false))

                    // Reset positive and negative items for visual similarity search and relevant feedback
                    props.dispatch(setPositiveItems([]))
                    props.dispatch(setNegativeItems([]))
                }
                return
            }


            let params = {
                state_id: props.stateTimeline.states[index].state,
            }
            props.dispatch(setIsLoadingSearch(true))

            // Hide the visual similarity search scrollable panel
            props.dispatch(setVisualSimilaritySourcesVisible(false))

            // Reset positive and negative items for visual similarity search and relevant feedback
            props.dispatch(setPositiveItems([]))
            props.dispatch(setNegativeItems([]))


            props.dispatch(fetchData(LOAD_STATE_TIMELINE_RESULT_API, 'POST', params)).then((response) => {
                // Handle error response
                if (response.result !== RESPONSE_SUCCESS) {
                    notification.error({
                        message: `State timeline: ${response.result}`,
                        placement: "bottomRight",
                    })
                }

                const data = response.reply

                // Update ranked list data
                const rankedList = handleRankedListResponse(data.ranked_list)
                props.dispatch(setImageSources(rankedList))
                props.dispatch(setIsLoadingSearch(false))

                // Update state timeline
                props.dispatch(setStatePointer({
                    value: index,
                    previous: props.stateTimeline.statePointer.value
                }))

            })
            // Load corresponding question
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
                    props.dispatch(setInteractiveQuestion(""))
                }
                else {
                    const newQuestion = data.question.split('/').pop()
                    props.dispatch(setInteractiveQuestion(newQuestion))
                }
            })
        }
        else {
            props.dispatch(setIsLoadingSearch(true))

            // Hide the visual similarity search scrollable panel
            props.dispatch(setVisualSimilaritySourcesVisible(false))

            // Reset positive and negative items for visual similarity search and relevant feedback
            props.dispatch(setPositiveItems([]))
            props.dispatch(setNegativeItems([]))

            // Reset timeline
            const newStatePointer = {
                value: 0,
                previous: 0
            }
            props.dispatch(setStatePointer(newStatePointer))
            const newState = [{
                datetime: new Date().toLocaleString(),
                state: '',
                method: 'START',
                query: '',
            }]
            props.dispatch(setStateTimeline(newState))
            // Update ranked list data
            const rankedList = []
            props.dispatch(setImageSources(rankedList))
            // Reset question in active search
            props.dispatch(setInteractiveQuestion(""))
        }
    }

    return (
        <div style={{
            width: '100%',
            height: '100px',
            margin: '0 auto',
            backgroundColor: 'white'
        }}>
            <HorizontalTimeline
                styles={{
                    // background: "#f8f8f8",
                    background: "white",
                    foreground: "#1A79AD",
                    outline: "#dfdfdf",
                }}
                minEventPadding={60}
                maxEventPadding={120}
                index={props.stateTimeline.statePointer.value}
                labelWidth={100}
                getLabel={
                    (date, key) => {
                        return (
                            <Popover
                                title={props.stateTimeline.states[key].method}
                                content={props.stateTimeline.states[key].query}
                            >
                                <span>{props.stateTimeline.states[key].method}</span>
                            </Popover>
                        )
                    }
                }
                indexClick={(index) => onTimelineItemClicked(index)}
                values={
                    props.stateTimeline.states.map((item) => item.datetime)
                } />
        </div>
    )
}


const mapStatesToProps = (state) => ({
    query: state.query,
    visualSimilaritySources: state.visualSimilaritySources,
    stateTimeline: state.stateTimeline,
})


export default connect(mapStatesToProps)(StateTimeline)