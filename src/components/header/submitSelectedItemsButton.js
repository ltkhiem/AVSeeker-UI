import { SendOutlined } from "@ant-design/icons"
import { Button, Popover, notification } from "antd"
import { connect } from 'react-redux'
import { DRES_SUBMIT_API } from '../../constants/server'
import { DRES_ERROR_RESPONSE, DRES_INCORRECT_SUBMISSION } from '../../constants/response'
import { fetchData } from '../../actions/fetchData'


function SubmitSelectedItemsButton(props) {

    const submitSelectedItems = () => {
        const totalItems = props.visualSimilarityQuery.positiveItems.length
        props.visualSimilarityQuery.positiveItems.forEach(item => {
            const submitURL = `${DRES_SUBMIT_API}?item=${item}&session=${props.userConfig.sessionId}`
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
            message: `Submit ${totalItems} items`,
            placement: 'bottomRight',
        })
    }

    return (
        <Popover
            title="Submit Selected Items" 
            content="Submit selected items (colored green) to the server"
            placement="bottomRight"
        >
            <Button
                type="ghost"
                icon={<SendOutlined />}
                style={{
                    height: 30,
                    color: "white",
                    border: "none",
                }}
                onClick={() => { submitSelectedItems() }}
            />
        </Popover>
    )
}


const mapStatesToProps = (state) => ({
    visualSimilarityQuery: state.visualSimilarityQuery,
    userConfig: state.userConfig,
})

export default connect(mapStatesToProps)(SubmitSelectedItemsButton)