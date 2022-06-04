// import './image.css'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'


function Image(props) {
    const [mouseOver, setMouseOver] = useState(false)

    const onMouseOver = () => {
        if (props.general.isPressX === true) {
            setMouseOver(true)
        }
        else {
            setMouseOver(false)
        }
    }

    const onMouseOut = () => {
        if (mouseOver === true) {
            setMouseOver(false)
        }
    }

    return (
        <img
            className='image-item'
            style={
                mouseOver === true ? {
                    width: props.style.width,
                    height: props.style.height,
                    transform: 'scale(1.5)',
                    zIndex: 100,
                    overflow: 'hidden',
                } : {
                    width: props.style.width,
                    height: props.style.height,
                    transform: 'scale(1)',
                    zIndex: -1,
                    overflow: 'hidden',
                }
            }
            src={props.src}
            loading={props.loading}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
        />
    )
}

const mapStatesToProps = (state) => ({
    general: state.general,
})


export default connect(mapStatesToProps)(Image);