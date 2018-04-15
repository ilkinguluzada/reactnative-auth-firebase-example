import React from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import {Header, Spinner} from './app/components/common';
import LoginForm from './app/components/LoginForm';
import Profile from './app/components/Profile';

export default class App extends React.Component {
  state = { loggedIn: false }

  constructor(props) {
    super(props);
    firebase.initializeApp({
    apiKey: 'Get this from Firebase Dashboard',
    authDomain: 'Get this from Firebase Dashboard',
    databaseURL: 'Get this from Firebase Dashboard',
    projectId: 'Get this from Firebase Dashboard',
    storageBucket: 'Get this from Firebase Dashboard',
    messagingSenderId: 'Get this from Firebase Dashboard'
  });

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    this.setState({ loggedIn: true });
  } else {
    this.setState({ loggedIn: false });
  }
});
}

  renderForm(){
    if(this.state.loggedIn){
      return <Profile />;
    }else{
      return <LoginForm/>;
    }
  }

  render() {
    return (
      <View >
        <Header headerText="Auth" />
        {this.renderForm()}
      </View>
    );
  }
}
