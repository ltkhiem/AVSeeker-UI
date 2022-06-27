import { EyeOutlined } from "@ant-design/icons"
import { Button, notification, Popover } from "antd"
import { connect } from "react-redux"
import { VISUAL_SIMILARITY_SEARCH_API } from "../../constants/server"
import { fetchData } from "../../actions/fetchData"
import { setNegativeItems, setPositiveItems, setVisualSimilaritySources, setVisualSimilaritySourcesVisible } from "../../actions/actionVisualSimilaritySearch"
import { RESPONSE_SUCCESS } from "../../constants/response"
import { handleVisualSimilaritySearch } from "../../helpers/responseHelper"
import { setIsLoadingSearch } from "../../actions/actionQueryData"
import { RELEVANCE_FEEDBACK_API } from "../../constants/server"


function VisualSimilaritySearchButton(props) {


    const doRelevanceFeedback = () => {
        // Set loading spinner
        props.dispatch(setIsLoadingSearch(true))

        const params = {
            user_id: props.userConfig.userId,
            positive_ids: props.visualSimilarityQuery.positiveItems,
            negative_ids: props.visualSimilarityQuery.negativeItems,
        }
        props.dispatch(fetchData(RELEVANCE_FEEDBACK_API, 'POST', params)).then((response) => {
            if (response.result !== RESPONSE_SUCCESS) {
                notification.error({
                    message: `Relevance Feedback: ${response.result}`,
                    placement: 'bottomRight',
                })
            }
            else {
                const data = handleVisualSimilaritySearch(response.reply)
                props.dispatch(setVisualSimilaritySources(data))
                props.dispatch(setVisualSimilaritySourcesVisible(true))

                // Unset loading spinner
                props.dispatch(setIsLoadingSearch(false))
            }
        })
    }

    const doSimilaritySearch = () => {
        const positiveItemsLength = props.visualSimilarityQuery.positiveItems.length
        const negativeItemsLength = props.visualSimilarityQuery.negativeItems.length

        if (positiveItemsLength === 0) {
            if (negativeItemsLength === 0) {
                // No positive items were selected
                notification.error({
                    message: "Please select at least one positive item or negative item",
                    placement: "bottomRight",
                })
            }
            else {
                // Relevant feedback mode to filter the images to avoid images visually similar to the negative item
            }
        }
        else if (positiveItemsLength === 1) {
            if (negativeItemsLength === 0) {
                // Visual Similarity Search

                // Set loading spinner
                props.dispatch(setIsLoadingSearch(true))

                const params = {
                    user_id: props.userConfig.userId,
                    image_id: props.visualSimilarityQuery.positiveItems[0]
                }
                props.dispatch(fetchData(VISUAL_SIMILARITY_SEARCH_API, 'POST', params)).then((response) => {
                    if (response.result !== RESPONSE_SUCCESS) {
                        notification.error({
                            message: `Visual Similarity Search: ${response.result}`,
                            placement: "bottomRight",
                        })
                    }
                    else {
                        const data = handleVisualSimilaritySearch(response.reply)
                        props.dispatch(setVisualSimilaritySources(data))
                        props.dispatch(setVisualSimilaritySourcesVisible(true))
                    }
                    // Unset loading spinner
                    props.dispatch(setIsLoadingSearch(false))
                })
            }
            else {
                // Conduct normal relevant feedback mode
                doRelevanceFeedback()
            }
        }
        else {
            // Conduct normal relevant feedback mode
            doRelevanceFeedback()
        }
        // Reset positive and negative items for visual similarity search and relevant feedback
        props.dispatch(setPositiveItems([]))
        props.dispatch(setNegativeItems([]))

    }

    return (
        <Popover
            title="Visual Similarity Search"
            content="Click to do Visual Similarity Search"
            placement="bottomRight"
        >
            <Button
                type="ghost"
                icon={<EyeOutlined />}
                style={{
                    height: 30,
                    color: "white",
                    border: "none",
                }}
                onClick={() => { doSimilaritySearch() }}
            />
        </Popover>
    )
}


const mapStatesToProps = (state) => ({
    visualSimilarityQuery: state.visualSimilarityQuery,
    userConfig: state.userConfig,
})


export default connect(mapStatesToProps)(VisualSimilaritySearchButton)