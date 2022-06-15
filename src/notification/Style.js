import {StyleSheet} from 'react-native';
import {fontsize,fontfamily,colors} from '../globalstyles/Style';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

export default styles = StyleSheet.create({
    container:{
        flex:1
    },
    content:{
        padding:15
    },
    backimg:{
        width:15,
        height:15
    },
    head:{
        fontSize: fontsize.heading,
        fontFamily: fontfamily.medium
    },
    row:{
        flexDirection:'row',
        paddingHorizontal:20
    },
    circle:{
        width:45,
        height:45,
        borderRadius:45/2,
        borderWidth:0.5,
        justifyContent:'center',
        alignItems:'center'
    },
    circleimg:{
        width:25,
        height:25
        },
        title:{
            fontSize: fontsize.title,
            fontFamily: fontfamily.medium,
            color: colors.danger
        },
        subtitle:{
            fontSize: fontsize.label,
            fontFamily: fontfamily.regular,
            color: colors.warning,
            marginTop:'-4%'
        },
        label:{
            fontSize: fontsize.label,
            fontFamily: fontfamily.regular,
            color: colors.warning,
            textAlign:'right',
            marginTop:5
          //  marginTop:'-15%'
        },
        border:{
            borderTopColor:'#C8C8C8',
            borderTopWidth:0.8
        },
        notification:{
            flexDirection:'row',
            justifyContent:'space-between'
        }
})