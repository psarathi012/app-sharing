import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    Image,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Picker,
    AsyncStorage,
    ActivityIndicator,
    StyleSheet
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Container } from 'native-base';
import { images, colors } from '../globalstyles/Style';
import styles from './Style';
import { URL } from '../constant/Constant';
import { myToken } from '../token/Token';
import { Button } from 'react-native-share';
import Personal from '../profile/Personal';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Toast from 'react-native-simple-toast';

var searchObj = new Personal();

export class PhotoUpload extends Component {


    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0, dp: '', status: '',
            photo: null,
            ur: '',
            ispressed: '',
            uid: '',
            dp: '',
            picname: '',
            picurl: '',
            photos: [],
            imagePath: require('../RL_images/Vector1.png'),
            button1: true,
            button2: true,
        };
    }

    async getProfile() {

        console.log("getprofile is working fine sssssssssssssssssssssssssssss");
        fetch(URL + 'profile', {
            method: 'GET',
            headers: {
                'Authorization': await myToken(),
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.code == 'not-found') {
                    console.log(responseJson.msg);
                    this.setState({ loading: false });
                } else {
                    if (responseJson.personal.fname == undefined) {
                        console.log('personal data not found');
                        this.setState({ loading: false });
                    } else {
                        //console.log('get data personal', responseJson.personal );


                        let photos = responseJson.photos;
                        this.setState({ photos: responseJson.photos });

                        console.log(photos, "this is the photos");
                        if (photos.length == 0) {
                            console.log(photos, 'dp does not exit');
                        } else {
                            let obj = photos.find((o) => o.isDisplayPic === true);
                            console.log(photos.length, 'photosccccccccccccccccccc');
                            this.setState({ photo_count: photos.length })
                            this.setState({ dp: obj.url });
                        }

                        let obj = responseJson.uid;
                        this.setState({ uid: obj });


                    }
                }
            })

            .catch(error => {
                console.error('something went wrong...', error);
            });


    }///////////////////////////////////////////////////////////////////////////////////////

    chooseFile = () => {
        this.setState({ status: '' });
        //console.log(token, "tooooooooooooooooooooookeeeeeeeeeeeeeeeeeeeeeeeeeeeennnnnnn");
        var options = {
            title: 'Select Image',
            customButtons: [
                { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            ],
            storageOptions: {
                skipBackup: true, // do not backup to iCloud
                path: 'images', // store camera images under Pictures/images for android and Documents/images for iOS
            },
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker', storage());
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {

                let path = this.getPlatformPath(response).value;
                let fileName = this.getFileName(response.fileName, path);
                this.setState({ imagePath: path });
                this.uploadImageToStorage(path, fileName);
            }
        });
    };

    getFileName(name, path) {
        if (name != null) {
            return name;
        }

        if (Platform.OS === 'ios') {
            path = '~' + path.substring(path.indexOf('/Documents'));
        }
        return path.split('/').pop();
    }

    uploadImageToStorage(path, name) {
        this.setState({ isLoading: true });
        //console.log(myToken(), "sssssffffff");
        console.log('userPhotos/' + this.state.uid + '/' + name, "fffffffffufhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
        let reference = storage().ref('userPhotos/' + this.state.uid + '/' + name);


        let task = reference.putFile(path);
        task
            .then(() => {

                console.log('Image uploaded to the bucket!');
                this.setState({
                    isLoading: false,
                    status: 'Image uploaded successfully',
                });
                Toast.show('Image uploaded successfully', Toast.SHORT);
                reference
                    .getDownloadURL()
                    .then((url) => {
                        //from url you can fetched the uploaded image easily
                        //this.setState({ profileImageUrl: url });
                        this.profilephotos(name, url);
                        console.log(url, "this is the url Paarths")
                        /////////////////////////////////////////////
                    })
                    .catch((e) => console.log('getting downloadURL of image errorsssssssss => ', e));
            })
            .catch((e) => {
                status = 'Something went wrong';
                console.log('uploading image error => ', e);
                this.setState({ isLoading: false, status: 'Something went wrong' });
            });


    }

    async upload_Image(name) {
        console.log('name', name);
        let params = { name: name, isDisplayPic: false };
        fetch(URL + 'profile/photo', {
            method: 'POST',
            headers: {
                Authorization: await myToken(),
            },
            body: JSON.stringify(params),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('responseJson', responseJson);
            })
            .catch((error) => {
                console.error('something went wrong...', error);
            });
    }

    async profilephotos(name, url) {
        console.log(name, "this is the name of the selected photo");
        console.log(url, "thivbvvvvvvvvvv");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", await myToken());
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "name": name, "url": url, "isDisplayPic": true });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://192.168.0.204:5001/rajput-matrimony-8f30a/asia-south1/api/profile/photos", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    /**
     * Get platform specific value from response
     */
    getPlatformPath({ path, uri }) {
        return Platform.select({
            android: { value: uri },
            ios: { value: uri },
        });
    }

    getPlatformURI(imagePath) {
        let imgSource = imagePath;
        if (isNaN(imagePath)) {
            imgSource = { uri: this.state.imagePath };
            if (Platform.OS == 'android') {
                imgSource.uri = 'file:///' + imgSource.uri;
            }
        }
        return imgSource;
    }/////////////////////////////////////////////////////////////////////////////////////////////////

    componentDidMount() {
        this.getProfile();
    }
    setfunction(id, name, url) {
        this.setState({ ispressed: id });
        this.setState({ picname: url.substring(125, 190) });
        this.setState({ picurl: url });

        console.log(this.state.picurl, "this is name from setfunction");
    }


    _renderItemInterests = ({ item }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => { this.setfunction(item.id, item.name, item.url) }}>
                    {item.id == this.state.ispressed ?
                        <View style={styles.cardg}>
                            <View style={{ width: '100%' }}>

                                <Image
                                    source={{ uri: item.url }}
                                    resizeMode="cover"
                                    style={styles.profile_photo}
                                />




                            </View>
                        </View>
                        :
                        <View style={styles.cards}>
                            <View style={{ width: '100%' }}>

                                <Image
                                    source={{ uri: item.url }}
                                    resizeMode="cover"
                                    style={styles.profile_photo}
                                />




                            </View>
                        </View>
                    }
                </TouchableOpacity>
            </View >





        );
    };


    workbutton1 = () => {
        // this.setState({ iscolor: true });
        this.setState({ button1: true });
        this.setState({ button2: true });
        this.chooseFile();
    }
    workbutton2 = () => {
        //this.setState({ iscolor: false });
        this.setState({ button1: true });
        this.setState({ button2: true });
        this.profilephotos(this.state.picname, this.state.picurl);
    }

    render() {
        return (
            <Container>
                <ScrollView>
                    <View style={{ flex: 1, flexDirection: 'row', position: 'relative' }}>
                        <View style={{ flex: 0.5, marginTop: '5.5%' }}>
                            <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.navigate('Personal')}>
                                <Image source={images.back} style={styles.backimg} tintColor='#000' />
                            </TouchableOpacity>

                        </View>
                        <View style={{ flex: 0.5, marginLeft: '-50%' }}>
                            <Text style={[styles.heading, { paddingLeft: 15 }]}>Photos</Text>
                        </View>
                    </View>
                    <View>
                        {this.state.dp ? <View style={{ marginLeft: '12%', marginTop: '5%' }}><Image source={{ uri: this.state.dp }}
                            style={{ width: 300, height: 300 }}
                        /></View> : <Text></Text>}
                    </View>
                    <View><Text> </Text></View>

                    {this.state.photos.length !== 0 ? <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={this.state.photos}
                        renderItem={this._renderItemInterests}
                        keyExtractor={(item, index) => index.toString()}
                    /> : <Text>nothing</Text>}
                    <View style={{ flex: 1, flexDirection: 'row', position: 'relative' }}>
                        <View style={{ flex: 0.5, marginTop: '5.5%' }}>
                            <TouchableOpacity
                                onPress={() => this.workbutton1()}
                                // disabled={this.state.female}
                                style={
                                    this.state.button1
                                        ? styles.activebtnStyle
                                        : styles.btnStyle
                                }>
                                <Text
                                    style={[
                                        styles.head,
                                        this.state.button1 ? styles.active : null,
                                    ]}>
                                    Add Photo
                      </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 0.5, marginLeft: '10%', marginTop: '5%' }}>
                            <TouchableOpacity
                                onPress={() => this.workbutton2()}
                                // disabled={this.state.female}
                                style={
                                    this.state.button2
                                        ? styles.activebtnStyle
                                        : styles.btnStyle

                                }>
                                <Text
                                    style={[
                                        styles.head,
                                        this.state.button2 ? styles.active : null,
                                    ]}>
                                    Make Dp
                      </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>
            </Container>
        )
    }
}

const data = [
    {
        title: 'XAJ110',
        varified: 'Varified Id',
        dowry: 'Against Dowry',
        year: '24yrs 6,11',
        cast: 'Chauhan',
        city: 'Rajasthan',
        education: 'B.tech | 24 LPA',
        proffesion: 'Software Dev | New Delhi',
        image: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
        subCaste: 'SubCaste',
        dev: 'Soft.Dev',
        study: 'B.tech',
        subtitle: '24yrs',
    },
    {
        title: 'XAJ111',
        varified: 'Varified Id',
        dowry: 'Against Dowry',
        year: '24yrs 6,11',
        cast: 'Chauhan',
        city: 'Rajasthan',
        education: 'B.tech | 24 LPA',
        proffesion: 'Software Dev | New Delhi',
        image: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
        subCaste: 'SubCaste',
        dev: 'Soft.Dev',
        study: 'B.tech',
        subtitle: '24yrs',
    },
    {
        title: 'XAJ112',
        varified: 'Varified Id',
        dowry: 'Against Dowry',
        year: '24yrs 6,11',
        cast: 'Chauhan',
        city: 'Rajasthan',
        education: 'B.tech | 24 LPA',
        proffesion: 'Software Dev | New Delhi',
        image: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
        subCaste: 'SubCaste',
        dev: 'Soft.Dev',
        study: 'B.tech',
        subtitle: '24yrs',
    },
    {
        title: 'XAJ113',
        varified: 'Varified Id',
        dowry: 'Against Dowry',
        year: '24yrs 6,11',
        cast: 'Chauhan',
        city: 'Rajasthan',
        education: 'B.tech | 24 LPA',
        proffesion: 'Software Dev | New Delhi',
        image: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
        subCaste: 'SubCaste',
        dev: 'Soft.Dev',
        study: 'B.tech',
        subtitle: '24yrs',
    },
];

export default PhotoUpload
