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


const { Header, Content } = Layout;

function App(props) {
	const playerRef = useRef(null);
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


	const onSubmitButtonClicked = () => {
		console.log(`Submit ${props.videoViewer.videoId}`)
		onCloseButtonClicked()
	}

	const onCloseButtonClicked = () => {
		// In case the user closes the video without submitting it
		props.dispatch(setVideoModalVisible(false))
	}

	return (
		<div className="App">
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
								onOk={onSubmitButtonClicked}
								onCancel={onCloseButtonClicked}
								options={{
									autoplay: true,
									controls: true,
									responsive: true,
									fluid: true,
									sources: {
										src: `${VIDEO_SERVER}/${props.videoViewer.videoSrc}`,
										type: 'video/mp4'
									}
								}}
							/>
							: <div></div>
					}

				</Content>

			</Layout>
		</div>
	);
}


const mapStatesToProps = (state) => ({
	videoViewer: state.videoViewer,
})

export default connect(mapStatesToProps)(App);
