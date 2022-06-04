import { Modal } from 'antd'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import './imageModalItem.css'


function ImageListModal(props) {
    return (
        <Modal
            centered
            width={700}
            // title={`Image list of ${props.videoId}`}
            title={props.title}
            visible={props.visible}
            onCancel={props.onCancel}
            onOk={props.onOk}
            cancelText={"Close"}
        >   
            <ImageList cols={3} sx={{ width: 650, height: 450, paddingLeft: 2, paddingRight: 2 }} rowHeight={164}>
                {
                    props.frames.map((frame, index) => {
                        return (
                            <ImageListItem
                                key={index}
                            >
                                <img 
                                    className="image-modal-item"
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