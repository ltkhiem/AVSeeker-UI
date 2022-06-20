import React, { useState } from 'react';
import FilterBar from '../components/header/filterBar';
import SearchBar from '../components/header/searchBar'
import { Row, Col, Space, notification, Button } from 'antd'
import InteractiveQuestionnairContainer from './interactiveQuestionnaireContainer';
import ConfigModal from '../components/header/configModal';
import { fetchData } from '../actions/fetchData';
import { DRES_LOGIN_API } from '../constants/server';
import { setSessionInfo, setUserId } from '../actions/actionUserConfig';
import { connect } from 'react-redux'
import { SettingOutlined } from '@ant-design/icons';
import PopOverHelper from '../components/header/popOverHelper';
import VisualSimilaritySearchButton from '../components/header/visualSimilaritySearchButton';


function HeaderContainer(props) {
    const [configModalVisible, setConfigModalVisible] = useState(false);

    const onCancelConfigModalButtonClicked = () => {
        setConfigModalVisible(false);
    }

    const onUserConfigSubmit = (values) => {
        const lscUsername = values.lsc_username
        const password = values.password
        const lifeseekerUsername = values.lifeseeker_username

        const params = {
            'username': lscUsername,
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
                props.dispatch(setUserId(lifeseekerUsername))

                // Add session info to the local storage
                localStorage.setItem('sessionId', response.sessionId)
                localStorage.setItem('userId', lifeseekerUsername)
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

                {/* Search and Filter box */}
                <Col flex="auto">
                    <Space size={100} align="baseline" wrap={true}>
                        <SearchBar style={{ width: 350, bottom: 8, left: 50 }} />
                        <FilterBar style={{ width: 350, bottom: 8, right: -50 }} />
                    </Space>
                </Col>

                {/* Active Search */}
                <Col flex="420px">
                    <InteractiveQuestionnairContainer />
                </Col>

                {/* Setting & Utilities */}
                <Col flex="165px">
                    <Space wrap={true} align="baseline" size={4}>
                        <VisualSimilaritySearchButton />

                        {/* Popover Helper */}
                        <PopOverHelper />

                        {/* Login Button  */}
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