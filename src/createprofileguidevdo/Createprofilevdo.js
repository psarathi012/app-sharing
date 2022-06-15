/*Example of React Native Video*/
import React, { Component } from 'react';
//Import React
import { Platform, StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
//Import Basic React Native Component
import Video from 'react-native-video';
//Import React Native Video to play video
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
//Media Controls to control Play/Pause/Seek and full screen
import { colors, fontsize, fontfamily } from '../globalstyles/Style';
import { NavigationEvents } from 'react-navigation';
import { myToken } from '../token/Token';
import { URL } from '../constant/Constant';

class App extends Component {
    videoPlayer;

    constructor(props) {
        super(props);
        this.state = {
            currentTime: 0, uid: '',
            duration: 0,
            isFullScreen: false,
            isLoading: true,
            paused: false,
            playerState: PLAYER_STATES.PLAYING,
            screenType: 'cover',
        };
    }

    onSeek = seek => {
        //Handler for change in seekbar
        this.videoPlayer.seek(seek);
    };

    onPaused = playerState => {
        //Handler for Video Pause
        this.setState({
            paused: !this.state.paused,
            playerState,
        });
    };

    onReplay = () => {
        //Handler for Replay
        this.setState({ playerState: PLAYER_STATES.PLAYING });
        this.videoPlayer.seek(0);
    };

    onProgress = data => {
        const { isLoading, playerState } = this.state;
        // Video Player will continue progress even if the video already ended
        if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
            this.setState({ currentTime: data.currentTime });
        }
    };

    onLoad = data => this.setState({ duration: data.duration, isLoading: false });

    onLoadStart = data => this.setState({ isLoading: true });

    onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED });

    onError = () => alert('Oh! ', error);

    exitFullScreen = () => {
        alert('Exit full screen');
    };


    enterFullScreen = () => { };

    onFullScreen = () => {
        if (this.state.screenType == 'content')
            this.setState({ screenType: 'cover' });
        else this.setState({ screenType: 'content' });
    };
    renderToolbar = () => (
        <View>
            <Text> toolbar </Text>
        </View>
    );
    onSeeking = currentTime => this.setState({ currentTime });

    async profile() {
        let params = { profile: {} }
        fetch(URL + 'profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': await myToken(),
            },
            body: JSON.stringify(params)
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log('responseJson uid:', responseJson.uid, 'id', responseJson.id)
                this.setState({ uid: responseJson.uid })
            })
            .catch(error => {
                console.error('INTRO: something went wrong...', error);
            });
    }

    componentDidMount() {
        this.profile();
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>

                <StatusBar backgroundColor='#fff' barStyle='dark-content' />
                <View style={{ height: '80%' }}>
                    <Video
                        onEnd={this.onEnd}
                        onLoad={this.onLoad}
                        onLoadStart={this.onLoadStart}
                        onProgress={this.onProgress}
                        paused={this.state.paused}
                        ref={videoPlayer => (this.videoPlayer = videoPlayer)}
                        resizeMode={this.state.screenType}
                        onFullScreen={this.state.isFullScreen}
                        source={{ uri: 'https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4' }}
                        style={styles.mediaPlayer}
                        volume={10}
                    />
                    <MediaControls
                        duration={this.state.duration}
                        isLoading={this.state.isLoading}
                        mainColor="#333"
                        //  onFullScreen={this.onFullScreen}
                        onPaused={this.onPaused}
                        onReplay={this.onReplay}
                        onSeek={this.onSeek}
                        onSeeking={this.onSeeking}
                        playerState={this.state.playerState}
                        progress={this.state.currentTime}
                        toolbar={this.renderToolbar()}
                    />
                    <NavigationEvents onDidFocus={payload => { this.setState({ paused: false }); }}
                        onWillBlur={payload => { this.setState({ paused: true }) }} />
                </View>

                <View style={styles.content}>
                    <TouchableOpacity onPress={() => navigate('Profile', { uid: this.state.uid })}
                        style={styles.btnstyborder}>
                        <Text style={styles.btntxtborder} numberOfLines={1}>Skip & continue profile creation</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toolbar: {
        marginTop: 30,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    mediaPlayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'black',
    },
    content: {
        justifyContent: 'center',
        // alignItems:'center',
        flex: 1,
        paddingHorizontal: 20
    },

    btnstyborder: {
        height: 48,
        backgroundColor: colors.primary,
        // borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        //  borderWidth: 2,
        //paddingVertical:10
    },

    btntxtborder: {
        fontFamily: fontfamily.regular,
        fontSize: fontsize.title,
        color: '#fff',

    },
    btncontiner: {
        flexDirection: 'row',
        marginTop: 15
    },


});
export default App