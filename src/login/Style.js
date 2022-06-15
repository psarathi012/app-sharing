import { StyleSheet, Dimensions } from 'react-native';
import { fontsize, fontfamily, colors } from '../globalstyles/Style';
const { width, height } = Dimensions.get('window');

export default styles = StyleSheet.create({
  image: {
    width: '100%',
    height: height - 250,
    borderRadius: 5,
    resizeMode: 'cover'
  },
  text: {
    fontSize: fontsize.heading,
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 30,
    fontFamily: fontfamily.italic,
    textTransform: 'capitalize',
    fontWeight: '900'
  },
  title: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonCircle: {
    width: 40, height: 80,
    borderTopRightRadius: 150,
    borderBottomRightRadius: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'absolute',
    left: 35,
    zIndex: 999
  },
  next: {
    width: 40, height: 80,
    borderTopLeftRadius: 150,
    borderBottomLeftRadius: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'absolute',
    right: 35,
    zIndex: 999
  },
  linearGradient: {
    height: 410,
  },
  triangleCorner: {
    width: '100%',
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 450,
    borderTopWidth: 150,
    borderRightColor: 'transparent',
    borderTopColor: '#D61669',
  },
  inputbtn: {
    width: '15%',
    backgroundColor: '#FC5C33',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    height: 48,
  },
  inputbox: {
    width: '20%',
    justifyContent: 'center',
    height: 48,
    borderColor: '#F0F0F0',
    borderWidth: 1,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: '#F0F0F0',
    paddingLeft: 15,
    alignItems: 'center'
  },
  content: {
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 35,
    //alignItems:'center'
    // marginTop:-10
  },
  btnsty: {
    backgroundColor: '#127FFF',
    paddingHorizontal: 20,
    borderRadius: 5,
    //  flexDirection: "row",
    alignItems: 'center',
    height: 48, marginTop: 20,
    justifyContent: 'center'
  },
  icon_sty: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    backgroundColor: '#fff',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_txt: {
    fontSize: fontsize.title,
    fontFamily: fontfamily.regular,
    color: '#fff',
    //letterSpacing: 0.2,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fontsize.subtitle,
    fontFamily: fontfamily.light,
    color: 'rgba(32, 32, 32, 0.6)',
    textAlign: 'center'
  },
  carousel: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#000",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    color: '#000',
    fontSize: fontsize.subtitle
  },

  underlineStyleHighLighted: {
    borderColor: "#000",
  },
  opt_subtitle: {
    fontSize: fontsize.label,
    fontFamily: fontfamily.regular,
    textAlign: 'center'
  },
  resend_txt: {
    textAlign: 'center',
    fontFamily: fontfamily.medium,
    fontSize: fontsize.subtitle,
    textDecorationLine: 'underline',
    color: colors.primary
  },
  dialogtitle: {
    backgroundColor: '#fff',
    elevation: 0,
    borderBottomColor: '#fff'
  },
  dialogcontent: {
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  input: {
    fontFamily: fontfamily.roboto,
    fontSize: fontsize.subtitle,
    color: '#000'
  },
  resendOTP: {
    fontSize: fontsize.label,
    fontFamily: fontfamily.light,
    textAlign: 'center',
    color: colors.warning
  },
  inputcontainer: {
    height: 48,
    borderColor: '#F0F0F0',
    borderWidth: 1,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 15,
    // borderLeftColor:'#000',
    // borderLeftWidth:1
  },
  border: {
    borderLeftColor: '#ccc',
    borderLeftWidth: 1,
    paddingVertical: 10,
    height: 40,
    marginTop: 5
  },
  cardCut: {
    paddingTop: height - 400, borderBottomWidth: 140, borderBottomColor: '#fff',
    borderLeftColor: '#E75935', borderLeftWidth: width, position: 'absolute'
  }, forindicator: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },

})