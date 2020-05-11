import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
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
          <Header style={styles.header} androidStatusBarColor="#ffffff">
          </Header>
          <List>
            <ListItem itemHeader first>
              <Text>ALL DAYS</Text>
            </ListItem>
          </List>
          {this.state.allTasks.map(task => 
            {
              const { date, totalTasks, completedTasks,
                smallTasks, mediumTasks, largeTasks,
                smallDone, mediumDone, largeDone } = task;
              
              let ratio = 0;
              let stars = 0;
              if (totalTasks !== 0) {
                ratio = (completedTasks/totalTasks).toFixed(1);
                stars = Math.round(ratio*7);
              }

              const starArr1 = [];
              const starArr2 = [];

              for(let i = 0; i<stars; i++) {
                starArr1.push('*');
              }

              for(let i = 0; i<7-stars; i++) {
                starArr2.push('*');
              }

              console.log('array 1 and 2: ', starArr1, starArr2);

              return (
              <Card style={{ backgroundColor: '#ff4d4f' }}>
                <CardItem header>
                  <Text style={{ fontWeight: '500', fontSize: 24, color: '#00000088'}}>{date}</Text>
                </CardItem>
                <CardItem>
                  {starArr1.map(() =>
                    <Icon type="AntDesign" name="star" style={{ color: '#ff7a45ff'}}/>
                  )}
                  {starArr2.map(() => 
                    <Icon type="AntDesign" name="staro" style={{ color: '#ff7a45ff' }} />
                  )}
                  <Right>
                    <Text style={{ fontWeight: '500', fontSize: 30, color: '#ff7a45ff' }}>{stars}</Text>
                  </Right>
                </CardItem>
                <CardItem style={styles.cardItem}>
                  <Button iconLeft style={{ backgroundColor: "#ff4d4f" }}>
                    <Icon type="Foundation" name="clipboard-pencil" />
                      <Text style={{ fontWeight: '700', color: '#ffffff' }}>{`${smallDone}/${smallTasks}`}</Text>
                  </Button>
                  <Button iconLeft style={{ backgroundColor: "#ffa940" }}>
                    <Icon type="Foundation" name="clipboard-pencil" />
                      <Text style={{ fontWeight: '700', color: '#ffffff' }}>{`${mediumDone}/${mediumTasks}`}</Text>
                  </Button>
                  <Button iconLeft style={{ backgroundColor: "#ffec3d" }}>
                    <Icon type="Foundation" name="clipboard-pencil" />
                      <Text style={{ fontWeight: '700', color: '#ffffff' }}>{`${largeDone}/${largeTasks}`}</Text>
                  </Button>
                </CardItem>
              </Card>)
              }
          )}
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
    display: 'none'
  },
  content: {
    padding: '5%'
  },
  cardItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  }
})