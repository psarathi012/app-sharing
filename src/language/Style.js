import { StyleSheet } from 'react-native';
import { fontsize, fontfamily, colors } from '../globalstyles/Style';

export default styles = StyleSheet.create({
    container: {
        flex:1,
        padding:15
    },
    backimg:{
        width:15,
        height:15,
        marginTop:20
    },
    content:{
        marginTop:15,

    },
    btnsty1:{
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: colors.primary,
        borderRadius:8,
        height:42,
        marginBottom:20,
      //  marginTop:60
    },
    btnsty2:{
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: colors.danger,
        borderRadius:8,
        height:42,
        marginTop:20
    },
    subtitle: {
        fontSize: fontsize.subtitle,
        fontFamily: fontfamily.light,
        color: 'rgba(32, 32, 32, 0.6)',
        textAlign: 'center'
    },
    title:{
        fontSize: fontsize.title,
        fontFamily: fontfamily.regular,
        color: '#fff',
        textAlign: 'center'
    },
    heading:{
        fontSize: fontsize.heading,
        fontFamily: fontfamily.bold,
        color:colors.warning,
        textAlign: 'center'
    },
   
    label:{
        fontSize: fontsize.label,
        fontFamily: fontfamily.light,
        color: colors.warning,
        textAlign: 'center',
    },
    subtitletxt: {
        fontSize: fontsize.subtitle,
        fontFamily: fontfamily.regular,
        color: colors.warning,
        textAlign: 'center',
    },
    center:{
        justifyContent:'center',
       // alignItems:'center',
        flex:1
    }
})