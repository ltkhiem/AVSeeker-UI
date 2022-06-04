// import './image.css'
import { connect } from 'react-redux'
import { useState } from 'react'
import { fetchData } from '../../actions/fetchData';
import { DRES_SUBMIT_API } from '../../constants/server';
import { notification } from 'antd';
import { DRES_ERROR_RESPONSE, DRES_INCORRECT_SUBMISSION } from '../../constants/response'


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
            const splitString = props.src.split('/')
            const shotId = splitString[3]
            const frameId = splitString[4].split('_')[1]

            //Submit Result
            const submitURL = `${DRES_SUBMIT_API}?item=${shotId}&shot=${frameId}&session=${props.userConfig.sessionId}`
            props.dispatch(fetchData(submitURL, 'GET', {})).then((response) => {
                console.log(response)
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
                    transform: 'scale(1.5)',
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