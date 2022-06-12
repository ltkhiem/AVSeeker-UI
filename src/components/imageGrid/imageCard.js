import React from 'react'
import { SendOutlined, UnorderedListOutlined, PlayCircleOutlined, NotificationOutlined, KeyOutlined } from '@ant-design/icons';
import { Card, Typography, Space, notification } from 'antd'
import { connect } from 'react-redux'
import { ERROR_IMAGE } from '../../constants/image';
import { setVideoModalVisible, setVideoModalData } from '../../actions/actionVideoViewer'
import LazyLoad from 'react-lazyload'
import { setImageListModalVisible, setImageListVideoId, setModalFramesList } from '../../actions/actionImageListModal';
import { fetchData } from '../../actions/fetchData';
import { GET_SHOT_KEYFRAMES_API } from '../../constants/server';
import { RESPONSE_SUCCESS } from '../../constants/response';
import { handleKeyframesResponse } from '../../helpers/responseHelper';
import { setKeyframesRankedListModalVisible, setKeyframesRankedListVideoId, setModalKeyframesRankedList } from '../../actions/actionKeyframesRankedListModal';
import Image from './image'


const { Text } = Typography

function ImageCard(props) {

    const onPlayButtonClicked = () => {
        // Set VideoViewer data
        props.dispatch(setVideoModalData(props.videoId, props.videoSrc))
        // Show VideoViewer
        props.dispatch(setVideoModalVisible(true))
    }

    const onShowImagesButtonClicked = () => {
        const params = {
            shot_id: props.videoId
        }
        props.dispatch(fetchData(GET_SHOT_KEYFRAMES_API, 'POST', params)).then((response) => {
            if (response.result !== RESPONSE_SUCCESS) {
                notification.error({
                    message: `Get keyframes: ${response.result}`,
                    placement: 'bottomRight',
                })
                return
            }
            const data = response.reply
            const keyframesList = handleKeyframesResponse(data.keyframes_list, props.videoId)
            props.dispatch(setModalFramesList(keyframesList))
            props.dispatch(setImageListVideoId(props.videoId))
            props.dispatch(setImageListModalVisible(true))
        })
    }

    const onSubmitButtonClicked = (index) => {
        console.log(`Submit ${props.videoViewer.videoId}`)
        // console.log(`Submit ${props.sources[index]}`)
    }

    const onShowKeyframesRankedList = () => {
        props.dispatch(setModalKeyframesRankedList(props.sources))
        props.dispatch(setKeyframesRankedListVideoId(props.videoId))
        props.dispatch(setKeyframesRankedListModalVisible(true))
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
                        <Text strong style={{ marginLeft: 60, marginRight: 50 }}>Video {props.videoId}</Text>
                        <Image
                            style={{ width: 200, height: 100, transform: "scale(1)" }}
                            src={props.sources[0]}
                        />
                        <Space size={0}>
                            <Image
                                style={{ width: 100, height: 70, transform: "scale(1)" }}
                                src={props.sources[1] !== undefined ? props.sources[1] : ERROR_IMAGE}
                            />
                            <Image
                                style={{ width: 100, height: 70, transform: "scale(1)" }}
                                src={props.sources[2] !== undefined ? props.sources[2] : ERROR_IMAGE}
                            />
                        </Space>
                    </div>
                }
                actions={[
                    <KeyOutlined key="key" onClick={onShowKeyframesRankedList} />,
                    // <SendOutlined key="send" onClick={onSubmitButtonClicked} />,
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