import React, {Component} from 'react';

import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {TextInput} from 'react-native-gesture-handler';
import moment from 'moment';
import {connect} from 'react-redux';
import {topUp} from '../redux/actions/transaction';

class App extends Component {
  state = {
    modalVisible: false,
    amount: '',
    message: null,
    type: 'warning',
    loading: false,
  };
  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };
  addPhotoCamera = async () => {
    this.setState({modalVisible: false});
    const {amount} = this.state;
    const dateTransaction = new Date();
    launchCamera(
      {
        quality: 0.3,
      },
      async response => {
        if (response.didCancel) {
          this.setState({
            message: 'User cancelled upload image',
            type: 'warning',
          });
        } else if (response.errorMessage) {
          this.setState({
            message: `Image Error: ${response.errorMessage}`,
            type: 'warning',
          });
        } else if (response.fileSize >= 1 * 1024 * 1024) {
          this.setState({
            message: 'Image to large',
            type: 'warning',
          });
        } else {
          this.setState({
            loading: true,
            message: null,
          });
          try {
            const dataImage = {
              uri: response.uri,
              type: response.type,
              name: response.fileName,
            };
            await this.props.topUp(this.props.auth.token, {
              amount: amount,
              picture: dataImage,
              dateTransaction: moment(dateTransaction).format(
                'YYYY-MM-DD hh:mm:ss',
              ),
            });
            this.setState({
              loading: false,
            });
            this.setState({
              message: 'Thanks for to up',
              type: 'success',
            });
          } catch (err) {
            console.log(err);
          }
        }
      },
    );
  };
  addPhotoGallery = async () => {
    this.setState({modalVisible: false});
    const {amount} = this.state;
    const dateTransaction = new Date();
    launchImageLibrary({}, async response => {
      if (response.didCancel) {
        this.setState({
          message: 'User cancelled upload image',
          type: 'warning',
        });
      } else if (response.errorMessage) {
        this.setState({
          message: `Image Error: ${response.errorMessage}`,
          type: 'warning',
        });
      } else if (response.fileSize >= 1 * 1024 * 1024) {
        this.setState({
          message: 'Image to large',
          type: 'warning',
        });
      } else {
        this.setState({
          message: null,
          loading: true,
        });
        try {
          const dataImage = {
            uri: response.uri,
            type: response.type,
            name: response.fileName,
          };
          await this.props.topUp(this.props.auth.token, {
            amount: amount,
            picture: dataImage,
            dateTransaction: moment(dateTransaction).format(
              'YYYY-MM-DD hh:mm:ss',
            ),
          });
          this.setState({
            loading: false,
          });
          this.setState({
            message: 'Thanks for to up',
            type: 'success',
          });
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  render() {
    const {modalVisible} = this.state;
    return (
      <>
        <StatusBar backgroundColor="#00D16C" />
        <View style={styles.header}>
          <View style={styles.row2}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                this.setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalTitle}>Top UP Confirmation</Text>
                  <View style={styles.inputTopUp}>
                    <Text>Rp</Text>
                    <TextInput
                      placeholder="Input Top Up"
                      keyboardType="number-pad"
                      style={styles.textInput}
                      onChangeText={amount => this.setState({amount})}
                    />
                  </View>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonOpen]}
                    onPress={this.addPhotoCamera}>
                    <Text style={styles.text2Style}>Open camera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonOpen]}
                    onPress={this.addPhotoGallery}>
                    <Text style={styles.text2Style}>Open gallery</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.setModalVisible(true)}>
              <Icon name="plus" size={25} color="#00D16C" />
            </TouchableOpacity>
            <View>
              <Text style={styles.title}>Virtual Account Number</Text>
              <Text style={styles.number}>2389 081393877946</Text>
            </View>
          </View>
        </View>
        <ScrollView style={styles.container}>
          <View style={styles.contain}>
            {this.state.loading && (
              <Text style={styles.wait}>Please wait....</Text>
            )}
            {this.state.message && (
              <Text style={[styles.alert, styles[this.state.type]]}>
                {this.state.message}
              </Text>
            )}
            <Text style={styles.cardtitle}>How to Top-Up</Text>
            <View style={styles.card}>
              <Text style={styles.cardNumber}>1</Text>
              <Text style={styles.cardText}>
                Go to the nearest ATM or you can{'\n'}use E-Banking.
              </Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardNumber}>2</Text>
              <Text style={styles.cardText}>
                Type your security number on the{'\n'}ATM or E-Banking.
              </Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardNumber}>3</Text>
              <Text style={styles.cardText}>Select “Transfer” in the menu</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardNumber}>4</Text>
              <Text style={styles.cardText}>
                Type the virtual account number that{'\n'}
                we provide you at the top.
              </Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardNumber}>5</Text>
              <Text style={styles.cardText}>
                Type the amount of the money you{'\n'}want to top up.
              </Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardNumber}>6</Text>
              <Text style={styles.cardText}>Read the summary details</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardNumber}>7</Text>
              <Text style={styles.cardText}>Press transfer / top up</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardNumber}>8</Text>
              <Text style={styles.cardText}>
                You can see your money in Abusayap{'\n'}within 3 hours.
              </Text>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafcff',
  },
  header: {
    backgroundColor: '#00D16C',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginHorizontal: 16,
  },
  textheader: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 20,
  },
  row2: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  btn: {
    backgroundColor: '#EBEEF2',
    marginHorizontal: 16,
    marginVertical: 20,
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#7A7886',
  },
  number: {
    color: '#4D4B57',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 9,
  },
  contain: {
    marginHorizontal: 16,
    marginVertical: 40,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'white',
    paddingVertical: 17,
    flexWrap: 'wrap',
    borderRadius: 10,
  },
  cardNumber: {
    color: '#00D16C',
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 20,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#7A7886',
  },
  cardtitle: {
    color: '#514F5B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 12,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
  },
  buttonOpen: {
    backgroundColor: 'white',
  },
  buttonClose: {
    backgroundColor: '#00D16C',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text2Style: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  inputTopUp: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#00D16C',
    marginBottom: 20,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20,
  },
  alert: {
    fontSize: 15,
    marginBottom: 25,
  },
  warning: {
    color: '#FFC107',
  },
  success: {
    color: '#0D6EFD',
  },
  wait: {
    fontSize: 15,
    color: '#7A7886',
    marginBottom: 25,
  },
  textInput: {
    color: 'black',
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  transaction: state.transaction,
});
const mapDispatchToProps = {topUp};

export default connect(mapStateToProps, mapDispatchToProps)(App);
