import { Modal } from 'antd'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import { ImageListItemBar } from '@mui/material'
import moment from 'moment'
import MomentItem from './momentItem'


function ImageListModal(props) {

    return (
        <Modal
            centered
            width={1500}
            title={props.title}
            visible={props.visible}
            onCancel={props.onCancel}
            onOk={props.onOk}
            okText="Submit All"
            cancelText={"Close"}
        >
            <ImageList cols={5} sx={{ width: 1450, height: 800, paddingLeft: 2, paddingRight: 2 }}>
                {
                    props.moments.map((data, index) => {
                        return (
                            <ImageListItem
                                key={index}
                            >
                                <MomentItem
                                    style={{
                                        width: 224,
                                        height: 135,
                                        padding: 5,
                                    }}
                                    imageStyle={{
                                        width: 224,
                                        height: 135,
                                    }}
                                    imgSrc={data.path}
                                    id={data.id}
                                />
                                <ImageListItemBar 
                                    title={moment(data.id, 'YYYYMMDD_hhmmss').format('LTS')}
                                    position="below"
                                    align="center"
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
