import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StatusBar,ScrollView } from 'react-native';
import { Container } from 'native-base';
import { Avatar } from 'react-native-elements';
import styles from './Style';
import { images } from '../globalstyles/Style';
import { SearchBar } from 'react-native-elements';

export default class Chat extends Component {
    state = {
        search: ''
    }

    updateSearch = (search) => {
        this.setState({ search });
    };

    renderRow = ({ item }) => {
        return (
            <TouchableOpacity style={styles.chats}
                onPress={() => this.props.navigation.navigate('ChattingScreen')}>
                    <View style={{width:'15%'}}>
                <Avatar size='medium' rounded source={item.image} />
                </View>
                <View style={styles.chating}>
                    <View style={styles.cardgradient}>
                    <Text style={styles.name}>{item.title}</Text>
                <Text style={styles.time}>{item.time}</Text>
                    </View>
               
                <Text style={styles.msgs} numberOfLines={1} >{item.Subtitle}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { search } = this.state;
        return (
            <Container style={{ flex: 1 }}>
                <StatusBar backgroundColor='#fff' barStyle='dark-content' />
                <ScrollView>
                <View style={styles.chat_header}>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                        <Image source={images.menu} style={styles.menu} />
                    </TouchableOpacity>
                    <Text style={styles.heading}>Chats</Text>
                    <View>
                        <SearchBar
                            searchIcon={{ size: 30 }}
                            placeholder="Search by Id or Name"
                            onChangeText={this.updateSearch}
                            value={search}
                            containerStyle={styles.containerStyle1}
                            inputContainerStyle={styles.inputContainerStyle}
                            inputStyle={styles.inputStyle} />
                    </View>
                    <View>
                    </View>
                    
                    <FlatList style={{marginTop:15}}
                        data={users}
                        renderItem={this.renderRow} />
                </View>
                </ScrollView>
            </Container>
        )
    }
}

const users = [
    { title: 'Ravi Rajput', Subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', image: images.image6, time: 'Active 5 min ago' },
    { title: 'Ram Rajput', Subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', image: images.image7,time: 'Active 5 min ago' },
    { title: 'Shayam Rajput', Subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', image: images.image8, time: 'Active 5 min ago' },
    { title: 'Ravi Rajput', Subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', image: images.image6, time: 'Active 5 min ago' },
    { title: 'Ram Rajput', Subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', image: images.image7,time: 'Active 5 min ago' },
    { title: 'Shayam Rajput', Subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', image: images.image8, time: 'Active 5 min ago' },
]
