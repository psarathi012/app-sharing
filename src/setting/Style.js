import {StyleSheet} from 'react-native';
import {fontsize,fontfamily, colors} from '../globalstyles/Style';

export default styles = StyleSheet.create({
    container:{
        flex:1
    },
    content:{
        padding:15
    },
    backimg:{
        width:15,
        height:15,
        // marginTop:20
    },
    heading:{
        fontSize: fontsize.heading,
        fontFamily: fontfamily.medium
    },
    title:{
        fontSize: fontsize.title,
        fontFamily: fontfamily.regular
    },
    subtitle:{
        fontSize: fontsize.subtitle,
        fontFamily: fontfamily.light,
        color: colors.warning,
        letterSpacing:1
    },

    label:{
        fontSize: fontsize.label,
        fontFamily: fontfamily.regular,
        color: 'rgba(32, 32, 32, 0.5)'
    },
    my_label:{
        fontSize: fontsize.label,
        fontFamily: fontfamily.roboto,
        color: 'rgba(32, 32, 32, 0.5)'
    },
    border:{
        borderBottomWidth:0.5,
        borderBottomColor:'#ccc'
    },
    number:{
        fontSize: fontsize.title,
        fontFamily: fontfamily.medium,
        color: colors.danger,
        textAlign:'right',
       // marginTop:'-15%'
    },
    rowcentr:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    forindicator:{
        justifyContent:'center',
        alignItems: 'center',
        flex:1
    },
    crdsty:{
        borderRadius:10
    },
    buttonContainer: {
         flexDirection: 'row',
         //  justifyContent: 'space-between',
           alignItems: 'center',
        //  marginBottom: 30,
      //   width: "33.3%",
        // marginTop:5
       },
     
       circle: {
         height: 20,
         width: 20,
         borderRadius: 10,
         borderWidth: 2,
         borderColor: colors.primary,
         alignItems: 'center',
         justifyContent: 'center',
       },
     
       checkedCircle: {
         width: 10,
         height: 10,
         borderRadius: 5,
         backgroundColor: colors.primary,
       },
       row:{
        flexDirection:'row',
        alignItems:'center'
       },
       btnsty:{
           paddingHorizontal:20,
           height:40,
           backgroundColor:colors.primary,
           justifyContent:'center',
           alignItems:'center'
       },
       cir_days:{
           width:120,
           height:120,
           borderRadius:120/2,
           borderColor:colors.primary,
           borderWidth:6,
           justifyContent:'center',
           alignItems:'center',
           marginTop:20
       }
})