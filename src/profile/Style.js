import { StyleSheet, Dimensions } from 'react-native';
import { colors, fontsize, fontfamily } from '../globalstyles/Style';

const { width, height } = Dimensions.get('window');

export default styles = StyleSheet.create({
    forindicator: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    tabContainerStyle: {
        backgroundColor: '#fff', elevation: 0, borderBottomColor: '#ccc', borderBottomWidth: 1
    },
    tabheading: { backgroundColor: "transparent" },

    backimg: {
        width: 15,
        height: 15,
        // marginTop:'5%'
    },
    inputbox: {
        width: '20%',
        justifyContent: 'center',
        height: 45,
        borderColor: '#F0F0F0',
        borderWidth: 1,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        backgroundColor: '#F0F0F0',
        paddingLeft: 15,
        alignItems: 'center'
    },
    red: {
        color: '#f44336'
    },
    border: {
        borderLeftColor: '#ccc',
        borderLeftWidth: 1,
        paddingVertical: 10,
        height: 40,
        marginTop: 5
    },
    bgimg: {
        width: 70,
        height: 70,
        backgroundColor: '#FFE2EF',
        borderRadius: 5,
        justifyContent: 'center',
        borderRadius: 70 / 2,
        alignItems: 'center',
        overflow: 'hidden',
        marginTop: 10,
        //   flex:1
    },
    plus: {
        width: 25,
        height: 25,
        borderRadius: 25 / 2,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        position: 'absolute',
        top: 6,
        left: 50
    },
    userimg: {
        width: 46,
        height: 60,
        resizeMode: 'cover',
        marginTop: 20
    },
    uploadtxt: {
        marginLeft: 30,
        justifyContent: 'center',
        width: '60%'
    },
    title: {
        fontFamily: fontfamily.medium,
        fontSize: fontsize.heading,
    },
    input: {
        fontFamily: fontfamily.roboto,
        fontSize: fontsize.subtitle,
    },
    subtitle: {
        fontFamily: fontfamily.regular,
        fontSize: fontsize.subtitle,
    },
    inputtxt: {
        fontFamily: fontfamily.roboto,
        fontSize: fontsize.label,
        color: 'red'
    },
    settingimg: {
        alignItems: 'flex-end',
        width: '10%',
        justifyContent: 'center',
        marginRight: 15
    },
    content: {
        padding: 15
    },
    pickersty: {
        backgroundColor: '#F0F0F0',
        height: 40,
        borderRadius: 4,
        marginBottom: 10,
        paddingHorizontal: 15,
        justifyContent: 'center',
        borderColor: '#F0F0F0',
        borderWidth: 0.5
    },
    btnsty: {
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: 4,
        height: 42,
        marginBottom: 20,
    },
    okbtn: {
        height: 40,
        borderColor: colors.primary,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        marginLeft: 15,
        backgroundColor: '#fff',
        marginTop: 30
    },
    bgbtn: {
        height: 40,
        backgroundColor: colors.primary,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        marginTop: 30
    },
    dialogStyle: {
        backgroundColor: 'transparent', borderRadius: 0
    },
    datePicker: {
        width: '100%', backgroundColor: '#F0F0F0', justifyContent: 'center',
        borderRadius: 4,
        height: 40, paddingHorizontal: 15,
        marginBottom: 10
    },
    textAreaContainer: {
        backgroundColor: '#F0F0F0', paddingHorizontal: 15, borderRadius: 12
    },
    inputcontainer: {
        backgroundColor: '#F0F0F0',
        height: 45,
        borderRadius: 4,
        marginBottom: 10,
        paddingHorizontal: 15,
        justifyContent: 'center',
        borderColor: '#F0F0F0',
        borderWidth: 0.5
    },
    tabtxtsty: {
        fontFamily: fontfamily.roboto,
        fontSize: fontsize.subtitle,
        color: '#000',
    },
    activetabtxtsty: {
        fontFamily: fontfamily.roboto,
        fontSize: fontsize.subtitle,
        color: colors.primary,
    },
    linearGradient: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'

    },
})

