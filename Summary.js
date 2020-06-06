import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Container, Header, List, ListItem, Text, Left, Body, Icon, Badge, Button,
  Card, CardItem, Content, Right } from 'native-base';
import { getAllData } from './Storage';
import { getMonthInfo, beautifyDate } from './utils';

export default class Summary extends Component {

  constructor() {
    super();
    const todaysDate = new Date(); 
    this.state = {
      allTasks: [],
      info: getMonthInfo(todaysDate)
    }
  }

  onPressReviewNavigate(date) {
    const d = date.split('-');
    const dateObj = new Date(Number(d[0]), Number(d[1]) - 1, Number(d[2]))
    this.props.navigation.navigate("Review", { date: dateObj });
  }

  async componentDidMount() {
    const tasks = await getAllData();
    this.setState({ allTasks: tasks })
  }

  analyzeAndSortTasks = (tasks) => {
    let allTasks = [ ...tasks ];
    allTasks.forEach(task => {
      const date = task.date.split('-');
      task.d = new Date(Number(date[0]), Number(date[1]-1), Number(date[2]))
    })

    allTasks.sort((a, b) => b.d - a.d);
    // console.log('all tasks in summary: ', tasks);

    return allTasks;
  }

  render() {
    const {info} = this.state;
    const allTasks = this.analyzeAndSortTasks(this.state.allTasks);
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
              <Text style={{ fontSize: 36, color: '#efefef', fontWeight: 'bold' }}>{info.month} </Text>
              <Text style={{ fontSize: 36, color: '#efefef' }}>| {info.year}</Text>
            </View>
          </View>
          {allTasks.map(task => 
            {
              const { date, totalTasks, completedTasks, stars } = task;

              let starColor = '#E74B3A';
              if (stars >= 4) {
                starColor = '#5DCB9A';
              } else if (stars > 2.5) {
                starColor = '#FCB323';
              }

              return (
                <View style={styles.item} key={date}>
                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Badge style={{ marginRight: 10, display: 'flex', flexDirection: 'row', backgroundColor: starColor, alignItems: 'center' }}><Icon name='star' style={{ fontSize: 18, color: 'white' }}/><Text>{stars}</Text></Badge>
                    <View>
                      <Text style={{ color: '#efefef', fontWeight: 'bold', fontSize: 18 }}>{beautifyDate(date)}</Text>
                      <Text style={{ color: '#efefef', fontSize: 12 }}>{`${completedTasks} of ${totalTasks} tasks completed`}</Text>
                    </View>
                    <Right>
                      <Button transparent onPress={() => this.onPressReviewNavigate(date)}>
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