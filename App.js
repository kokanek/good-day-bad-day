import * as React from 'react';
import { StyleSheet } from 'react-native';
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
      todaysTasks: ['Do the laundry', 'Watch the show']
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
                <ListItem icon key={task}>
                  <Left>
                    <CheckBox checked={true} />
                  </Left>
                  <Body>
                    <Text>{task}</Text>
                  </Body>
                  <Right style={styles.right}>
                    <Text>small</Text>
                    <Icon active name="trash" />
                    <Badge danger>
                      <Text>{` `}</Text>
                    </Badge>
                  </Right>
                </ListItem>
              );
            })}
          </List>
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
    minWidth: 120,
    justifyContent: 'space-between'

  }
})
