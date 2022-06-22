import { Typography } from 'antd'
import Image from './image'


const { Text } = Typography

function MomentItem(props) {
    return (
        <div style={props.style}>
            <Text strong>{props.id}</Text>
            <Image
                style={props.imageStyle}
                src={props.imgSrc}
            />
        </div >
    )
}


export default MomentItem