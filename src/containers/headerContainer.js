import React, { useState } from 'react';
import FilterBar from '../components/header/filterBar';
import SearchBar from '../components/header/searchBar'
import { Row, Col, Space, Button, notification, Popover } from 'antd'
import { SettingOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import InteractiveQuestionnairContainer from './interactiveQuestionnaireContainer';
import ConfigModal from '../components/header/configModal';
import { fetchData } from '../actions/fetchData';
import { DRES_LOGIN_API } from '../constants/server';
import { setSessionInfo, setUserId } from '../actions/actionUserConfig';
import { connect } from 'react-redux'





function HeaderContainer(props) {
    const [configModalVisible, setConfigModalVisible] = useState(false);

    const onCancelConfigModalButtonClicked = () => {
        setConfigModalVisible(false);
    }

    const popOverComponent = () => {
        return (
            <Space>
                <Col>
                    <Row
                        justify='space-between'>
                        <b>X + Hover</b> &emsp; Zoom
                    </Row>
                    <Row
                        justify='space-between'>
                        <b>S + Left Click</b> &emsp; Submit
                    </Row>
                </Col>
            </Space>
        )
    }

    const onUserConfigSubmit = (values) => {
        const vbsUsername = values.vbs_username
        const password = values.password
        const avseekerUsername = values.avseeker_username

        const params = {
            'username': vbsUsername,
            'password': password,
        }

        props.dispatch(fetchData(DRES_LOGIN_API, 'POST', params)).then((response) => {
            if (response !== undefined) {
                notification.success({
                    message: 'Login Success!',
                    placement: 'bottomRight',
                })

                // Set session info to the store
                props.dispatch(setSessionInfo(response))
                props.dispatch(setUserId(avseekerUsername))

                // Add session info to the local storage
                localStorage.setItem('sessionId', response.sessionId)
                localStorage.setItem('userId', avseekerUsername)
            }
            else {
                notification.error({
                    message: `Login Failed!`,
                    placement: 'bottomRight',
                })
            }
        })

        onCancelConfigModalButtonClicked()
    }

    return (
        <>
            <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                justify='start' style={props.style} wrap={true}>
                <Col flex="auto">
                    <Space size={100} align="baseline" wrap={true}>
                        <SearchBar style={{ width: 350, bottom: 8, left: 50 }} />
                        <FilterBar style={{ width: 350, bottom: 8, right: -50 }} />
                    </Space>
                </Col>
                <Col flex="420px">
                    <InteractiveQuestionnairContainer />
                </Col>
                <Col flex="130px">
                    <Space wrap={true} align="baseline" size={4}>
                        <Popover
                            title={'User Interaction Information'}
                            content={popOverComponent}
                            placement="bottomRight"
                        >
                            <Button
                                type="ghost"
                                icon={<QuestionCircleOutlined />}
                                style={{
                                    height: 30,
                                    color: "white",
                                    border: "none",
                                    paddingRight: 15
                                }}
                            >
                            </Button>
                        </Popover>
                        <Button
                            type="ghost"
                            icon={<SettingOutlined />}
                            style={{
                                height: 30,
                                color: "white",
                                border: "none",
                            }}
                            onClick={() => { setConfigModalVisible(true) }}
                        />
                    </Space>
                </Col>
            </Row>
            {/* <-- ConfigModal -- > */}
            <ConfigModal
                visible={configModalVisible}
                onCancel={onCancelConfigModalButtonClicked}
                onUserConfigSubmit={onUserConfigSubmit}
            />
        </>
    )
}


const mapStatesToProps = (state) => ({

})


export default connect(mapStatesToProps)(HeaderContainer);