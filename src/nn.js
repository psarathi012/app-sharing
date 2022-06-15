import * as React from 'react'
import { Alert, Text, View, TouchableOpacity, StyleSheet,Button } from 'react-native'
import { CustomPicker } from 'react-native-custom-picker'
 
export default class CustomExample extends React.Component {
  state={
 //  value: []
  }

  UNSAFE_componentWillMount(){
        let opt = options;
        let value = 1
        if(value!=undefined){
       let obj = opt.find(o=>o.value===value)
       console.log(obj.label)
       this.setState({value : obj})
      }
  }

  componentDidMount(){
    console.log('did mount', this.state.value)
  }

  getvalue(){
    console.log('get', this.state.value)
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
        <CustomPicker
          placeholder={'Please select your favorite item...'}
          options={options}
          getLabel={item => item.label}
          fieldTemplate={this.renderField}
          optionTemplate={this.renderOption}
          headerTemplate={this.renderHeader}
        //  footerTemplate={this.renderFooter}
           onValueChange={value => {
          //  Alert.alert('Selected Item', value ? JSON.stringify(value) : 'No item were selected!')
            console.log('value', value)
            this.setState({value: value})
          }}
          value = {this.state.value}
        />
        <Button onPress={()=>this.getvalue()} title="click"/>
      </View>
    )
  }
 
  renderHeader() {
    return (
      <View style={styles.headerFooterContainer}>
        <Text>This is header</Text>
      </View>
    )
  }
 
  renderFooter(action) {
    return (
      <TouchableOpacity
        style={styles.headerFooterContainer}
        onPress={() => {
          Alert.alert('Footer', "You've click the footer!", [
            {
              text: 'OK'
            },
            {
              text: 'Close Dropdown',
              onPress: action.close.bind(this)
            }
          ])
        }}
      >
        <Text>This is footer, click me!</Text>
      </TouchableOpacity>
    )
  }
 
  renderField(settings) {
    const { selectedItem, defaultText, getLabel, clear } = settings
    return (
      <View style={styles.container}>
        <View>
          {!selectedItem && <Text style={[styles.text, { color: 'grey' }]}>{defaultText}</Text>}
          {selectedItem && (
            <View style={styles.innerContainer}>
              {/* <TouchableOpacity style={styles.clearButton} onPress={clear}>
                <Text style={{ color: '#fff' }}>Clear</Text>
              </TouchableOpacity> */}
              <Text style={[styles.text, { color: selectedItem.color }]}>
                {getLabel(selectedItem)}
              </Text>
            </View>
          )}
        </View>
      </View>
    )
  }
 
  renderOption(settings) {
    const { item, getLabel } = settings
    return (
      <View style={styles.optionContainer}>
        <View style={styles.innerContainer}>
          {/* <View style={[styles.box, { backgroundColor: item.color }]} /> */}
          <Text style={{ color: item.color, alignSelf: 'flex-start' }}>{getLabel(item)}</Text>
        </View>
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  container: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 15
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  text: {
    fontSize: 18
  },
  headerFooterContainer: {
    padding: 15,
    alignItems: 'center',
    backgroundColor:'red'
  },
  clearButton: { backgroundColor: 'grey', borderRadius: 5, marginRight: 10, padding: 5 },
  optionContainer: {
    padding: 10,
    borderBottomColor: 'red',
    borderBottomWidth: 0.5
  },
  optionInnerContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  box: {
    width: 20,
    height: 20,
    marginRight: 10
  }
})

const options = [
  {
    color: '#2660A4',
    label: 'One',
    value: 1
  },
  {
    color: '#FF6B35',
    label: 'Two',
    value: 2
  },
  {
    color: '#FFBC42',
    label: 'Three',
    value: 3
  },
  {
    color: '#AD343E',
    label: 'Four',
    value: 4
  },
  {
    color: '#051C2B',
    label: 'Five',
    value: 5
  }
]