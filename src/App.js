// import './App.css';
import { useRef, useEffect, useState } from 'react'
import { Layout } from 'antd'
import HeaderContainer from './containers/headerContainer'
import ImageGridContainer from './containers/imageGridContainer';
import StateTimeline from './components/stateTimeline/stateTimeline';
import VideoViewer from './components/imageGrid/videoViewer';
import { connect } from 'react-redux'
import { setVideoModalVisible } from './actions/actionVideoViewer'
import { VIDEO_SERVER } from './constants/server';
import { setSessionId, setUserId } from './actions/actionUserConfig';
import ImageListModal from './components/imageGrid/imageListModal';
import { setImageListModalVisible } from './actions/actionImageListModal';
import { setKeyframesRankedListModalVisible } from './actions/actionKeyframesRankedListModal';
import { PRESS_S, PRESS_X } from './constants/interaction'
import { setIsPressX, setIsPressS } from './actions/actionGeneral'
import EventHandler from './components/eventHandler';


const { Header, Content } = Layout;

function App(props) {
	let playerRef = useRef(null);
	const [initCheckLocalStorageData, setInitCheckLocalStorageData] = useState(true);

	useEffect(() => {
		if (initCheckLocalStorageData) {
			// THIS IS CALLED TWICE -- FIX LATER
			setInitCheckLocalStorageData(false)
			// Watch for session id in local storage in case the page is refreshed
			if ('sessionId' in localStorage) {
				const sessionId = localStorage.getItem('sessionId');
				const avseekerUsername = localStorage.getItem('userId');
				props.dispatch(setSessionId(sessionId));
				props.dispatch(setUserId(avseekerUsername));
			}
		}
	})


	const handlePlayerReady = (player) => {
		playerRef.current = player;

		// You can handle player events here, for example:
		player.on('waiting', () => {
			player.log('player is waiting');
		});

		player.on('dispose', () => {
			player.log('player will dispose');
		});
	};


	const onVideoViewSubmitButtonClicked = () => {
		onVideoViewCloseButtonClicked()
	}

	const onVideoViewCloseButtonClicked = () => {
		// In case the user closes the video without submitting it
		props.dispatch(setVideoModalVisible(false))

	}

	const onImageListModalSubmitButtonClicked = () => {
		onImageListModalCloseButtonClicked()
	}

	const onImageListModalCloseButtonClicked = () => {
		props.dispatch(setImageListModalVisible(false))
	}

	const onKeyframesRankedListSubmitButtonClicked = () => {
		onKeyframesRankedListCloseButtonClicked()
	}

	const onKeyframesRankedListCloseButtonClicked = () => {
		props.dispatch(setKeyframesRankedListModalVisible(false))
	}

	return (
		<div className="App">
			<EventHandler />
			<Layout>

				<Header style={{
					position: "fixed",
					zIndex: 1,
					width: "100%",
				}}>
					<HeaderContainer
						style={{ position: "fixed", zIndex: 1, width: "100%" }}
					/>
				</Header>

				<Content style={{
					padding: "0 10px",
					marginTop: 70,
					overflow: "initial",
				}}>
					<StateTimeline />
					<ImageGridContainer
						style={{ height: "100%", backgroundColor: "white" }}
					/>
					{
						props.videoViewer.visible ?
							<VideoViewer
								videoId={props.videoViewer.videoId}
								visible={props.videoViewer.visible}
								onReady={handlePlayerReady}
								onOk={onVideoViewSubmitButtonClicked}
								onCancel={onVideoViewCloseButtonClicked}
								options={{
									preload: 'auto',
									autoplay: true,
									controls: true,
									responsive: true,
									fluid: true,
									playbackRates: [0.5, 1, 2, 4],
									sources: {
										src: `${props.videoViewer.videoSrc}`,
										type: 'video/mp4'
									}
								}}
							/>
							: <div></div>
					}
					{/* // Show all the keyframes of the video */}
					<ImageListModal
						visible={props.imageListModal.visible}
						videoId={props.imageListModal.videoId}
						frames={props.imageListModal.framesList}
						title={`All keyframes of the video ${props.imageListModal.videoId}`}
						onCancel={onImageListModalCloseButtonClicked}
						onOk={onImageListModalSubmitButtonClicked}
					/>
					{/* // Show keyframes in the ranked list returned from the search and filter API */}
					<ImageListModal
						visible={props.keyframesRankedList.visible}
						videoId={props.keyframesRankedList.videoId}
						frames={props.keyframesRankedList.framesList}
						title={`Keyframes in the ranked list of the video ${props.keyframesRankedList.videoId}`}
						onCancel={onKeyframesRankedListCloseButtonClicked}
						onOk={onKeyframesRankedListSubmitButtonClicked}
					/>
				</Content>

			</Layout>
		</div>
	);
}


const mapStatesToProps = (state) => ({
	videoViewer: state.videoViewer,
	imageListModal: state.imageListModal,
	keyframesRankedList: state.keyframesRankedList,
})

export default connect(mapStatesToProps)(App);
