import React from 'react';
import {Text} from 'react-native';
import firebase from 'firebase';
import {Button, Card, CardSection, Input, Spinner} from './common';

export default class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  };

  onButtonPress(){
    const {email, password} = this.state;

    this.setState({error: '', loading: true});

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }

  onLoginFail(){
        this.setState(
          {error: 'Incorrect Password.',
          loading: false
        });
  }

  onLoginSuccess(){
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false
    });
  }

  renderButton(){
    if(this.state.loading){
      return <Spinner size="small" />;
    }else{
      return <Button onPress={this.onButtonPress.bind(this)}>Login</Button>;
    }
  }

  render() {
    return (
      <Card>

        <CardSection>
          <Input
            label='Email'
            placeHolder="user@gmail.com"
            value={this.state.email}
            onChangeText={email => this.setState({email})}
          />
        </CardSection>

        <CardSection>
          <Input
            label='Password'
            placeHolder="your password"
            secureTextEntry
            value={this.state.password}
            onChangeText={password => this.setState({password})}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>{this.state.error}</Text>
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles={
  errorTextStyle: {
    fontSize: 17,
    alignSelf: 'center',
    color: 'red',
    marginTop: 20,
    marginBottom: 20,
  }
}
