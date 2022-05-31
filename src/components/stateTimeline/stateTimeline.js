import { connect } from 'react-redux'
import { notification, Popover } from 'antd';
import HorizontalTimeline from 'react-horizontal-timeline';
import { setStatePointer, setImageSources } from '../../actions/actionFetchDataSources';
import { LOAD_STATE_TIMELINE_RESULT_API } from '../../constants/server';
import { RESPONSE_SUCCESS } from '../../constants/response';
import { fetchData } from '../../actions/fetchData';
import { handleRankedListResponse } from '../../helpers/responseHelper';


function StateTimeline(props) {

    return (
        <div style={{
            width: '100%',
            height: '100px',
            margin: '0 auto',
            backgroundColor: 'white'
        }}>
            <HorizontalTimeline
                styles={{
                    background: "#f8f8f8",
                    foreground: "#1A79AD",
                    outline: "#dfdfdf",
                }}

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
                indexClick={(index) => {

                    const method = props.stateTimeline.states[index].method
                    let rankedList = []

                    if (method !== 'START') {
                        const params = {
                            state_id: props.stateTimeline.states[index].state,
                        }

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
                            rankedList = handleRankedListResponse(data.ranked_list)
                            props.dispatch(setImageSources(rankedList))
                        })
                    }
                    else {
                        // Update ranked list data
                        props.dispatch(setImageSources(rankedList))
                    }


                    // Update state timeline
                    props.dispatch(setStatePointer({
                        value: index,
                        previous: props.stateTimeline.statePointer.value
                    }))
                }}
                values={
                    props.stateTimeline.states.map((item) => item.datetime)
                } />
        </div>
    )
}


const mapStatesToProps = (state) => ({
    query: state.query,
    stateTimeline: state.stateTimeline,
})


export default connect(mapStatesToProps)(StateTimeline)