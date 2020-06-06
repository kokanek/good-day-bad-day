import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import {
  Container, Header, Picker, Right, Left, Button, Icon, Radio, List,
  ListItem, Text, Content, CheckBox, Item, Input, Toast, Badge, ScrollableTab
} from 'native-base';
import { getData, setData } from './Storage';
import { getDateInfo } from './utils';

export default class Home extends Component {

  constructor(props) {
    super(props);
    const todaysDate = new Date();
    this._onFocusListener = this.props.navigation.addListener('didFocus', (payload) => {
      console.log('on focus listener');
      this.getData();
    });
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

  getData = () => {
    Toast.show({
      text: "Tasks refreshed!",
      buttonText: "Okay",
      duration: 500
    });
    getData(this.state.date)
      .then(tasks => this.setState({ todaysTasks: tasks }));
  }

  async componentDidMount() {
    this.getData();
  }

  async componentDidUpdate(nextProps, prevState) {
    let tasks = await getData(prevState.date);
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
              <Right>
                <Icon style={{ fontSize: 36, color: '#efefefaa' }} name="refresh" onPress={() => this.getData()} />
              </Right>
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
                <TouchableOpacity style={styles.item} key={task.id} onLongPress={() => this.deleteTask(task)}>
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
                    <Button transparent light onPress={() => this.setState({ addTask: false })}>
                      <Text>X</Text>
                    </Button>
                    {/* <Icon type="MaterialIcons" name="add-box" style={{ color: '#efefefaa', fontSize: 40 }} onPress={this.addTask} /> */}
                  </Right>
                </View>
                <View style={{ ...styles.addItem, marginTop: 0}}>
                  <Picker
                    note
                    mode="dropdown"
                    style={{ width: 120 }}
                    selectedValue={this.state.inputTaskSev}
                    onValueChange={(val) => this.setState({ inputTaskSev: val })}
                  >
                    <Picker.Item label="Small" value="small" />
                    <Picker.Item label="Medium" value="medium" />
                    <Picker.Item label="Large" value="large" />
                  </Picker>
                  <Button info onPress={this.addTask}>
                    <Text>Add Task</Text>
                  </Button> 
                </View>
              </View>
            }
          </List>
          {this.state.todaysTasks.length != 0 && 
            <View style={styles.deleteText}>
              <Text style={{ color: '#01010155' }}>Long click to delete</Text>
            </View>
          }
          
          
        </Content>
        {!this.state.addTask &&
        <Button style={styles.floatingButton} 
          onPress={() => {
            this.setState(({ addTask }) => ({ addTask: !addTask }))
          }}>
          <Icon name='add' />
        </Button>}
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