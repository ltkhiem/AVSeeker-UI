import { Typography } from 'antd'
import { useEffect, useState } from 'react'
import Image from './image'
import { connect } from 'react-redux'
import {
    POSITIVE_SELECTED_MOMENT_ITEM_COLOR,
    NEGATIVE_SELECTED_MOMENT_ITEM_COLOR,
} from '../../constants/colors'
import {
    addNegativeItem,
    addPositiveItem,
    removeNegativeItem,
    removePositiveItem,
} from '../../actions/actionVisualSimilaritySearch'


const { Text } = Typography

function MomentItem(props) {
    const [selectedState, setSelectedState] = useState('')
    const [selected, setSelected] = useState(false)


    const onMouseDown = () => {
        if (selected) {
            if (
                (props.general.isPressW === true && selectedState === 'W')
                || (props.general.isPressR === true && selectedState === 'R')
            ) {
                // If the item was clicked twice, then unhighlight it
                setSelected(false)
                setSelectedState('')

                // Remove the item from the list
                if (props.general.isPressR) {
                    props.dispatch(removePositiveItem(props.id))
                }
                else if (props.general.isPressW) {
                    props.dispatch(removeNegativeItem(props.id))
                }
            }
            else if (props.general.isPressW === true && selectedState === 'R') {
                // Otherwise, set item background color to red (highlight) due to negative selection 
                setSelected(true)
                setSelectedState('W')

                // Add item to the corresponding list
                props.dispatch(addPositiveItem(props.id))
            }
            else if (props.general.isPressR === true && selectedState === 'W') {
                // Otherwise, set item background color to green (highlight) due to positive selection 
                setSelected(true)
                setSelectedState('R')

                // Add item to the corresponding list
                props.dispatch(addNegativeItem(props.id))
            }
        }
        else {
            setSelected(true)
            if (props.general.isPressR) {
                // Set item background color to green (highlight) due to positive selection
                setSelectedState('R')

                // Add item to the corresponding list
                props.dispatch(addPositiveItem(props.id))
            }
            else if (props.general.isPressW) {
                // Set item background color to red (highlight) due to negative selection
                setSelectedState('W')

                // Add item to the corresponding list
                props.dispatch(addNegativeItem(props.id))
            }
        }
    }


    return (
        <div style={
            selectedState === 'W' ? {
                ...props.style,
                backgroundColor: NEGATIVE_SELECTED_MOMENT_ITEM_COLOR,
            } :
            selectedState === 'R' ? {
                ...props.style,
                backgroundColor: POSITIVE_SELECTED_MOMENT_ITEM_COLOR,
            } :
            props.style            
        }
            onMouseDown={onMouseDown}
        >
            <Text strong>{props.title}</Text>
            <Image
                id={props.id}
                style={props.imageStyle}
                src={props.imgSrc}
            />
        </div >
    )
}


const mapStatesToProps = (state) => ({
    general: state.general,
    visualSimilarityQuery: state.visualSimilarityQuery,
})


export default connect(mapStatesToProps)(MomentItem)