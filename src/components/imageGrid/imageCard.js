import React from 'react'
import { SendOutlined, SaveOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { Card, Typography, Image, Space } from 'antd'
import { connect } from 'react-redux'
import { PLACEHOLDER_IMAGE, ERROR_IMAGE } from '../../constants/image';
import { setVideoModalVisible, setVideoModalData } from '../../actions/actionVideoViewer'


const { Text } = Typography

function ImageCard(props) {

    const onPlayButtonClicked = () => {
        console.log(`Play ${props.id}`)
        // Set VideoViewer data
        props.dispatch(setVideoModalData(props.id, props.videoId))
        // Show VideoViewer
        props.dispatch(setVideoModalVisible(true))
    }

    const onSubmitButtonClicked = () => {
        console.log(`Submit ${props.videoViewer.videoId}`)
    }

    return (
        <Card
            bordered
            style={{ width: 200, height: "100%" }}
            cover={
                <div style={{ height: 150, width: "100%" }}>
                    <Text strong style={{ marginLeft: 60, marginRight: 60 }}>Video {props.id}</Text>
                    <Image
                        style={{ width: 200, height: 100 }}
                        src={props.sources[0]}
                        fallback={ERROR_IMAGE}
                        placeholder={
                            <Image
                                preview={false}
                                src={PLACEHOLDER_IMAGE}
                                width={200}
                            />
                        }
                    />
                    <Space size={0}>
                        <Image
                            style={{ width: 100, height: 70 }}
                            src={props.sources[1]}
                            fallback={ERROR_IMAGE}
                            placeholder={
                                <Image
                                    preview={false}
                                    src={PLACEHOLDER_IMAGE}
                                    width={100}
                                    height={70}
                                />
                            }

                        />
                        <Image
                            style={{ width: 100, height: 70 }}
                            src={props.sources[2]}
                            fallback={ERROR_IMAGE}
                            placeholder={
                                <Image
                                    preview={false}
                                    src={PLACEHOLDER_IMAGE}
                                    width={100}
                                    height={70}
                                />
                            }
                        />
                    </Space>
                </div>
            }
            actions={[
                <SendOutlined key="send" onClick={onSubmitButtonClicked} />,
                <SaveOutlined key="save" />,
                <PlayCircleOutlined key="play" onClick={onPlayButtonClicked} />
            ]}
        >
        </Card>
    )
}


const mapStatesToProps = (state) => ({

})


export default connect(mapStatesToProps)(ImageCard);