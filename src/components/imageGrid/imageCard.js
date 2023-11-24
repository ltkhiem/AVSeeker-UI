import React from 'react'
import { SendOutlined, UnorderedListOutlined, PlayCircleOutlined, NotificationOutlined, KeyOutlined } from '@ant-design/icons';
import { Card, Typography, Space, notification } from 'antd'
import { connect } from 'react-redux'
import { ERROR_IMAGE } from '../../constants/image';
import { setVideoModalVisible, setVideoModalData } from '../../actions/actionVideoViewer'
import LazyLoad from 'react-lazyload'
import { setAllDayMomentsList } from '../../actions/actionGetAllDayMoments';
import { fetchData } from '../../actions/fetchData';
import { GET_ALL_IMAGES_BY_DATE } from '../../constants/server';
import { RESPONSE_SUCCESS } from '../../constants/response';
import { handleGetAllDayMomentsRepsonse } from '../../helpers/responseHelper';
import MomentItem from './momentItem'
import moment from 'moment'
import ImageListModal from './imageListModal';
import { useState } from 'react'
import { DRES_ERROR_RESPONSE, DRES_INCORRECT_SUBMISSION } from '../../constants/response';
import { DRES_SUBMIT_API } from '../../constants/server';


const { Text } = Typography

function ImageCard(props) {
    const [momentsRankedListModalVisible, setMomentsRankedListModalVisible] = useState(false)
    const [allDayMomentsModalVisible, setAllDayMomentsModalVisible] = useState(false)

    const onPlayButtonClicked = () => {
        // Set VideoViewer data
        props.dispatch(setVideoModalData(props.videoId, props.videoSrc))
        // Show VideoViewer
        props.dispatch(setVideoModalVisible(true))
    }

    const onShowImagesButtonClicked = () => {
        const dateInfo = props.clusterId.split(' ')[0].split('/')
        const date = `${dateInfo[2]}${dateInfo[1]}/${dateInfo[0]}` // YYYYMM/DD
        const params = {
            date_id: date
        }
        props.dispatch(fetchData(GET_ALL_IMAGES_BY_DATE, 'POST', params)).then((response) => {
            if (response.result !== RESPONSE_SUCCESS) {
                notification.error({
                    message: `Get all day moments: ${response.result}`,
                    placement: 'bottomRight',
                })
                return
            }
            setAllDayMomentsModalVisible(true)
            const data = response.reply
            const momentsList = handleGetAllDayMomentsRepsonse(data.image_list, data.dataset_path)
            props.dispatch(setAllDayMomentsList(momentsList))
        })
    }

    const onSubmitButtonClicked = (index) => {
        console.log(`Submit ${props.videoViewer.videoId}`)
        // console.log(`Submit ${props.sources[index]}`)
    }

    const onShowRankedListMoments = () => {
        // Assign new list
        setMomentsRankedListModalVisible(true)
    }

    const onAllMomentsSubmitButtonClicked = (sources) => {
        // Submit all the moments in the ranked list
        const totalItems = sources.length
        sources.map((source, index) => {
            const submitURL = `${DRES_SUBMIT_API}?item=${source.id}&session=${props.userConfig.sessionId}`
            props.dispatch(fetchData(submitURL, 'GET', {})).then((response) => {
                if (response !== undefined && response.status !== DRES_ERROR_RESPONSE) {
                    const { status, description, submission } = response
                    if (submission !== DRES_INCORRECT_SUBMISSION) {
                        // Submit successfully
                    }
                }
            })
        })
        notification.success({
            message: `Submit ${totalItems}/${totalItems}`,
            placement: 'bottomRight',
        })
    }


    return (
        <LazyLoad
            height={500}
            once
            overflow={true}
            offset={1000}
            scrollContainer={props.scrollContainer}
            debounce={false}
        >
            <Card
                bordered
                style={{ width: 500, height: "100%" }}
                cover={
                    <div style={{ height: 425, width: "100%", textAlign: "center" }}>
                        <Text strong>{props.clusterId}</Text>
                        <MomentItem
                            style={{
                                width: 500,
                                border: "1px solid #e8e8e8",
                                paddingLeft: 5,
                                paddingRight: 5,
                                paddingBottom: 5,
                                textAlign: "center",
                            }}
                            imageStyle={{ width: 480, height: 270, transform: "scale(2)" }}
                            imgSrc={props.sources[0].path}
                            id={props.sources[0].id}
                            title={moment(props.sources[0].id, 'YYYYMMDD_hhmmss').format('LTS')} // Only get the time
                        />
                        <Space size={0}>
                            <MomentItem
                                style={{
                                    width: 245,
                                    border: "1px solid #e8e8e8",
                                    paddingLeft: 0,
                                    paddingRight: 5,
                                    paddingBottom: 5,
                                    textAlign: "center"
                                }}
                                imageStyle={{
                                    height: 126,
                                    width: 224,
                                    transform: "scale(4)",
                                }}
                                imgSrc={props.sources[1] !== undefined ? props.sources[1].path : ERROR_IMAGE}
                                id={props.sources[1] !== undefined ? props.sources[1].id : ''}
                                title={props.sources[1] !== undefined ? moment(props.sources[1].id, 'YYYYMMDD_hhmmss').format('LTS') : ''} // Only get the time
                            />
                            <MomentItem
                                style={{
                                    width: 245,
                                    border: "1px solid #e8e8e8",
                                    paddingLeft: 5,
                                    paddingRight: 0,
                                    paddingBottom: 5,
                                    textAlign: "center"
                                }}
                                imageStyle={{
                                    height: 126,
                                    width: 224,
                                    transform: "scale(4)",
                                }}
                                imgSrc={props.sources[2] !== undefined ? props.sources[2].path : ERROR_IMAGE}
                                id={props.sources[2] !== undefined ? props.sources[2].id : ''}
                                title={props.sources[2] !== undefined ? moment(props.sources[2].id, 'YYYYMMDD_hhmmss').format('LTS') : ''} // Only get the time
                            />
                        </Space>
                    </div>
                }
                actions={[
                    <KeyOutlined key="key" onClick={onShowRankedListMoments} />,
                    // <SendOutlined key="send" onClick={onSubmitButtonClicked} />,
                    <UnorderedListOutlined key="images" onClick={onShowImagesButtonClicked} />,
                    // <PlayCircleOutlined key="play" onClick={onPlayButtonClicked} />
                ]}
            >
                {/* Show all the moments on a day */}
                <ImageListModal
                    visible={allDayMomentsModalVisible}
                    clusterId={props.clusterId}
                    moments={props.allDayMomentsModal.momentsList}
                    title={`All moments of the date ${props.clusterId}`}
                    onCancel={() => setAllDayMomentsModalVisible(false)}
                    onOk={() => onAllMomentsSubmitButtonClicked(props.allDayMomentsModal.momentsList)}
                />

                {/* Show all the moments on a ranked list */}
                <ImageListModal
                    visible={momentsRankedListModalVisible}
                    clusterId={props.clusterId}
                    moments={props.sources}
                    title={`All the moments in the ranked list of ${props.clusterId}`}
                    onCancel={() => setMomentsRankedListModalVisible(false)}
                    onOk={() => onAllMomentsSubmitButtonClicked(props.sources)}
                />
            </Card>
        </LazyLoad>
    )
}


const mapStatesToProps = (state) => ({
    userConfig: state.userConfig,
    allDayMomentsModal: state.allDayMomentsModal,
})


export default connect(mapStatesToProps)(ImageCard);
