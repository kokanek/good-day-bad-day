import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Container, Header, List, ListItem, Text, Left, Body, Icon, Badge, Button
} from 'native-base';
import { getAllData } from './Storage';

export default class Summary extends Component {

  async componentDidMount() {
    const tasks = await getAllData();
    console.log('all data: ', tasks);
    this.setState({ todaysTasks: tasks })
  }

  render() {
    return (
      <Container>
        <Header style={styles.header} androidStatusBarColor="#ffffff">
        </Header>
        <List>
          <ListItem itemHeader first>
            <Text>ALL DAYS</Text>
          </ListItem>
          <ListItem icon>
            <Body>
              <Text>2020-04-23</Text>
            </Body>
            <Button transparent>
              <Badge>
                <Text>2</Text>
              </Badge>
            </Button>
            <Button transparent>
              <Badge success>
                <Text>2</Text>
              </Badge>
            </Button>
            <Button transparent>
              <Badge info>
                <Text>2</Text>
              </Badge>
            </Button>
          </ListItem>
        </List>
        
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