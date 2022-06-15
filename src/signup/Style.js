import { StyleSheet, Dimensions } from 'react-native';
import { fontsize, fontfamily, colors, } from '../globalstyles/Style';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');

const windowWidth = Dimensions.get("window").width;


export default styles = StyleSheet.create({
    menu: {
        width: 20,
        height: 27,
    },
    logout: {
        width: 20,
        height: 27,
    },
    footerimg: {
        width: 20,
        height: 20
    },
    forindicator: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    footertxt: {
        fontFamily: fontfamily.roboto,
        fontSize: fontsize.label
    },
    cardfooter: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-between'
    },
    centeralign: {
        alignItems: "center",
        // backgroundColor:'transparent',
        // width:50,height:50,borderRadius:50/2,
        // justifyContent:'center'
    },
    cardgradient: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        textAlign: 'center',
        fontSize: RFPercentage(1.9),
        fontFamily: fontfamily.regular
    },
    content: {
        padding: 15
    },
    footertab: {
        backgroundColor: '#fff',
        elevation: 1,
        borderTopColor: '#ccc',
        borderTopWidth: 0.5,
        //paddingTop: 15
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    backimg: {
        width: 15,
        height: 15,
        marginTop: '1.5%',
        marginLeft: 15
    },
    headersty: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 15,
        elevation: 1,
        borderBottomColor: "#ccc",
        borderBottomWidth: 0.3,
        // marginTop:'5%'
    },
    head: {
        fontSize: fontsize.heading,
        // fontFamily: fontfamily.medium
    },
    linearGradient: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'

    },
    bgimg: {
        width: 65,
        height: 65,
        backgroundColor: '#fff',
        borderRadius: 5,
        justifyContent: 'center',
        borderRadius: 70 / 2,
        alignItems: 'center',
        overflow: 'hidden',
        // marginTop: 10
    },
    plus: {
        width: 25,
        height: 25,
        borderRadius: 25 / 2,
        backgroundColor: '#777',
        justifyContent: 'center',
        position: 'absolute',
        top: 5,
        left: 48
    },
    userimg: {
        width: 46,
        height: 50,
        resizeMode: 'cover',
        marginTop: 15
    },
    number: {
        fontSize: RFPercentage(3.9),
        fontFamily: fontfamily.medium,
        color: '#fff',
        textAlign: 'center'
    },
    title: {
        fontSize: fontsize.subtitle,
        fontFamily: fontfamily.regular,

    },
    titlergt: {
        fontSize: fontsize.subtitle,
        fontFamily: fontfamily.regular,
        textAlign: 'right',

    },
    crdsty: {
        borderRadius: 8,
        backgroundColor: '#FFE2EF',
        width: '80%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        //    marginLeft:'10%'
    },
    crdcvr: {
        paddingHorizontal: 15,
        paddingTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginVertical: 5
    },
    subtitle: {
        fontSize: fontsize.label,
        fontFamily: fontfamily.regular
    },
    crdimg: {
        width: 25,
        height: 25,
    },
    crdwdh: {
        width: '33.3%',
        alignItems: 'center'
    },
    heading: {
        fontSize: fontsize.heading,
        fontFamily: fontfamily.medium
    },
    righttxt: {
        textAlign: 'right',
        fontSize: fontsize.subtitle,
        fontFamily: fontfamily.regular,
        marginTop: 5
    },
    row: {
        flexDirection: 'row',
        paddingHorizontal: 15
    },
    crdrow: {
        paddingHorizontal: 15,
        width: '65%',
        paddingTop: 5
    },
    border: {
        borderBottomColor: 'rgba(0, 0, 0, 0.3)',
        borderBottomWidth: 0.7,

    },

    subheading: {
        fontSize: 15,
        fontFamily: fontfamily.medium
    },

    card: {
        width: windowWidth - 50,
        borderColor: '#ccc',
        borderWidth: 0.1,
        borderRadius: 5,
        elevation: 1,
        flexDirection: 'row',
        marginRight: 5,
        height: 180,
        // height:height*0.3

    },
    cards: {
        width: 200,
        borderColor: '#ccc',
        borderWidth: 0.1,
        borderRadius: 5,
        elevation: 1,
        flexDirection: 'row',
        marginRight: 5,
        height: 200,
        // height:height*0.3

    },

    cardg: {

        width: 200,
        borderColor: 'green',
        borderWidth: 3,
        borderRadius: 5,
        elevation: 1,
        flexDirection: 'row',
        marginRight: 5,
        height: 200,
        // height:height*0.3

    },


    mt: {
        // marginTop:-35
    },
    btncontiner: {
        flexDirection: 'row',
        marginTop: 5,
        width: windowWidth - 50,
        marginRight: 5
    },
    btnwidth: {
        width: '50%',
    },
    btnsty: {
        height: 40,
        backgroundColor: colors.primary,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        // borderWidth: 2,
        borderColor: colors.primary,
    },
    rowcontent: {
        flexDirection: 'row'
    },
    btnstyborder: {
        height: 40,
        borderColor: colors.primary,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        marginLeft: 5
    },
    undobtn: {
        height: 40,
        borderColor: colors.primary,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        marginTop: 5,
        marginRight: 5
    },
    btntxt: {
        color: '#fff',
        fontFamily: fontfamily.medium,
        fontSize: fontsize.subtitle
    },
    btntxtborder: {
        fontFamily: fontfamily.medium,
        fontSize: fontsize.subtitle,
        color: colors.primary
    },
    featurecard: {
        // width: windowWidth-50,
        borderColor: '#ccc',
        borderWidth: 0.4,
        borderRadius: 5,
        elevation: 1,
        borderRadius: 5,
        overflow: 'hidden',
        height: 460
        //  height: height - 200,
        // backgroundColor:'red'
    },
    featureimg: {
        // height: height - 270,
        width: '100%',
        height: 400
        // borderTopLeftRadius:5,
        // borderTopRightRadius:5
    },
    avatar: {
        width: 45, height: 45, borderRadius: 45 / 2,
        backgroundColor: 'rgba(45, 45, 45, 0.4)',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ribben: {
        width: 110,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 16,
        borderLeftWidth: 16,
        borderTopWidth: 16,
        borderBottomWidth: 16,
        borderRightColor: '#f5b4a3',
        borderLeftColor: 'transparent',
        borderTopColor: '#f5b4a3',
        borderBottomColor: '#f5b4a3',
        position: 'absolute',
        top: 25, right: 0
    },
    ribbentxt: {
        position: 'absolute',
        top: 18,
        right: 15
    },
    criteriabtn: {
        width: 200,
        backgroundColor: '#D61669',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        marginVertical: 15
    },

    myProfilecard: {
        height: height - 200,
        borderColor: '#ccc',
        borderWidth: 0.1,
        borderRadius: 5,
        elevation: 1,
        borderRadius: 5,
        overflow: 'hidden',
        marginVertical: 10,
        // height:460
    },
    myProfileimg: {
        width: "100%",
        height: '100%',
        resizeMode: 'cover'
    },
    myProfileimgcover: {
        width: '100%',
        height: height - 270
        //  height:400
    },
    profileribben: {
        width: 110,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 16,
        borderLeftWidth: 16,
        borderTopWidth: 16,
        borderBottomWidth: 16,
        borderRightColor: '#BE9B38',
        borderLeftColor: 'transparent',
        borderTopColor: '#BE9B38',
        borderBottomColor: '#BE9B38',
        position: 'absolute',
        top: 25, right: 0
    },
    linergradient: {
        position: 'absolute',
        width: '100%',
        height: "45%",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        bottom: 60,
        padding: 15
    },
    profilegradient: {
        position: 'absolute',
        width: '100%',
        height: 210,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        bottom: 0,
        padding: 15
    },
    width: {
        width: '25%',
        alignItems: "center"
    },
    containerStyle: {
        position: 'absolute',
        top: 0,
        right: -5
    },
    textStyle: {
        color: '#000',
        fontFamily: fontfamily.regular,
        fontSize: 14
    },
    fullProfile: {
        width: '100%',
        height: height - 200,
    },
    editprofile: {
        resizeMode: 'cover',
        flex: 1,
        aspectRatio: 1 // Your aspect ratio
    },
    cardtxt: {
        fontSize: fontsize.label,
        fontFamily: fontfamily.medium
    },
    cardcontent: {
        paddingVertical: 5,
        paddingHorizontal: 15,

    },
    linearbtn: {
        marginHorizontal: 10,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: '-3%',
        paddingHorizontal: 40
    },
    btnimg: {
        width: 18,
        height: 18,
        marginLeft: 15,
        marginTop: -5
    },
    bellicon: {
        width: 25,
        height: 25,
        marginLeft: 10
    },
    chat_header: {
        paddingHorizontal: 15,
        paddingTop: 15,
        //marginTop:'5%'
    },
    containerStyle1: {
        backgroundColor: '#fff',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        // marginTop:10,
    },
    inputContainerStyle: {
        backgroundColor: '#F0F0F0',
        borderRadius: 8
    },
    inputStyle: {
        fontSize: fontsize.subtitle,
        fontFamily: fontfamily.roboto,
    },
    name: {
        fontSize: fontsize.subtitle,
        fontFamily: fontfamily.medium,
        color: '#000'
    },
    msgs: {
        fontSize: fontsize.label,
        fontFamily: fontfamily.light,
        color: 'rgba(32, 32, 32, 0.7)',
        marginTop: -18,
    },
    chats: {
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    chating: {
        marginLeft: 15,
        marginTop: -10,
        width: '80%',
        justifyContent: 'center'
    },
    time: {
        fontSize: fontsize.label,
        fontFamily: fontfamily.light,
        //textAlign: 'right',
        color: '#9E9E9E',
        // marginTop: '-15%'
    },
    headerLeft: {
        width: 15,
        height: 15,
        marginLeft: 15
    },
    headerRight: {
        width: 15,
        height: 15,
        marginRight: 15
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    circle: {
        width: 125,
        height: 125,
        borderRadius: 150 / 2,
        backgroundColor: '#FFF3F9',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textinputcontainer: {
        position: 'absolute',
        bottom: 0,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderTopColor: '#ccc',
        borderTopWidth: 0.5,
        width: '100%',
        backgroundColor: '#F0F0F0'
    },
    input: {
        borderRadius: 50,
        backgroundColor: '#fff',
        paddingLeft: 20,
        borderColor: '#ccc',
        borderWidth: 0.7,
        //  height: 40,
        paddingRight: 50,
        fontSize: fontsize.label
    },
    iconlock: {
        width: 20,
        height: 20,
        position: 'absolute',
        right: 30,
        top: 25
    },
    king: {
        width: 40,
        height: 40
    },
    leftbox: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        marginBottom: 10,
        width: '60%',
        paddingVertical: 3,
        alignSelf: 'flex-start',
        backgroundColor: '#FFF3F9'
    },
    rightbox: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 12,
        marginBottom: 10,
        width: '60%',
        paddingVertical: 3,
        alignSelf: 'flex-end',
        backgroundColor: '#FFF3F9'
    },
    message: {
        paddingHorizontal: 15,
        fontSize: fontsize.label,
        fontFamily: fontfamily.regular
    },
    msgtime: {
        textAlign: 'right',
        marginTop: -10,
        fontSize: fontsize.label,
        fontFamily: fontfamily.light,
        color: colors.warning
    },
    dialogStyle: {
        backgroundColor: 'transparent', borderRadius: 0
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
    dialogContent: {
        textAlign: 'center',
        fontSize: fontsize.subtitle,
        fontFamily: fontfamily.regular
    },
    linearGradientcover: {
        position: 'absolute',
        bottom: 10,
        left: 15, right: 15
    },
    headertitle: {
        fontSize: 16,
        fontFamily: fontfamily.medium,
        marginLeft: 10
    },
    mt30: {
        marginTop: 15
    },
    personimg: {
        width: '100%',
        height: 160,

        //height:height*0.3
        // resizeMode:'cover'
    },
    profile_photo: {
        width: '100%',
        height: '100%',
        borderBottomColor: 'red',

    },
    profile_photo_border: {
        width: '100%',
        height: '100%',
        borderColor: colors.primary,

    },
    iconbox: {
        borderRadius: 8,
        backgroundColor: '#FFE2EF',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100
    },
    helpbox: {
        flexDirection: "row",
        alignItems: 'center'
    },
    activebtnStyle: {
        width: '80%',
        height: '85%',
        backgroundColor: colors.danger,
        borderRadius: 4,
        alignItems: 'center'
    },
    btnStyle: {
        width: '80%',
        height: '85%',
        borderRadius: 4,
        alignItems: 'center',
        backgroundColor: '#808080',
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
})