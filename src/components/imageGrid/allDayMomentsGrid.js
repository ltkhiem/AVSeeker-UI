import InfiniteScroll from "react-infinite-scroll-component"
import { Grid } from "@mui/material"
import { connect } from "react-redux"


function AllDayMomentsGrid(props) {
    const NUM_INITIAL_VISIBLE_ITEMS = 100
    const NUM_ADDING_ITEMS = 100
    const [currentLength, setCurrentLength] = useState(0)

    return (
        <div>
            <InfiniteScroll
                id={'all-day-moments-grid-container'}
                dataLenght={currentLength}
            >
                <Grid container spacing={3} justifyContent="center">

                </Grid>
            </InfiniteScroll>
        </div>
    )
}


const mapStatesToProps = (state) => ({})


export default connect(mapStatesToProps)(AllDayMomentsGrid)