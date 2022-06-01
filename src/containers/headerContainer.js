import React from 'react';
import FilterBar from '../components/header/filterBar';
import SearchBar from '../components/header/searchBar';
import { Row, Col, Divider, Space } from 'antd'
import InteractiveQuestionnairContainer from './interactiveQuestionnaireContainer';


function HeaderContainer(props) {
    return (
        <>
            <Row 
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                justify='start' style={props.style} wrap={true}>
                <Col flex="auto">
                    <Space size={100} align="baseline" wrap={true}>
                        <SearchBar style={{ width: 350, bottom: 8, left: 50 }} />
                        <FilterBar style={{ width: 350, bottom: 8, right: -50 }}/>
                    </Space>
                </Col>
                <Col flex="380px">
                    <InteractiveQuestionnairContainer />
                </Col>
            </Row>
        </>
   )
}


export default HeaderContainer;