import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import {
  Container, Header, Body, Right, Left, Button, Icon, Radio, List,
  ListItem, Text, Content, CheckBox, Item, Input, Toast, Badge, ScrollableTab
} from 'native-base';
import { getData, setData } from './Storage';
import { getDateInfo } from './utils';

const nextSevState = {
  'small': 'medium',
  'medium': 'large',
  'large': 'small'
}

export default class Home extends Component {

  constructor(props) {
    super(props);
    const todaysDate = new Date();
    this.state = {
      todaysTasks: [],
      inputTask: '',
      inputTaskSev: 'small',
      date: todaysDate,
      today: getDateInfo(todaysDate)
    };
  }

  getId = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1) + Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
  }

  addTask = () => {
    if (this.state.inputTask.trim() == '') {
      return
    }
    
    const newTask = {
      id: this.getId(),
      task: this.state.inputTask,
      size: this.state.inputTaskSev,
      done: false
    }

    this.setState({ 
      todaysTasks: [...this.state.todaysTasks, newTask],
      inputTask: '',
      addTask: false
    }, () => {
      setData(this.state.date, this.state.todaysTasks);
      Toast.show({
        text: "Task added!",
        buttonText: "Okay",
        duration: 1000
      });
    });
  }

  deleteTask = (t) => {
    let tasks = [...this.state.todaysTasks];
    tasks = tasks.filter(task => task.id !== t.id);

    this.setState({ todaysTasks: tasks }, () => {
      setData(this.state.date, this.state.todaysTasks);
      Toast.show({
        text: "Task deleted!",
        buttonText: "Okay",
        duration: 1000
      });
    });
  }

  checkboxChanged = (t) => {
    let tasks = [...this.state.todaysTasks];
    tasks.forEach(task => {
      if (task.id === t.id) {
        task.done = !t.done;
      }
    })

    this.setState({todaysTasks: tasks}, () => {
      setData(this.state.date, this.state.todaysTasks);
    });
  }

  async componentDidMount() {
    const tasks = await getData(this.state.date);
    this.setState({ todaysTasks: tasks})
  }

  async componentDidUpdate(nextProps, prevState) {
    let tasks = await getData(prevState.date);
    console.log('date in did update: ', prevState.date, tasks);
    return {
      todaysTasks: tasks
    }
  }

  render() {
    const { today } = this.state;
    return (
      <Container>
        <Header style={styles.header} androidStatusBarColor="#393D5E">
        </Header>
        <Content style={styles.content}>
          <View style={{padding: 20}}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{fontSize: 40, color: '#efefefaa'}}>TODAYS TASKS</Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
              <Text style={{ fontSize: 60, color: '#efefef' }}>{today.date}</Text>
              <View style={{marginLeft: 5}}>
                <Text style={{ fontSize: 24, color: '#efefefdd' }}>{today.month}</Text>
                <Text style={{ fontSize: 24, color: '#efefef88' }}>{today.day}</Text>
              </View>
              <Right>
                <Icon style={{ fontSize: 40, color: '#efefef' }} name="calendar" onPress={() => this.props.navigation.navigate("Summary")} />
              </Right>
            </View>
          </View>
          <List>
            
            {this.state.todaysTasks.map(task => {
              return (
                <TouchableOpacity style={styles.item} key={task.task} onLongPress={() => this.deleteTask(task)}>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Badge style={{ marginRight: 10, backgroundColor: (task.size == 'small') ? "#ffec3d" : (task.size == 'medium') ? "#ffa940" : "#ff4d4f" }}></Badge>
                    <Text style={{ color: '#efefef', textDecorationLine: task.done ? 'line-through' : 'none'}}>{task.task}</Text>
                  </View>
                  <CheckBox style={{ marginRight: 10 }} checked={task.done} onPress={() => this.checkboxChanged(task)} />
                </TouchableOpacity>
              );
            })}
            {this.state.addTask &&
              <View>
              <View style={styles.addItem}>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 300 }}>
                    <Badge style={{ marginRight: 10, alignSelf: 'center', backgroundColor: (this.state.inputTaskSev == 'small') ? "#ffec3d" : (this.state.inputTaskSev == 'medium') ? "#ffa940" : "#ff4d4f" }}></Badge>
                    {/* <Text style={{ color: '#efefef', textDecorationLine: 'none' }}></Text> */}
                    <Input
                      style={{ color: '#ffffff', width: '70%' }}
                      placeholder='Enter task'
                      value={this.state.inputTask}
                      onChange={(e) => this.setState({ inputTask: e.nativeEvent.text })}
                      onSubmitEditing={() => { this.addTask }}
                    />
                  </View>
                  <Right>
                    <Icon type="MaterialIcons" name="add-box" style={{ color: '#efefefaa', fontSize: 40 }} onPress={this.addTask} />
                  </Right>
                </View>
              <View style={{ ...styles.addItem, marginTop: 0}}>
                <Badge style={{ alignSelf: 'center', backgroundColor: "#ffec3d" }}></Badge>
                <Text style={{ color: '#efefef', fontWeight: this.state.inputTaskSev === 'small' ? 'bold' : '' }} onPress={() => this.setState({ inputTaskSev: 'small'})}>Small</Text>
                <Badge style={{ alignSelf: 'center', backgroundColor: "#ffa940" }}></Badge>
                <Text style={{ color: '#efefef', fontWeight: this.state.inputTaskSev === 'medium' ? 'bold' : '' }} onPress={() => this.setState({ inputTaskSev: 'medium' })}>Medium</Text>
                <Badge style={{ alignSelf: 'center', backgroundColor: "#ff4d4f" }}></Badge>
                <Text style={{ color: '#efefef', fontWeight: this.state.inputTaskSev === 'large' ? 'bold' : '' }} onPress={() => this.setState({ inputTaskSev: 'large' })}>Large</Text>
                </View>
              </View>
            }
          </List>
          <View style={styles.deleteText}>
            <Text style={{ color: '#01010155' }}>Long click to delete</Text>
          </View>
          
          
        </Content>
        <Button style={styles.floatingButton} 
          onPress={() => {
            this.setState(({ addTask }) => ({ addTask: !addTask }))
          }}>
          <Icon name='add' />
        </Button>
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