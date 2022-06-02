import { connect } from 'react-redux'
import { Modal } from 'antd'


function ImageListModal(props) {
    return (
        <Modal
            centered
            width={690}
            title={`Image list of ${props.videoId}`}
            visible={props.visible}
            onCancel={props.onCancel}
            cancelText={"Close"}
        >
            
        </Modal>
    )
}


const mapStatesToProps = (state) => ({

})

export default connect(mapStatesToProps)(ImageListModal)