import React, { useEffect, useState, useRef } from 'react'
import { Row, Col, Spin } from 'antd'
import ImageCard from '../components/imageGrid/imageCard'
import { connect, useSelector } from 'react-redux'
import InfiniteScroll from "react-infinite-scroll-component";
import { Grid } from '@mui/material'
import { setIsLoadingSearch } from '../actions/actionQueryData';
import { PRESS_S, PRESS_X } from '../constants/interaction'
import { setIsPressX, setIsPressS } from '../actions/actionGeneral'


function ImageGridContainer(props) {
    const innerRef = useRef(null)
    const NUM_INITIAL_VISIBLE_ITEMS = 100
    const NUM_ADDING_ITEMS = 30
    const [currentLength, setCurrentLength] = useState(0)
    const [hasMore, setHasMore] = useState(false)


    const fetchData = () => {
        setTimeout(() => {
            if (currentLength < props.imageSources.imageSources.length) {
                const newCurrentLength = currentLength + NUM_ADDING_ITEMS
                setCurrentLength(newCurrentLength)
                setHasMore(true)
            }
            else setHasMore(false)
        }, 500)
    }

    useEffect(() => {
        // Reset visible list
        setCurrentLength(NUM_INITIAL_VISIBLE_ITEMS)
        if (props.imageSources.imageSources.length > 0) {
            setHasMore(true)
        }
        else {
            setHasMore(false)
        }
        props.dispatch(setIsLoadingSearch(false))
    }, [props.imageSources.imageSources])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [props.query.isLoadingSearch])


    return (
        <div style={props.style} id="scrollable-div" ref={innerRef}>
            {
                props.query.isLoadingSearch ?
                    <Spin
                        tip="Loading..."
                        size="large"
                        style={{
                            position: 'fixed',
                            right: "50%"
                        }}
                    /> :
                    <InfiniteScroll
                        id={'image-grid-container'}
                        // dataLength={visibleSources.length}
                        dataLength={currentLength}
                        next={fetchData}
                        hasMore={hasMore}
                        scrollThreshold={0.9}
                        loader={<h4 style={{ textAlign: "center", marginTop: 5 }}>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: "center", marginTop: 5 }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        <Grid container spacing={1} justifyContent="center">
                            {
                                props.imageSources.imageSources.slice(0, currentLength).map((data, index) => {
                                    return (
                                        <Grid item id={`col-${index}`} key={`col-${index}`}>
                                            <ImageCard
                                                scrollContainer={"image-grid-container"}
                                                overflow
                                                key={`image-card-${index}`}
                                                sources={data.frames.slice(0, 3)}
                                                videoId={data.id}
                                                videoSrc={data.video}
                                            />
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </InfiniteScroll>
            }
        </div>
    )
}


const mapStatesToProps = (state) => ({
    imageSources: state.imageSources,
    query: state.query,
})


export default connect(mapStatesToProps)(ImageGridContainer);