import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Container, Header, Body, Right, Left, Button, Icon, Title, List,
  ListItem, Text, Content, CheckBox, Item, Input
} from 'native-base';
import { getData, setData } from './Storage';
import { formatDate } from './utils';

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
      date: todaysDate
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
    const newTask = {
      id: this.getId(),
      task: this.state.inputTask,
      size: this.state.inputTaskSev,
      done: false
    }

    this.setState({ 
      todaysTasks: [newTask, ...this.state.todaysTasks],
      inputTask: '',
      addTask: false
    }, () => {
      setData(this.state.date, this.state.todaysTasks);
    });
  }

  checkboxChanged = (t) => {
    let tasks = [...this.state.todaysTasks];
    tasks.forEach(task => {
      if (task.id === t.id) {
        task.done = !t.done;
      }
    })

    this.setState({todaysTasks: tasks});
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
    return (
      <Container>
        <Header style={styles.header} androidStatusBarColor="#ffffff">
        </Header>
        <Content style={styles.content}>
          <List>
            <ListItem itemHeader first>
              <Text>TODAYS TASKS</Text>
              <Button transparent onPress={() => this.setState(({addTask}) => ({addTask: !addTask}))}>
                <Icon name='add' />
              </Button>
              <Right>
                <Button transparent onPress={() => this.props.navigation.navigate("Summary")}>
                  <Icon name='calendar' />
                </Button>
              </Right>
            </ListItem>
            {this.state.addTask && 
              <ListItem icon>
                <Left>
                <Button style={{ backgroundColor: (this.state.inputTaskSev == 'small') ? "#ffec3d" : (this.state.inputTaskSev == 'medium') ? "#ffa940" : "#ff4d4f" }} 
                  onPress={() => this.setState({ inputTaskSev: nextSevState[this.state.inputTaskSev]})}>
                    <Icon type="FontAwesome5" name="star" />
                  </Button>
                </Left>
                <Body>
                <Input placeholder='Enter task' value={this.state.inputTask} onChange={(e) => this.setState({ inputTask: e.nativeEvent.text})}/>
                </Body>
                <Right>
                  <Icon type="MaterialIcons" name="add-box" 
                    style={{color: '#4710ff', fontSize: 40, margin: 0}} onPress={this.addTask}/>
                </Right>
              </ListItem>
            }
            {this.state.todaysTasks.map(task => {
              return (
                <ListItem icon key={task.task} onLongPress={() => alert('Are you sure you want to delete this?')}>
                  <Left>
                    <Button style={{ backgroundColor: (task.size == 'small') ? "#ffec3d" : (task.size == 'medium')? "#ffa940" : "#ff4d4f"}}>
                      <Icon type="FontAwesome5" name="star" />
                    </Button>
                  </Left>
                  <Body>
                    <Text>{task.task}</Text>
                  </Body>
                  <Right>
                    <CheckBox checked={task.done} onPress={() => this.checkboxChanged(task)}/>
                  </Right>
                </ListItem>
              );
            })}
          </List>
          <View style={styles.deleteText}>
            <Text style={{ color: '#01010155' }}>Long click to delete</Text>
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    width: '95%'
  },
  header: {
    backgroundColor: '#ffffff', 
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