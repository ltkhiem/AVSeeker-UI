import { useEffect } from 'react'
import { connect } from 'react-redux'
import { PRESS_S, PRESS_W, PRESS_X, PRESS_R, PRESS_T } from '../constants/interaction'
import { setIsPressX, setIsPressS, setIsPressR, setIsPressW, setIsPressT } from '../actions/actionGeneral'


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
        // Press w
        if (event.which === PRESS_W && props.general.isPressW === false) {
            props.dispatch(setIsPressW(true))
        }
        // Press r
        if (event.which === PRESS_R && props.general.isPressR === false) {
            props.dispatch(setIsPressR(true))
        }
        // Press t
        if (event.which === PRESS_T && props.general.isPressT === false) {
            props.dispatch(setIsPressT(true))
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
        // Press w
        if (event.which === PRESS_W && props.general.isPressW === true) {
            props.dispatch(setIsPressW(false))
        }
        // Press r
        if (event.which === PRESS_R && props.general.isPressR === true) {
            props.dispatch(setIsPressR(false))
        }
        // Press t
        if (event.which === PRESS_T && props.general.isPressT === true) {
            props.dispatch(setIsPressT(false))
        }
    }

    useEffect(() => {
        // Register events
        document.addEventListener('keydown', handleImageItemKeyDown)
        document.addEventListener('keyup', handleImageItemKeyUp)
        // Unregister events so that they the event listener is only registered once
        return () => {
            document.removeEventListener('keydown', handleImageItemKeyDown)
            document.removeEventListener('keyup', handleImageItemKeyUp)
        }
    }, [props.general.isPressS, props.general.isPressX, props.general.isPressR, props.general.isPressW, props.general.isPressT])

    return (<div></div>)
}


const mapStatesToProps = (state) => ({
    general: state.general,
})


export default connect(mapStatesToProps)(EventHandler)


