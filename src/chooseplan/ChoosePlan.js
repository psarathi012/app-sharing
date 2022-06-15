import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { Container, Card } from 'native-base';
import styles from './Style';
import { images, colors } from '../globalstyles/Style';
import LinearGradient from 'react-native-linear-gradient';
import Dialog, { DialogTitle, DialogContent } from 'react-native-popup-dialog';
// import RadioForm, { RadioButton } from 'react-native-simple-radio-button';
import { URL } from '../constant/Constant';
import { myToken } from '../token/Token';
import RazorpayCheckout from 'react-native-razorpay';

export default class ChoosePlan extends Component {
  state = {
    val: '',
    value: '',
    value2: -1,
    value2Index: -1,
    defaultAnimationDialog: false,
    value3: '0.00',
    value3Index: -1,
    featured: [],
    premium: [],
    code: '',
    basic_value: '0.00',
    basic_contact: '0',
    loading: true,
    premium_planId: '',
    featured_planId: '',
  };

  async getPlans() {
    fetch(URL + 'plans', {
      method: 'GET',
      headers: {
        Authorization: await myToken(),
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let featured = responseJson.featured;
        let premium = responseJson.premium;

        let tempfeatured = [],
          tempremium = [];
        for (let i = 0; i < featured.length; i++) {
          let obj = {
            value: featured[i].amount,
            label: featured[i].validityInDays,
            validityInDays: featured[i].validityInDays,
            id: featured[i].id,
            currency: featured[i].currency,
            contactViews: featured[i].contactViews,
            category: featured[i].category,
            featuredProfile: featured[i].featuredProfile,
            myplan: 'Featured',
          };
          tempfeatured.push(obj);
        }

        for (let i = 0; i < premium.length; i++) {
          let obj = {
            value: premium[i].amount,
            label: premium[i].validityInDays,
            validityInDays: premium[i].validityInDays,
            id: premium[i].id,
            currency: premium[i].currency,
            contactViews: premium[i].contactViews,
            category: premium[i].category,
            featuredProfile: premium[i].featuredProfile,
            myplan: 'Premium',
          };
          tempremium.push(obj);
        }

        let objIndex = tempfeatured.findIndex((obj) => obj.id == 'featured_3');
        let objIndex1 = tempfeatured.findIndex((obj) => obj.id == 'featured_6');
        let objIndex2 = tempfeatured.findIndex(
          (obj) => obj.id == 'featured_12',
        );
        tempfeatured[objIndex].label = '3 months';
        tempfeatured[objIndex1].label = '6 months';
        tempfeatured[objIndex2].label = '12 months';

        let objIndex3 = tempremium.findIndex((obj) => obj.id == 'premium_3');
        let objIndex4 = tempremium.findIndex((obj) => obj.id == 'premium_6');
        let objIndex5 = tempremium.findIndex((obj) => obj.id == 'premium_12');
        tempremium[objIndex3].label = '3 months';
        tempremium[objIndex4].label = '6 months';
        tempremium[objIndex5].label = '12 months';

        this.setState({
          featured: tempfeatured,
          premium: tempremium,
          loading: false,
        });

        console.log('tempremium', this.state.premium);
      })
      .catch((error) => {
        console.error('something went wrong...', error);
        this.setState({ loading: false });
      });
  }

  contactViews(id) {
    let featured = this.state.featured;
    // console.log('featured',featured)
    let obj = featured.find((o) => o.id === id);
    console.log(obj.value, 'id', obj.id);
    this.setState({ featured_planId: obj.id, value3: obj.value });
  }

  featured_ifcondition(id) {
    this.setState({ value3: 0.0 });
  }

  premium_planId(id) {
    let premium = this.state.premium;

    let obj = premium.find((o) => o.id === id);
    console.log(obj.id);

    this.setState({
      basic_contact: obj.contactViews,
      basic_value: obj.value,
      premium_planId: id,
    });
  }

  premium_ifcondition(id) {
    this.setState({ basic_contact: 0, basic_value: 0.0 });
  }

  async createOrder() {
    let planId = [this.state.premium_planId, this.state.featured_planId];
    var tempplanId = planId.filter((item) => item);
    console.log('temp', tempplanId);
    let params = {
      planIds: tempplanId,
    };
    fetch(URL + 'orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: await myToken(),
      },
      body: JSON.stringify(params),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (tempplanId.length > 0) {
          console.log('ofrer', responseJson);
          console.log('ofrer params', params);
          this.functions(responseJson);
          // this.props.navigation.navigate('PaymentMethod', {
          //   data: responseJson,
          //   featured: this.state.featured,
          //   premium: this.state.premium,
          // });
        } else {
          alert('Please choose your plan');
        }
      })
      .catch((error) => {
        console.error('something went wrong...', error);
      });
  }

  promoEmpty(code) {
    if (code != '') {
      this.promoCode(code);
    } else {
      alert('Please enter promo code');
    }
  }
  async promoCode(code) {
    let params = { promoCode: code };
    fetch(URL + 'orders/applyPromo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: await myToken(),
      },
      body: JSON.stringify(params),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('promo responseJson', responseJson);
        if (responseJson.status != 'completed') {
          this.setState({ defaultAnimationDialog: true });
        } else {
          alert('The promo code has been expired');
        }
      })
      .catch((error) => {
        console.error('something went wrong...', error);
      });
  }
  functions(data) {
    this.setState({ loading: false });
    var options = {
      description: 'Credits towards consultation',
      image: 'https://rajput-matrimony-8f30a.web.app/images/logo.jpeg',
      currency: "INR",
      key: 'rzp_test_JNhUrCKJmLoyMb',
      amount: data.amount,
      name: 'Rajput Lagn',
      prefill: {
        email: 'pasarathi012@gmail.com',
        contact: '6265815749',
        name: 'Razorpay Software'
      },
      theme: { color: '#E75935' },
      width: null,
      order_id: data.razorpayOrderId
    }
    RazorpayCheckout.open(options).then((d) => {
      // handle success
      //   alert(`Success: ${d.razorpay_payment_id}`);
      console.log('razorpay data', d)
      this.payment(d.razorpay_payment_id, d.razorpayOrderId, d.razorpay_signature);
    }).catch((error) => {
      // handle failure
      alert(`Error: ${error.code} | ${error.description}`);
      console.log('error', error.code, error.description)
    });
  }

  async payment(razorpay_payment_id, razorpayOrderId, razorpay_signature) {
    let params = {
      "razorpay_order_id": razorpayOrderId,
      "razorpay_payment_id": razorpay_payment_id,
      "razorpay_signature": razorpay_signature
    }
    fetch(URL + 'orders/capturePayment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': await myToken(),
      },
      body: JSON.stringify(params)
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('payment', responseJson)
        console.log('payment params', params)
        this.props.navigation.navigate('Payment_success', { razorpayOrderId: razorpayOrderId })
      })
      .catch(error => {
        console.error('something went wrong...', error);
      });
  }


  componentDidMount() {
    this.getPlans();
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.forindicator}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }
    const { navigate } = this.props.navigation;
    return (
      <Container style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <ScrollView>
          <View style={styles.content, { marginBottom: 100 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 0.5 }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => navigate('Signup')}>
                  <Image
                    source={images.back}
                    style={styles.backimg}
                    tintColor="#000"
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.5, marginLeft: '-50%' }}>
                <Text style={styles.heading}>Choose Your Plan </Text>
              </View>
            </View>

            <View>
              <Text style={[styles.head, { color: '#000', textAlign: 'left' }]}>
                Promo Code
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <View style={[styles.inputcontainer, { width: '70%' }]}>
                  <TextInput
                    placeholder="Enter your promo code"
                    placeholderTextColor={'rgba(32, 32, 32, 0.6)'}
                    keyboardType="default"
                    value={this.state.code}
                    onChangeText={(code) => {
                      this.setState({ code });
                    }}
                    style={styles.input}
                    returnKeyType="go"
                  />
                </View>

                <TouchableOpacity
                  style={styles.btn_promo}
                  onPress={() => this.promoEmpty(this.state.code)}>
                  <Text style={styles.head}>Apply code</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* <Card style={styles.cardsty}>

              <View style={styles.content}>
                <Text style={styles.head_chooseplan}>Premium Plan</Text>

                <Text style={styles.title_chooseplan}>₹ {this.state.basic_value}</Text>
                <View style={{ marginTop: -15 }}>
                                   <Text style={styles.subtitle_chooseplan}>
                    View Profile's Contact Details -{' '}
                    {this.state.basic_contact} Profiles
                    </Text>
                  <Text style={styles.subtitle_chooseplan}>
                    Premium Subscription Tag
                    </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignContent: 'space-between',
                  }}>
                  {this.state.premium.map((item) => {
                    return (
                      <View key={item.id} style={styles.buttonContainer}>
                        <TouchableOpacity
                          style={styles.circle}
                          onPress={() => {
                            if (this.state.value === item.id) {
                              this.setState({
                                value: null,
                              });
                              console.log(
                                'value if',
                                this.state.value,
                                'item.id',
                                item.id,
                              );
                              this.premium_ifcondition(item.id);
                            } else {
                              this.setState({
                                value: item.id,
                              });
                              console.log(
                                'value else',
                                this.state.value,
                                'item.id',
                                item.id,
                              );
                              this.premium_planId(item.id);
                            }
                          }}>
                          {this.state.value === item.id && (
                            <View style={styles.checkedCircle} />
                          )}
                        </TouchableOpacity>
                        <Text style={styles.subtitle}>{item.label}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>

            </Card> */}

            {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            {this.state.premium.map((item) => {
              return (
                <View key={item.id} style={{ marginLeft: 7 }}>
                  <TouchableOpacity onPress={() => {
                    if (this.state.value === item.id) {
                      this.setState({
                        value: null,
                      });
                      console.log(
                        'value if',
                        this.state.value,
                        'item.id',
                        item.id,
                      );
                      this.premium_ifcondition(item.id);
                    } else {
                      this.setState({
                        value: item.id,
                      });
                      console.log(
                        'value else',
                        this.state.value,
                        'item.id',
                        item.id,
                      );
                      this.premium_planId(item.id);
                    }
                  }}>
                    <Card style={[styles.cardsty, { marginBottom: 5 }]}>
                      <LinearGradient
                        colors={['#fff', '#fff', '#fff']}
                        style={styles.lineargradient}>
                        {item.label === "6 months" ? <View><View style={[styles.profileribben]} />
                          <View style={[styles.ribbentxt]}>
                            <Text style={[styles.subtitle_sub, { color: '#fff', fontSize: 16 }]}>Recommended</Text>
                          </View>
                        </View> : <View></View>}

                        <View style={{ flex: 1, flexDirection: 'row', position: 'relative', marginTop: 70 }}>
                          <View style={{ flex: 0.5 }}><Text style={styles.title_new}> {item.label}</Text><Text style={{ marginLeft: 5 }, styles.subtitle_sub}> View {' '}
                            {item.contactViews} contacts  Get Premium Tag</Text></View>
                          <View style={{ flex: 0.5 }}><Text style={styles.title_new}>₹ {item.value}</Text><Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: '#969595', marginLeft: '35%', fontSize: 16 }}>₹ {2 * item.value}</Text></View>
                          <View style={{ flex: 0.2, marginTop: '15%' }}><TouchableOpacity
                            style={styles.circle}
                          >
                            {this.state.value === item.id && (
                              <View style={styles.checkedCircle} />
                            )}
                          </TouchableOpacity>
                          </View>






                          {/* <Text style={styles.subtitle}>Activate Chat Feature     Detailed Profile View</Text> */}
                          {/* <Text style={styles.subtitle}>View Profile's Contact Details -    65 Profiles</Text> */}
                          {/* <Text style={styles.subtitle}>Premium Subscription Tag</Text> */}



                        </View>
                      </LinearGradient>
                    </Card>
                  </TouchableOpacity>

                </View>
              );
            })}


            {/* /////////////////////////////////////////////////////////////////////////////////////////////////// */}


            {/* <Card style={[styles.cardsty, { marginBottom: 70 }]}>
              <LinearGradient
                colors={['#D9B03E', '#BE9B38', '#925E02']}
                style={styles.lineargradient}>
                <View style={styles.content}>
                  <Text style={styles.head}>Feature Profile</Text>
                  <Text style={styles.title}>₹ {this.state.value3}</Text>
                  <View style={{ marginTop: -15 }}>
                    <Text style={styles.subtitle}>
                      Highlight your profile to get more interest
                    </Text>

                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignContent: 'space-between',
                    }}>
                    {this.state.featured.map((item) => {
                      return (
                        <View key={item.id} style={styles.buttonContainer}>
                          <TouchableOpacity
                            style={styles.circle}
                            onPress={() => {
                              if (this.state.val === item.id) {
                                this.setState({
                                  val: null,
                                });
                                console.log(
                                  'value if',
                                  this.state.val,
                                  'item.id',
                                  item.id,
                                );
                                this.featured_ifcondition(item.id);
                              } else {
                                this.setState({
                                  val: item.id,
                                });
                                console.log(
                                  'value else',
                                  this.state.val,
                                  'item.id',
                                  item.id,
                                );
                                this.contactViews(item.id);
                              }
                            }}>
                            {this.state.val === item.id && (
                              <View style={styles.checkedCircle} />
                            )}
                          </TouchableOpacity>
                          <Text style={styles.subtitle}>{item.label}</Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </LinearGradient>
            </Card> */}
            <View style={{ marginLeft: 30, marginTop: 10 }}><Text> For any assistance contact us at 7415581551  </Text></View>

          </View>

        </ScrollView>


        <TouchableOpacity
          //   onPress={()=>this.props.navigation.navigate('Payment_success')}
          onPress={() => {
            this.createOrder();
          }}
          style={styles.footer}>
          <View>
            <Text style={styles.head}>Make Payment </Text>
          </View>
        </TouchableOpacity>

        <Dialog
          dialogStyle={styles.dialogStyle}
          onDismiss={() => {
            this.setState({ defaultAnimationDialog: false });
          }}
          width={0.9}
          visible={this.state.defaultAnimationDialog}
          rounded
          actionsBordered
          dialogTitle={
            <DialogTitle
              style={{
                backgroundColor: '#F7F7F8',
              }}
              title="Note"
              hasTitleBar={false}
              align="center">
              {/* <Text style={[styles.title,{color:'red'}]}>Note</Text> */}
            </DialogTitle>
          }
          footer={
            <View style={styles.dialogcenter}>
              <TouchableOpacity
                style={styles.bgbtn}
                onPress={() => {
                  this.setState({ defaultAnimationDialog: false });
                  this.props.navigation.navigate('Signup');
                }}>
                <Text style={[styles.input, { color: '#fff' }]}>Ok</Text>
              </TouchableOpacity>
            </View>
          }>
          <DialogContent style={{ backgroundColor: '#fff' }}>
            <Text style={[styles.subtitle, { color: '#000' }]}>
              "Congratulations, The promo code has been successfully applied"
            </Text>
          </DialogContent>
        </Dialog>
      </Container>
    );
  }
}
