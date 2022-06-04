import React from 'react'
import { Modal } from 'antd'
import videojs from 'video.js'

function VideoViewer(props) {

    const videoRef = React.useRef(null);
    const playerRef = React.useRef(null);
    const { options, onReady } = props;

    React.useEffect(() => {

        // Make sure Video.js player is only initialized once
        if (!playerRef.current) {
            const videoElement = videoRef.current;

            if (!videoElement) return;

            const player = playerRef.current = videojs(videoElement, options, () => {
                player.log('player is ready');
                onReady && onReady(player);
            });

            // You can update player in the `else` block here, for example:
        } else {
            const videoElement = videoRef.current;

            const player = playerRef.current = videojs(videoElement, options, () => {
                player.autoplay(options.autoplay);
                player.src(options.sources);
            });
        }
    }, [options, videoRef]);

    // Dispose the Video.js player when the functional component unmounts
    React.useEffect(() => {
        const player = playerRef.current;
        return () => {
            if (player && props.visible === false) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    return (
        <Modal
            centered
            width={690}
            title={`Playing the video ${props.videoId}`}
            visible={props.visible}
            onOk={props.onOk}
            onCancel={props.onCancel}
            okText="Submit"
            cancelText="Close"
        >
            <div data-vjs-player>
                <video ref={videoRef} className='video-js vjs-big-play-centered' />
            </div>
        </Modal>
    )
}


export default VideoViewer