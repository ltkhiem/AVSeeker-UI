import React, { useEffect, useState } from 'react'
import { Row, Col, Spin } from 'antd'
import ImageCard from '../components/imageGrid/imageCard'
import { connect } from 'react-redux'
import InfiniteScroll from "react-infinite-scroll-component";
import { Grid } from '@mui/material';




function ImageGridContainer(props) {

    return (
        <Grid container spacing={2}>
            {
                props.imageSources.imageSources.map((data, index) => {
                    return (
                        <Grid item xs={12} sm={6} md={2} lg={2} key={index}>
                             <ImageCard
                                 overflow
                                 key={`image-card-${index}`}
                                 sources={data.frames.slice(0, 3)}
                                 frameId={data.id}
                                 videoId={data.video}
                             />
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}


const mapStatesToProps = (state) => ({
    imageSources: state.imageSources
})


export default connect(mapStatesToProps)(ImageGridContainer);