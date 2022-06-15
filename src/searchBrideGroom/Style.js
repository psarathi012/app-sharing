import { StyleSheet } from 'react-native';
import { fontsize, fontfamily, colors } from '../globalstyles/Style';

export default styles = StyleSheet.create({
    forindicator: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    container: {
        flex: 1
    },
    content: {
        padding: 15
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    wdh: {

        width: '50%'
    },
    head: {
        fontSize: fontsize.heading,
        fontFamily: fontfamily.medium,
        color: '#000'
    },
    head_clear_all: {
        fontSize: 17,
        fontFamily: fontfamily.medium,
        color: '#000'
    },
    createriatxt: {
        fontSize: fontsize.subtitle,
        fontFamily: fontfamily.regular,
        textAlign: 'right',
        textDecorationLine: 'underline',
        color: colors.primary,
        marginTop: 5
    },
    containerStyle: {
        backgroundColor: '#F0F0F0',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        marginTop: 10,
        borderRadius: 8
    },
    inputContainerStyle: {
        backgroundColor: '#F0F0F0',

    },
    inputStyle: {
        fontSize: fontsize.subtitle,
        fontFamily: fontfamily.roboto,
    },
    title: {
        fontSize: fontsize.title,
        fontFamily: fontfamily.medium
    },
    subtitle: {
        fontSize: fontsize.subtitle,
        fontFamily: fontfamily.regular,
        marginTop: -20
    },
    heading: {
        fontSize: 24,
        fontFamily: fontfamily.regular,
        // letterSpacing: 1,
        // textAlign:'center'
    },
    headinglabel: {
        fontSize: 22,
        fontFamily: fontfamily.robotolight,
        // letterSpacing: 1,
        // textAlign:'center'
    },
    border: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(32, 32, 32, 0.4)'
    },
    pickersty: {
        backgroundColor: '#fff',
        height: 50,
        borderRadius: 8,
        marginBottom: 10,
        paddingHorizontal: 15,
        justifyContent: 'center',
        borderColor: 'rgba(32, 32, 32, 0.4)',
        borderWidth: 1
        // flex:1,
    },
    pickerstyle: {
        height: 50,
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,

        // flex:1,
    },
    searchbtn: {
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        position: 'absolute',
        top: '2%',
    },
    TouchableOpacityStyle: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: colors.primary,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        // marginTop: '10%'
    },

    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        backgroundColor: 'black',
    },
    pickerItem: {
        //  height: 40, 
        width: 100,
        //  transform: [{ scaleX: 1.4 }, { scaleY: 1.5 }] ,
        marginTop: '-5%'
    },
    center: {
        // alignItems:'center',
        justifyContent: "center",
        marginTop: 30
    },
    activebtnStyle: {
        backgroundColor: colors.danger,
        borderRadius: 4,
        alignItems: 'center'
    },
    btnStyle: {
        borderRadius: 4,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    activebtntext: {
        fontSize: fontsize.title,
        fontFamily: fontfamily.medium,
        color: '#fff'
    },
    btntext: {
        fontSize: fontsize.title,
        fontFamily: fontfamily.medium,
        color: '#000'
    },
    active: {
        color: '#fff',
        fontSize: fontsize.title,
        fontFamily: fontfamily.bold,
        textTransform: 'capitalize',

    },
    inactive: {
        color: '#FFA500',
        fontSize: 12,
        fontFamily: fontfamily.bold,
        textTransform: 'capitalize',

    },
    centercontent: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center'
    }

})