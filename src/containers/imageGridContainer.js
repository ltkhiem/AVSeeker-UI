import React, { useEffect, useState } from 'react'
import { Row, Col, Image } from 'antd'
import ImageCard from '../components/imageGrid/imageCard'
import { connect } from 'react-redux'
import InfiniteScroll from "react-infinite-scroll-component";



// const cache = new CellMeasurerCache({
//     defaultWidth: 200,
//     minWidth: 75,
//     fixedHeight: true
// });

// function cellRenderer({ columnIndex, key, parent, rowIndex, style }) {
//     return (
//         <CellMeasurer
//             cache={cache}
//             columnIndex={columnIndex}
//             key={key}
//             parent={parent}
//             rowIndex={rowIndex}
//         >
//             <ImageCard
//                 key={`image-card-${key}`}

//             />
//         </CellMeasurer>
//     );
// }

function MyCard({ item }) {
    return (
        <ImageCard
            sources={item.frames.slice(0, 3)}
            frameId={item.id}
            videoId={item.video}
        />
    )
}

function ImageGridContainer(props) {
    const VISIBLE_ITEMS = 150
    const [visibleSources, setVisibleSources] = useState(props.imageSources.imageSources.slice(0, VISIBLE_ITEMS))
    const [hasMore, setHasMore] = useState(false)

    const fetchData = () => {
        console.log(visibleSources)
        setTimeout(() => {
            if (visibleSources.length < props.imageSources.imageSources.length) {
                console.log(visibleSources.length)
                const currentLength = visibleSources.length
                const imageSourcesSubset = props.imageSources.imageSources.slice(currentLength, currentLength + VISIBLE_ITEMS)
                const newVisibleSources = visibleSources.concat(imageSourcesSubset)
                setVisibleSources(newVisibleSources)
                // setVisibleSources(props.imageSources.imageSources.slice(visibleSources.length, visibleSources.length + VISIBLE_ITEMS))
                setHasMore(true)
            }
            else {
                setHasMore(false)
            }
        }, 500)
    }

    useEffect(() => {
        fetchData()       
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