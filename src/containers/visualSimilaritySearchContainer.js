import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Grid } from '@mui/material'
import { setIsLoadingSearch } from '../actions/actionQueryData'
import { Spin, Modal } from 'antd'
import MomentItem from '../components/imageGrid/momentItem';
import moment from 'moment'
import { setVisualSimilaritySourcesShowing, setVisualSimilaritySourcesVisible } from '../actions/actionVisualSimilaritySearch';


function VisualSimilaritySearchContainer(props) {
    const NUM_INITIAL_VISIBLE_ITEMS = 100
    const NUM_ADDING_ITEMS = 30
    const [currentLength, setCurrentLength] = useState(0)
    const [hasMore, setHasMore] = useState(false)


    const fetchData = () => {
        setTimeout(() => {
            // Fetch more images if there is more
            if (currentLength < props.visualSimilaritySources.vsImageSources.length) {
                const newCurrentLength = currentLength + NUM_ADDING_ITEMS
                setCurrentLength(newCurrentLength)
                setHasMore(true)
            }
            else setHasMore(false)
        }, 500)
    }


    // Update the visible container
    useEffect(() => {
        setCurrentLength(NUM_INITIAL_VISIBLE_ITEMS)
        if (props.visualSimilaritySources.vsImageSources.length > NUM_INITIAL_VISIBLE_ITEMS) {
            // Set has more to true if there are more images than the initial visible list
            setHasMore(true)
        }
        else {
            // Set has more to false if there are less images than the initial visible list
            setHasMore(false)
        }
    }, [props.visualSimilaritySources.vsImageSources])


    // Scroll to the top of the page after reset the visible container
    // useEffect(() => {
    //     window.scrollTo(0, 0)
    // }, [props.query.isLoadingSearch])


    return (
        <div style={props.style} id="vs-scrollable-div">
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
                    id={'vs-image-grid-container'}
                    dataLength={currentLength}
                    next={fetchData}
                    hasMore={hasMore}
                    scrollThreshold={0.8}
                    loader={
                        <h4 style={{ textAlign: "center", marginTop: 5 }}>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: "center", marginTop: 5 }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    <Grid container spacing={1} justifyContent="center">
                        {
                            props.visualSimilaritySources.vsImageSources.slice(0, currentLength).map((data, index) => {
                                return (
                                    <Grid item id={`col-${index}`} key={`col-${index}`}>
                                        <MomentItem
                                            style={{
                                                height: 180,
                                                width: 210,
                                                border: "1px solid #e8e8e8",
                                                paddingLeft: 5,
                                                paddingRight: 5,
                                                textAlign: "center",
                                            }}
                                            imageStyle={{
                                                height: 150,
                                                width: 200,
                                            }}
                                            imgSrc={data.path}
                                            id={data.id}
                                            title={moment(data.id, 'YYYYMMDD_hhmmss').format('LLL')}
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
    query: state.query,
    visualSimilaritySources: state.visualSimilaritySources,
})

export default connect(mapStatesToProps)(VisualSimilaritySearchContainer);