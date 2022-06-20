import { connect } from 'react-redux'
import { Space, Button, Popover, Row, Col } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons';


function PopOverHelper(props) {

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
                    <Row
                        justify='space-between'>
                        <b>W + Left Click</b> &emsp; Choose Negative
                    </Row>
                    <Row
                        justify='space-between'>
                        <b>R + Left Click</b> &emsp; Choose Positive
                    </Row>

                </Col>
            </Space>
        )
    }

    return (
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
                    // paddingRight: 15
                }}
            >
            </Button>
        </Popover>
    )
}


const mapStatesToProps = (state) => ({

})

export default connect(mapStatesToProps)(PopOverHelper);