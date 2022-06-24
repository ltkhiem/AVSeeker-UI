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
            width={920}
            title={props.title}
            visible={props.visible}
            onCancel={props.onCancel}
            onOk={props.onOk}
            okText="Submit All"
            cancelText={"Close"}
        >
            <ImageList cols={5} sx={{ width: 850, height: 450, paddingLeft: 2, paddingRight: 2 }}>
                {
                    props.moments.map((data, index) => {
                        return (
                            <ImageListItem
                                key={index}
                            >
                                <MomentItem
                                    style={{
                                        width: 155,
                                        height: 155,
                                        padding: 5,
                                    }}
                                    imageStyle={{
                                        width: 145,
                                        height: 145,
                                    }}
                                    imgSrc={data.path}
                                    // title={''}
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