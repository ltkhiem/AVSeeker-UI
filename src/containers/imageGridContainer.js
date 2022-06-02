import React, { useEffect, useState } from 'react'
import { Row, Col, Image } from 'antd'
import ImageCard from '../components/imageGrid/imageCard'
import { connect } from 'react-redux'
import InfiniteScroll from "react-infinite-scroll-component";


function ImageGridContainer(props) {
    const NUM_INITIAL_VISIBLE_ITEMS = 100
    const NUM_ADDING_ITEMS = 30
    const [visibleSources, setVisibleSources] = useState(props.imageSources.imageSources.slice(0, NUM_INITIAL_VISIBLE_ITEMS))
    const [hasMore, setHasMore] = useState(false)

    const fetchData = () => {
        setTimeout(() => {
            if (visibleSources.length < props.imageSources.imageSources.length) {
                const currentLength = visibleSources.length
                const imageSourcesSubset = props.imageSources.imageSources.slice(currentLength, currentLength + NUM_ADDING_ITEMS)
                const newVisibleSources = visibleSources.concat(imageSourcesSubset)
                setVisibleSources(newVisibleSources)
                setHasMore(true)
            }
            else {
                setHasMore(false)
            }
        }, 500)
    }

    useEffect(() => {
        // Reset visible list
        window.scrollTo(0, 0)
        setVisibleSources(props.imageSources.imageSources.slice(0, NUM_INITIAL_VISIBLE_ITEMS))
        setHasMore(true)
    }, [props.imageSources.imageSources])


    return (
        <div style={props.style}>
            <InfiniteScroll
                dataLength={visibleSources.length}
                next={fetchData}
                hasMore={hasMore}
                scrollThreshold={0.9}
                loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                {
                    <Row
                        gutter={[8, 16]}
                        justify="center"
                        id="row-image-grid"
                    >
                        {
                            visibleSources.map((data, index) => {
                                return (
                                    <Col className="gutter-row" id={`col-${index}`} key={`col-${index}`}>
                                        <ImageCard
                                            scrollContainer={"row-image-grid"}
                                            key={`image-card-${index}`}
                                            sources={data.frames.slice(0, 3)}
                                            frameId={data.id}
                                            videoId={data.video}
                                        />
                                    </Col>
                                )
                            })
                        }
                    </Row>
                }
            </InfiniteScroll>
        </div>
    )
    // return (
    //     <div style={props.style}>
    //         <Row
    //             gutter={[8, 16]}
    //             justify="center"
    //             id="row-image-grid"
    //         >
    //             {
    //                 props.imageSources.imageSources.map((data, index) => {
    //                     return (
    //                         <Col className="gutter-row" id={`col-${index}`} key={`col-${index}`}>
    //                             <ImageCard
    //                                 scrollContainer={"row-image-grid"}
    //                                 key={`image-card-${index}`}
    //                                 sources={data.frames.slice(0, 3)}
    //                                 frameId={data.id}
    //                                 videoId={data.video}
    //                             />
    //                         </Col>
    //                     )
    //                 })
    //             }
    //         </Row>
    //     </div >
    // )
}


const mapStatesToProps = (state) => ({
    imageSources: state.imageSources
})


export default connect(mapStatesToProps)(ImageGridContainer);