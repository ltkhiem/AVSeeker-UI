import { Modal } from 'antd'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import Image from './image'


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
            okText="Submit All"
            cancelText={"Close"}
        >   
            <ImageList cols={4} sx={{ width: 650, height: 450, paddingLeft: 2, paddingRight: 2 }} rowHeight={144}>
                {
                    props.frames.map((frame, index) => {
                        return (
                            <ImageListItem
                                key={index}
                            >
                                <Image 
                                    className="image-modal-item"
                                    style={{ width: 145, height: 145 }}
                                    src={frame}
                                    // loading="lazy"
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