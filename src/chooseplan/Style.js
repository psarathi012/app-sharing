import { StyleSheet } from 'react-native';
import { fontsize, fontfamily, colors } from '../globalstyles/Style';

export default styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        padding: 10
    },
    backimg: {
        width: 15,
        height: 15,
        marginTop: '10%',
    },
    heading: {
        fontSize: fontsize.heading,
        fontFamily: fontfamily.medium
    },
    subtitle: {
        fontSize: fontsize.subtitle,
        fontFamily: fontfamily.regular,
        color: '#fff',
        textAlign: 'center',
        marginTop: -10,
        // textTransform:'capitalize'
    },
    subtitle_sub: {
        fontSize: fontsize.subtitle,
        fontFamily: fontfamily.regular,
        color: '#969595',
        textAlign: 'center',
        marginTop: -10,
        // textTransform:'capitalize'
    },
    subtitle_chooseplan: {
        fontSize: fontsize.subtitle,
        fontFamily: fontfamily.regular,
        color: '#000',
        textAlign: 'center',
        marginTop: -10,
        // textTransform:'capitalize'
    },
    head: {
        fontSize: fontsize.subtitle,
        fontFamily: fontfamily.medium,
        color: '#fff',
        textAlign: 'center',
    },
    head_chooseplan: {
        fontSize: fontsize.subtitle,
        fontFamily: fontfamily.medium,
        color: '#000000',
        textAlign: 'center',
    },
    title: {
        fontSize: 36,
        fontFamily: fontfamily.medium,
        color: '#fff',
        textAlign: 'center',
        marginTop: -20
    },
    title_new: {
        fontSize: 25,
        fontFamily: fontfamily.medium,
        color: '#9B0707',
        textAlign: 'center',
        marginTop: -20
    },
    title_chooseplan: {
        fontSize: 36,
        fontFamily: fontfamily.medium,
        color: '#000',
        textAlign: 'center',
        marginTop: -20
    },
    lineargradient: {
        flex: 1,
        borderRadius: 8
    },
    cardsty: {
        height: 200,
        width: 370,
        borderRadius: 8,
        marginTop: 15,

    },
    radioButtonWrap: {
        flex: 1,
        justifyContent: 'space-between',
        marginTop: '5%'
    },
    radioStyle: {
        justifyContent: 'space-between',
        marginRight: 20,
    },
    labelStyle: {
        marginTop: 15,
        fontSize: fontsize.label,
        fontFamily: fontfamily.regular
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
    forindicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputcontainer: {
        height: 48,
        borderColor: '#ccc',
        borderWidth: 1,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        paddingHorizontal: 15,
    },
    input: {
        fontFamily: fontfamily.roboto,
        fontSize: fontsize.subtitle,
        color: '#000'
    },
    btn_promo: {
        width: "30%",
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
    },
    buttonContainer: {
        // flexDirection: 'row',
        //  justifyContent: 'space-between',
        alignItems: 'center',
        //  marginBottom: 30,
        width: "33.3%",
        marginTop: 15
    },

    circle: {
        height: 25,
        width: 25,

        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#FB3B3B',
        alignItems: 'center',
        justifyContent: 'center',
    },

    checkedCircle: {
        width: 18,
        height: 18,
        borderRadius: 18,
        backgroundColor: '#FB3B3B',
    },
    back_btn: {
        borderWidth: 3,
        borderColor: '#228be6',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 40
    },
    bgbtn: {
        height: 40,
        backgroundColor: colors.primary,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        width: 100,
    },
    dialogStyle: {
        backgroundColor: 'transparent', borderRadius: 0
    },
    dialogcenter: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileribben: {
        width: 150,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 16,
        borderLeftWidth: 16,
        borderTopWidth: 16,
        borderBottomWidth: 16,
        borderRightColor: 'transparent',
        borderLeftColor: '#FE6DBB',
        borderTopColor: '#FE6DBB',
        borderBottomColor: '#FE6DBB',
        position: 'absolute',
        top: 0, left: 0
    },
    ribbentxt: {
        position: 'absolute',
        top: 2,
        left: 4
    },
})