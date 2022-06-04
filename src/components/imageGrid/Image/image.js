// import './image.css'
import { Popover } from 'antd';
import { connect } from 'react-redux'


function Image(props) {
    return (
        <img
            // aria-haspopup="true"
            // aria-owns={props.general.isPressX ? 'image-modal' : null}
            className='image-item'
            style={props.style}
            src={props.src}
            loading={props.loading}
        />
    )
}

const mapStatesToProps = (state) => ({
    general: state.general,
})


export default connect(mapStatesToProps)(Image);