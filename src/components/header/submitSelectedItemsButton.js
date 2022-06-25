import { SendOutlined } from "@ant-design/icons"
import { Button, Popover, notification } from "antd"
import { connect } from 'react-redux'
import { DRES_SUBMIT_API } from '../../constants/server'
import { DRES_ERROR_RESPONSE, DRES_INCORRECT_SUBMISSION } from '../../constants/response'
import { fetchData } from '../../actions/fetchData'


function SubmitSelectedItemsButton(props) {

    const submitSelectedItems = () => {
        let selectedItems = []
        if (props.visualSimilaritySources.visualSimilaritySourcesVisible) {
            const MAX_NUMBER_OF_ITEMS = 80
            selectedItems = props.visualSimilaritySources.vsImageSources.map(item => item.id).slice(0, MAX_NUMBER_OF_ITEMS)
        }
        else {
            selectedItems = props.visualSimilarityQuery.positiveItems
        }
        const totalItems = selectedItems.length
        console.log(selectedItems)
        selectedItems.forEach(item => {
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

    const popOverHelper = () => {
        return (
            <div>
                <b>Search/Filter Mode</b>
                <p>- Submit selected items (colored green) to the server.</p>
                <b>Visual Similarity Search Mode</b>
                <p>- Submit all items in the scrollable panel.</p>
            </div>
        )
    }

    return (
        <Popover
            title="Submit Selected Items"
            content={popOverHelper}
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
    visualSimilaritySources: state.visualSimilaritySources
})

export default connect(mapStatesToProps)(SubmitSelectedItemsButton)