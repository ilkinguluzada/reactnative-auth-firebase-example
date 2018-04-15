import React from 'react';
import {Text} from 'react-native';
import firebase from 'firebase';
import {Button, Card, CardSection, Spinner} from './common';

export default class Profile extends React.Component {

  onButtonPress(){
    firebase.auth().signOut();
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Text style={styles.textStyle}>Welcome Ilkin!</Text>
        </CardSection>
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>Log out</Button>
        </CardSection>
      </Card>
    );
  }
}

const styles={
  textStyle: {
    fontSize: 17,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  }
}
