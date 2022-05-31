import React, { useState } from 'react'
import { Row, Col, Image } from 'antd'
import ImageCard from '../components/imageGrid/imageCard'
import { connect } from 'react-redux'
import { IMAGE_SERVER } from '../constants/server'
import { GRID_CONTAINER_COLOR } from '../constants/colors'


function ImageGridContainer(props) {

    return (
        <div style={props.style}>
            <Row
                gutter={[8, 16]}
                justify="center"
            >
                {
                    props.imageSources.imageSources.map((data, index) => {
                        return (
                            <Col className="gutter-row" key={index}>
                                {/* <Image 
                                    width={180}
                                    height={150}
                                    src={src} 
                                /> */}
                                <ImageCard
                                    sources={data.frames.map((frame_id) => `${IMAGE_SERVER}/${data.id}/${frame_id}`)}
                                    id={data.id}
                                    videoId={data.video}
                                />
                            </Col>
                        )
                    })
                }
            </Row>
        </div>
    )
}


const mapStatesToProps = (state) => ({
    imageSources: state.imageSources
})


export default connect(mapStatesToProps)(ImageGridContainer);