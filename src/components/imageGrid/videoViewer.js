import React from 'react'
import { Modal } from 'antd'
import ReactPlayer from 'react-player'


function VideoViewer(props) {

    return (
        <Modal
            centered
            width={690}
            title={`Playing ${props.videoId}`}
            visible={props.visible}
            onOk={props.onOk}
            onCancel={props.onCancel}
            okText="Submit"
            cancelText="Close"
        >
            <ReactPlayer
                url={props.videoURL}/>
        </Modal>
    )
}


export default VideoViewer