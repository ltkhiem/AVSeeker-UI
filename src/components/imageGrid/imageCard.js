import React from 'react'
import { SendOutlined, SaveOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { Card, Typography, Image, Space } from 'antd'
import VideoViewer from './videoViewer';
import { IMAGE_SERVER } from '../../constants/server';


const { Text } = Typography

function ImageCard(props) {
    const [showVideo, setShowVideo] = React.useState(false);


    const onPlayButtonClicked = () => {
        console.log(`Play ${props.id}`)
        setShowVideo(true)
    }

    const onSubmitButtonClicked = () => {
        console.log(`Submit ${props.id}`)
        onCloseButtonClicked()
    }

    const onCloseButtonClicked = () => {
        // In case the user closes the video without submitting it
        setShowVideo(false)
    }

    return (
        <Card
            bordered
            style={{ width: 200, height: "100%"}}
            cover={
                <div style={{ height: 150, width: "100%" }}>
                    <Text strong style={{ marginLeft: 60, marginRight: 60 }}>Video {props.id}</Text> 
                    <Image src={props.sources[0]} />
                    <Space size={0}>
                        <Image 
                            style={{ width: "100%", height: "100%" }}
                            src={props.sources[1]} />
                        <Image 
                            style={{ width: "100%", height: "100%" }}
                            src={props.sources[2]} />
                    </Space>
                </div>
            }
            actions={[
                <SendOutlined key="send" onClick={onSubmitButtonClicked} />,
                <SaveOutlined key="save" />,
                <PlayCircleOutlined key="play" onClick={onPlayButtonClicked} />
            ]}
        >
            <VideoViewer 
                visible={showVideo} 
                videoURL={`${IMAGE_SERVER}/${props.videoId}`}
                onOk={onSubmitButtonClicked} 
                onCancel={onCloseButtonClicked} 
                videoId={props.videoId} />
        </Card>
    )
}

export default ImageCard;