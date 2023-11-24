import { SendOutlined } from "@ant-design/icons"
import { Button, Popover, notification } from "antd"
import { connect } from 'react-redux'
import { UPDATE_DISPLAY_API } from '../../constants/server'
import { RESPONSE_SUCCESS } from "../../constants/response"
import { fetchData } from '../../actions/fetchData'
import { setShowGaze } from '../../actions/actionShowGaze';

import { setTriggerSearch } from '../../actions/actionTriggerSearch';



function ShowGazeItemsButton(props) {

    const onShowGazeClick = () => {
	    const params = {
		show_gaze: !props.showGaze.showGaze
	    }

	    props.dispatch(fetchData(UPDATE_DISPLAY_API, 'POST', params)).then((response) => {
		if (response.result !== RESPONSE_SUCCESS) {
			notification.error({
				message: `Failed to update display preference`,
				placement: 'bottomRight',
			})
		}
		else {
	    		props.dispatch(setShowGaze(!props.showGaze.showGaze))
        		notification.success({
        		    message: `Display preference updated`,
        		    placement: 'bottomRight',
        		})
			props.dispatch(setTriggerSearch(true));

    
		}
	    })



    }

    const popOverHelper = () => {
        return (
            <div>
                <p>Update Display Preference</p>
            </div>
        )
    }

    return (
        <Popover
            title="Update Display Preference"
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
                onClick={() => {onShowGazeClick() }}
            />
        </Popover>
    )
}


const mapStatesToProps = (state) => ({
    showGaze: state.showGaze,
})

export default connect(mapStatesToProps)(ShowGazeItemsButton)
