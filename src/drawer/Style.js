import { StyleSheet } from 'react-native';
import { fontsize, fontfamily, colors } from '../globalstyles/Style';

export default styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        padding: 15
    },
    row: {
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center',
    },
    name: {
        fontSize: fontsize.title,
        fontFamily: fontfamily.medium
    },
    number: {
        fontSize: fontsize.label,
        fontFamily: fontfamily.light,
        marginTop: '-15%',
        letterSpacing: 1
    },
    border: {
        height: 0.5,
        backgroundColor: '#ccc',
        width: '100%'
    },
    linearbtn: {
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 20,
        paddingHorizontal: 15
    },
    title: {
        fontSize: fontsize.title,
        fontFamily: fontfamily.regular
    },
    icon: {
        flexDirection: 'row',
        alignItems: 'center',
        //    paddingVertical: 6,
        paddingHorizontal: 15
    },
    logout: {
        width: 20,
        height: 27,
    },
    heading: {
        fontSize: fontsize.heading,
        fontFamily: fontfamily.medium
    },
})