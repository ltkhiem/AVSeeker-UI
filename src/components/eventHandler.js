import { useEffect } from 'react'
import { connect } from 'react-redux'
import { PRESS_S, PRESS_X } from '../constants/interaction'
import { setIsPressX, setIsPressS } from '../actions/actionGeneral'


function EventHandler(props) {
    const handleImageItemKeyDown = (event) => {
        // Press x
        if (event.which === PRESS_X && props.general.isPressX === false) {
            props.dispatch(setIsPressX(true))
        }
        // Press s
        if (event.which === PRESS_S && props.general.isPressS === false) {
            props.dispatch(setIsPressS(true))
        }
    }

    const handleImageItemKeyUp = (event) => {
        // Press x
        if (event.which === PRESS_X && props.general.isPressX === true) {
            props.dispatch(setIsPressX(false))
        }
        // Press s
        if (event.which === PRESS_S && props.general.isPressS === true) {
            props.dispatch(setIsPressS(false))
        }

    }

    useEffect(() => {
        document.addEventListener('keydown', handleImageItemKeyDown)
        document.addEventListener('keyup', handleImageItemKeyUp)
        return () => {
            document.removeEventListener('keydown', handleImageItemKeyDown)
            document.removeEventListener('keyup', handleImageItemKeyUp)
        }
    }, [props.general.isPressS, props.general.isPressX])

    return (<div></div>)
}


const mapStatesToProps = (state) => ({
    general: state.general,
})


export default connect(mapStatesToProps)(EventHandler)


