import { Modal } from 'antd'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'


function ImageListModal(props) {
    return (
        <Modal
            centered
            width={690}
            title={`Image list of ${props.videoId}`}
            visible={props.visible}
            onCancel={props.onCancel}
            onOk={props.onOk}
            cancelText={"Close"}
        >   
            <ImageList cols={3} sx={{ width: 650, height: 450 }} rowHeight={164}>
                {
                    props.frames.map((frame, index) => {
                        return (
                            <ImageListItem
                                key={index}
                            >
                                <img 
                                    src={frame}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        )
                    })
                }
            </ImageList>
        </Modal>
    )
}


export default ImageListModal