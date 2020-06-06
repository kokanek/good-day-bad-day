import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import {
  Container, Header, Body, Right, Left, Button, Icon, Radio, List,
  ListItem, Text, Content, CheckBox, Item, Input, Toast, Badge, ScrollableTab
} from 'native-base';
import { getData, setData } from './Storage';
import { getDateInfo } from './utils';

export default class Home extends Component {

  constructor(props) {
    super(props);
    const { date } = this.props.route.params;
    this.state = {
      todaysTasks: [],
      tasks: [],
      date: date,
      today: getDateInfo(date)
    };
  }

  async componentDidMount() {
    const tasks = await getData(this.state.date);
    const todaysTasks = await getData(new Date());
    console.log('got these tasks: ', tasks);
    console.log('todays tasks', todaysTasks);
    this.setState({ todaysTasks, tasks })
  }

  async componentDidUpdate(nextProps, prevState) {
    const tasks = await getData(this.state.date);
    const todaysTasks = await getData(new Date());
    console.log('got these tasks: ', tasks);
    console.log('todays tasks', todaysTasks);
    return {
      todaysTasks, tasks 
    }
  }

  getId = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1) + Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
  }

  addTaskToToday = (task) => {
    const todaysDate = new Date();
    const todaysTasks = [...this.state.todaysTasks, {
      id: this.getId(),
      task: task.task,
      size: task.size,
      done: false
    }]

    // console.log('setting these tasks to today: ', todaysTasks, todaysDate);
    setData(todaysDate, todaysTasks);
    Toast.show({
      text: "Task added to today!",
      buttonText: "Okay",
      duration: 1500
    });
  }

  render() {
    const { today } = this.state;
    return (
      <Container>
        <Header style={styles.header} androidStatusBarColor="#393D5E">
        </Header>
        <Content style={styles.content}>
          <View style={{ padding: 20 }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 40, color: '#efefefaa' }}>REVIEW TASKS</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <Text style={{ fontSize: 60, color: '#efefef' }}>{today.date}</Text>
              <View style={{ marginLeft: 5 }}>
                <Text style={{ fontSize: 24, color: '#efefefdd' }}>{today.month}</Text>
                <Text style={{ fontSize: 24, color: '#efefef88' }}>{today.day}</Text>
              </View>
            </View>
          </View>
          <List>
            {this.state.tasks.map(task => {
              return (
                <TouchableOpacity style={styles.item} key={task.id} onLongPress={() => this.deleteTask(task)}>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Badge style={{ marginRight: 10, backgroundColor: (task.size == 'small') ? "#ffec3d" : (task.size == 'medium') ? "#ffa940" : "#ff4d4f" }}></Badge>
                    <Text style={{ color: '#efefef', textDecorationLine: task.done ? 'line-through' : 'none' }}>{task.task}</Text>
                  </View>
                  <Right>
                    <Icon type="MaterialIcons" name="add-box" style={{ color: '#efefefaa', fontSize: 40 }} onPress={() => this.addTaskToToday(task)} />
                  </Right>
                </TouchableOpacity>
              );
            })}
          </List>
          <View style={styles.deleteText}>
            <Text style={{ color: '#01010155' }}>click 'plus' to add task to today's list</Text>
          </View>
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
    marginLeft: 20,
    marginTop: 10,
  },
  addItem: {
    backgroundColor: '#3F4674',
    height: 60,
    color: '#efefef',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center', // #5C89C3
    justifyContent: 'space-between',
    marginLeft: 20,
    marginTop: 10,
    color: '#efefef'
  },
  floatingButton: {
    position: 'absolute',
    bottom: '10%',
    left: '42%',
    borderRadius: 40,
  },
  content: {
    width: '95%',
    backgroundColor: '#393D5E',
    color: '#efefef'
  },
  header: {
    backgroundColor: '#393D5E',
    display: 'none'
  },
  right: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: 120,
    justifyContent: 'space-between'
  },
  deleteText: {
    marginTop: 10,
    color: '#11111111',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  }
})