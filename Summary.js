import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Container, Header, List, ListItem, Text, Left, Body, Icon, Badge, Button,
  Card, CardItem, Content, Right } from 'native-base';
import { getAllData } from './Storage';

export default class Summary extends Component {

  constructor() {
    super();

    this.state = {
      allTasks: []
    }
  }

  async componentDidMount() {
    const tasks = await getAllData();
    console.log('all data: ', tasks);
    this.setState({ allTasks: tasks })
  }

  render() {
    return (
      <Container>
        <Content style={styles.content}>
          <Header style={styles.header} androidStatusBarColor="#3F4674">
          </Header>
          <View style={{ padding: 20 }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 40, color: '#efefefaa' }}>SUMMARY</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <Text style={{ fontSize: 36, color: '#efefef', fontWeight: 'bold' }}>March </Text>
              <Text style={{ fontSize: 36, color: '#efefef' }}>| 2020</Text>
            </View>
          </View>
          {this.state.allTasks.map(task => 
            {
              const { date, totalTasks, completedTasks } = task;
              
              let ratio = 0;
              let stars = 0;
              if (totalTasks !== 0) {
                ratio = (completedTasks/totalTasks).toFixed(1);
                stars = Math.round(ratio*5);
              }

              return (
                <View style={styles.item}>
                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Badge style={{ marginRight: 10, display: 'flex', flexDirection: 'row' }} success><Icon name='star' style={{ fontSize: 18, color: 'white' }}/><Text>{stars}</Text></Badge>
                    <View>
                      <Text style={{ color: '#efefef', fontWeight: 'bold', fontSize: 18 }}>{date}</Text>
                      <Text style={{ color: '#efefef', fontSize: 12 }}>{`${completedTasks} of ${totalTasks} tasks completed`}</Text>
                    </View>
                    <Right>
                      <Button transparent>
                        <Icon name='arrow-forward' />
                      </Button>
                    </Right>
                  </View>
                </View>
                )
              }
          )}
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#3F4674',
    height: 60,
    color: '#efefef',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center', // #5C89C3
    justifyContent: 'space-between',
    borderRadius: 10,
    marginTop: 10,
  },
  header: {
    backgroundColor: '#ffffff',
    display: 'none'
  },
  content: {
    padding: '5%',
    backgroundColor: '#393D5E',
    color: '#efefef'
  },
  cardItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  }
})