import { StyleSheet } from 'react-native';
import { colors, fontsize, fontfamily } from '../globalstyles/Style';

export default styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        padding: 15
    },
    heading: {
        fontSize: fontsize.heading,
        fontFamily: fontfamily.medium
    },
    backimg: {
        width: 15,
        height: 15,
        // marginTop: '6%',
    },
    box: {
        backgroundColor: '#EDEDED',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginBottom: 15
    },
    title: {
        fontSize: fontsize.title,
        fontFamily: fontfamily.medium,

    },
    radioButtonWrap: {
        justifyContent: 'center',
        marginTop: 30,
        borderWidth: 0.7,
        borderColor: '#898989',
        height: 50,
        paddingLeft: 15,
        borderRadius: 4,
    },
    radioStyle: {
        marginRight: 20, marginTop: 10
    },
    labelStyle: {
        fontSize: fontsize.subtitle,
        fontFamily: fontfamily.regular,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: colors.primary,
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    head: {
        fontSize: fontsize.subtitle,
        fontFamily: fontfamily.medium,
        color: '#fff',
        textAlign: 'center',
    },
    forindicator: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
})