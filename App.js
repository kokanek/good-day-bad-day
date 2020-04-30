import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';
import { Container, Header, Body, Right, Left, Button, Icon, Title, List, 
  ListItem, Text, Content, CheckBox, Badge } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
//import styles from './styles';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      todaysTasks: [{ task: 'Do the laundry and test the', size: "large" }, { task: 'Watch the show', size: "small" }, { task: 'Do this do that', size: "large" }, { task: 'Testing stuff', size: "small" }]
    };
  }

  static getDerivedStateFromError = () => {

  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Container>
        <Header >
          <Body>
            <Title>Good Day - Bad Day</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='calendar' />
            </Button>
          </Right>
        </Header>
        <Content style={styles.content}>
          <List>
            <ListItem itemHeader first>
              <Text>TODAYS TASKS</Text>
              <Right>
                <Button transparent>
                  <Icon name='add'/>
                </Button>
              </Right>
            </ListItem>
            {this.state.todaysTasks.map(task => {
              return (
                <ListItem icon key={task.task} onLongPress={() => alert('Are you sure you want to delete this?')}>
                  <Left>
                    <Button style={{ backgroundColor: "#FF1010" }}>
                      <Icon type="MaterialIcons" name="priority-high"/>
                    </Button>
                  </Left>
                  <Body>
                    <Text>{task.task}</Text>
                  </Body>
                  <Right>
                    <CheckBox checked={false} />
                  </Right>
                </ListItem>
              );
            })}
          </List>
          <View style={styles.deleteText}>
            <Text style={{color: '#01010155'}}>Long click to delete</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    marginTop: '5%'
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
