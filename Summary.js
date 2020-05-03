import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Container, Header, List, ListItem, Text, Left, Body, Icon, Badge, Button,
  Card, CardItem, Content, Right } from 'native-base';
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
        <Content style={styles.content}>
          <Header style={styles.header} androidStatusBarColor="#ffffff">
          </Header>
          <List>
            <ListItem itemHeader first>
              <Text>ALL DAYS</Text>
            </ListItem>
          </List>
          <Card style={{ backgroundColor: '#ff4d4f' }}>
            <CardItem header>
              <Text>23 April, 2020</Text>
            </CardItem>
            <CardItem>
              <Icon type="AntDesign" name="star" />
              <Icon type="AntDesign" name="star" />
              <Icon type="AntDesign" name="star" />
              <Icon type="AntDesign" name="star" />
              <Icon type="AntDesign" name="star" />
              <Icon type="AntDesign" name="staro" />
              <Icon type="AntDesign" name="staro" />
              <Right>
                <Text style={{ fontWeight: '800', fontSize: 24 }}>3.5</Text>
              </Right>
            </CardItem>
            <CardItem style={styles.cardItem}>
              <Button style={{ backgroundColor: "#ff4d4f" }}>
                <Icon type="FontAwesome5" name="suitcase" />
              </Button>
              <Text style={{ fontWeight: '700' }}>2/3</Text>
              <Button style={{ backgroundColor: "#ffa940" }}>
                <Icon type="FontAwesome5" name="suitcase" />
              </Button>
              <Text style={{ fontWeight: '700' }}>4/5</Text>
              <Button style={{ backgroundColor: "#ffec3d" }}>
                <Icon type="FontAwesome5" name="suitcase" />
              </Button>
              <Text style={{ fontWeight: '700' }}>2/3</Text>
            </CardItem>
          </Card>
          <Card style={{ backgroundColor: '#ff4d4f' }}>
            <CardItem header>
              <Text>23 April, 2020</Text>
            </CardItem>
            <CardItem>
              <Icon type="AntDesign" name="star" style={{ color: '#ff7a45ff'}}/>
              <Icon type="AntDesign" name="star" style={{ color: '#ff7a45ff' }}/>
              <Icon type="AntDesign" name="star" style={{ color: '#ff7a45ff' }}/>
              <Icon type="AntDesign" name="star" style={{ color: '#ff7a45ff' }}/>
              <Icon type="AntDesign" name="star" style={{ color: '#ff7a45ff' }}/>
              <Icon type="AntDesign" name="staro" style={{ color: '#ff7a45ff' }}/>
                <Icon type="AntDesign" name="staro" style={{ color: '#ff7a45ff' }}/>
              <Right>
                <Text style={{ fontWeight: '500', fontSize: 30, color: '#ff7a45ff' }}>3.5</Text>
              </Right>
            </CardItem>
            <CardItem style={styles.cardItem}>
              <Button style={{ backgroundColor: "#ff4d4f" }}>
                <Icon type="FontAwesome5" name="suitcase" />
              </Button>
              <Text style={{fontWeight:'700'}}>2/3</Text>
              <Button style={{ backgroundColor: "#ffa940" }}>
                <Icon type="FontAwesome5" name="suitcase" />
              </Button>
              <Text style={{ fontWeight: '700' }}>4/5</Text>
              <Button style={{ backgroundColor: "#ffec3d" }}>
                <Icon type="MaterialIcons" name="work" />
              </Button>
              <Text style={{ fontWeight: '700' }}>2/3</Text>
            </CardItem>
          </Card>
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
    width: '95%',
    padding: '5%'
  },
  cardItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})