// import './image.css'
import { connect } from 'react-redux'
import { useState } from 'react'
import { fetchData } from '../../actions/fetchData';
import { DRES_SUBMIT_API, GET_TEMPORAL_IMAGES_API } from '../../constants/server';
import { notification } from 'antd';
import { DRES_ERROR_RESPONSE, DRES_INCORRECT_SUBMISSION, RESPONSE_SUCCESS } from '../../constants/response'
import { setMomentTimeline, setMomentTimelineImageId, setMomentTimelineVisible } from '../../actions/actionMomentTimeline';
import { handleGetTemporalImages } from '../../helpers/responseHelper';


function Image(props) {
    const [mouseOver, setMouseOver] = useState(false)

    const onMouseOver = () => {
        if (props.general.isPressX === true) {
            setMouseOver(true)
        }
        else {
            setMouseOver(false)
        }
    }

    const onMouseDown = () => {
        if (props.general.isPressS === true) {
            //Submit Result
            const submitURL = `${DRES_SUBMIT_API}?item=${props.id}&session=${props.userConfig.sessionId}`
            props.dispatch(fetchData(submitURL, 'GET', {})).then((response) => {
                if (response === undefined || response.status === DRES_ERROR_RESPONSE) {
                    notification.error({
                        message: `Submit: ${response === undefined ? "Unauthorized Request" : response.description}`,
                        placement: 'bottomRight',
                    })
                }
                else {
                    const { status, description, submission } = response
                    if (submission !== DRES_INCORRECT_SUBMISSION) {
                        notification.success({
                            message: `Submit: ${description}`,
                            placement: 'bottomRight',
                        })
                    }
                    else {
                        notification.error({
                            message: `Submit: ${description}`,
                            placement: 'bottomRight',
                        })
                    }
                }
            })
        }
        else if (props.general.isPressT === true) {
            // Show moment timeline of this image
            const NUM_MOMENTS_BEFORE_AND_AFTER = 50
            const params = {
                image_id: props.id,
                limit: NUM_MOMENTS_BEFORE_AND_AFTER,
            }
            props.dispatch(fetchData(GET_TEMPORAL_IMAGES_API, 'POST', params)).then((response) => {
                if (response.result === RESPONSE_SUCCESS) {
                    const data = response.reply
                    const currentMoment = {
                        id: props.id,
                        path: props.src
                    }
                    const momentsList = handleGetTemporalImages(data.prev_list, currentMoment, data.next_list)
                    props.dispatch(setMomentTimeline(momentsList))
                    props.dispatch(setMomentTimelineImageId(props.id))
                    props.dispatch(setMomentTimelineVisible(true))
                }
            })
        }
    }

    const onMouseOut = () => {
        if (mouseOver === true) {
            setMouseOver(false)
        }
    }

    return (
        <img
            className='image-item'
            style={
                mouseOver === true ? {
                    width: props.style.width,
                    height: props.style.height,
                    transform: 'scale(2.5)',
                    zIndex: 1,
                    overflow: 'hidden',
                    position: "relative"
                } : {
                    width: props.style.width,
                    height: props.style.height,
                    transform: 'scale(1)',
                    overflow: 'hidden',
                }
            }
            src={props.src}
            loading={props.loading}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onMouseDown={onMouseDown}
        />
    )
}

const mapStatesToProps = (state) => ({
    general: state.general,
    userConfig: state.userConfig,
})


export default connect(mapStatesToProps)(Image);