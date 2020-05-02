import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Container, Header
} from 'native-base';

export default class Summary extends Component {
  render() {
    return (
      <Container>
        <Header style={styles.header} androidStatusBarColor="#ffffff">
        </Header>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
    display: 'none'
  },
})