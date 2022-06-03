import React from 'react'
import { SendOutlined, UnorderedListOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { Card, Typography, Image, Space, Spin } from 'antd'
import { connect } from 'react-redux'
import { PLACEHOLDER_IMAGE, ERROR_IMAGE } from '../../constants/image';
import { setVideoModalVisible, setVideoModalData } from '../../actions/actionVideoViewer'
import LazyLoad from 'react-lazyload'


const { Text } = Typography

function ImageCard(props) {

    const onPlayButtonClicked = () => {
        // Set VideoViewer data
        props.dispatch(setVideoModalData(props.frameId, props.videoId))
        // Show VideoViewer
        props.dispatch(setVideoModalVisible(true))
    }

    const onShowImagesButtonClicked = () => {
        console.log("Show Images")
    }

    const onSubmitButtonClicked = () => {
        console.log(`Submit ${props.videoViewer.videoId}`)
    }

    return (
        <LazyLoad
            height={200}
            once
            overflow={true}
            offset={1000}
            scrollContainer={props.scrollContainer}
            debounce={false}
        >
            <Card
                bordered
                style={{ width: 200, height: "100%" }}
                // style={props.style}
                cover={
                    <div style={{ height: 150, width: "100%" }}>
                        <Text strong style={{ marginLeft: 60, marginRight: 60 }}>Video {props.frameId}</Text>
                        <Image
                            style={{ width: 200, height: 100 }}
                            src={props.sources[0]}
                            fallback={ERROR_IMAGE}
                            placeholder={true}
                        />
                        <Space size={0}>
                            <Image
                                style={{ width: 100, height: 70 }}
                                src={props.sources[1]}
                                fallback={ERROR_IMAGE}
                                placeholder={true}
                            />
                            <Image
                                style={{ width: 100, height: 70 }}
                                src={props.sources[2]}
                                fallback={ERROR_IMAGE}
                                placeholder={true}
                            />
                        </Space>
                    </div>
                }
                actions={[
                    <SendOutlined key="send" onClick={onSubmitButtonClicked} />,
                    <UnorderedListOutlined key="images" onClick={onShowImagesButtonClicked} />,
                    <PlayCircleOutlined key="play" onClick={onPlayButtonClicked} />
                ]}
            >
            </Card>
        </LazyLoad>
    )
}


const mapStatesToProps = (state) => ({

})


export default connect(mapStatesToProps)(ImageCard);