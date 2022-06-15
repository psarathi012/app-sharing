import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, BackHandler, Alert } from 'react-native';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import { colors, fontsize, fontfamily } from '../globalstyles/Style';
import { NavigationEvents } from 'react-navigation';


class App extends Component {
  videoPlayer;

  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      duration: 0,
      isFullScreen: false,
      isLoading: true,
      paused: false,
      playerState: PLAYER_STATES.PLAYING,
      screenType: 'cover',
      uid:''
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

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>

        <StatusBar translucent barStyle='dark-content' />
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
            // onFullScreen={this.onFullScreen}
            onPaused={this.onPaused}
            onReplay={this.onReplay}
            onSeek={this.onSeek}
            onSeeking={this.onSeeking}
            playerState={this.state.playerState}
            progress={this.state.currentTime}
            toolbar={this.renderToolbar()}
          />
          <NavigationEvents
            onDidFocus={payload => { this.setState({ paused: false }); }}
            onWillBlur={payload => { this.setState({ paused: true }) }}
          />
        </View>

        <View style={styles.content}>
          {/* <Text style={styles.title}>What you want to do first</Text> */}

          <View style={styles.btncontiner}>
            <View style={styles.btnwidth}>
              <TouchableOpacity onPress={() => navigate('Createprofilevdo')}
                style={styles.btnsty}>
                <Text style={styles.btntxt} adjustsFontSizeToFit numberOfLines={1} >Create Profile</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btnwidth}>
              <TouchableOpacity
                onPress={() => navigate('Search_BrideGroom')}
                style={styles.btnstyborder}>
                <Text style={styles.btntxtborder} adjustsFontSizeToFit numberOfLines={1} >Search Profile</Text>
              </TouchableOpacity>
            </View>
          </View>

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
  btnsty: {

    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  btnstyborder: {
    height: 40,
    borderColor: colors.primary,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginLeft: 15
  },
  btntxt: {
    color: '#fff',
    fontFamily: fontfamily.roboto,
    fontSize: fontsize.subtitle
  },
  btntxtborder: {
    fontFamily: fontfamily.roboto,
    fontSize: fontsize.subtitle
  },
  btncontiner: {
    flexDirection: 'row',
    marginTop: 15
  },
  btnwidth: {
    width: '50%',
    // alignItems:'center'
  },
  title: {
    fontFamily: fontfamily.medium,
    fontSize: fontsize.title
  }

});
export default App;
