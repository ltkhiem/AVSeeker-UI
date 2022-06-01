import React, { useState } from 'react'
import { Row, Col, Image } from 'antd'
import ImageCard from '../components/imageGrid/imageCard'
import { connect } from 'react-redux'
import { IMAGE_SERVER } from '../constants/server'


function ImageGridContainer(props) {

    return (
        <div style={props.style}>
            <Row
                gutter={[8, 16]}
                justify="center"
                id="row-image-grid"
            >
                {
                    props.imageSources.imageSources.map((data, index) => {
                        return (
                            <Col className="gutter-row" id={`col-${index}`} key={`col-${index}`}>
                                <ImageCard
                                    scrollContainer={"row-image-grid"}
                                    key={`image-card-${index}`}
                                    sources={data.frames.map((frame_id) => `${IMAGE_SERVER}/${data.id}/${frame_id}`)}
                                    frameId={data.id}
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