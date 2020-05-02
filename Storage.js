import { AsyncStorage } from 'react-native';
import { formatDate } from './utils';

export async function setData(date, tasks) {
  const strTasks = await JSON.stringify(tasks);
  const strDate = formatDate(date);
  console.log('storing data: ', strDate);
  try {
    await AsyncStorage.setItem(strDate, strTasks);
    console.log('stored data: ', strDate);
    return true;
  } catch {
    console.log('failed storing data: ', strDate);
    return false;
  }
}

export async function getData(date) {
  const strDate = formatDate(date);
  console.log('calling to get tasks from storage: ', strDate);
  try {
    let tasks = await AsyncStorage.getItem(strDate);
    tasks = await JSON.parse(tasks);
    console.log('tasks from storage: ', tasks);
    return tasks || [];
  } catch {
    console.log('in catch block: ');
    return Promise.resolve([]);
  }
}

export async function getAllData() {
  let keys = [];
  let values = [];
  let result = {};

  try {
    keys = await AsyncStorage.getAllKeys();
    values = await AsyncStorage.multiGet(keys || []);
    values.forEach(async val => {
      result[val[0]] = await JSON.parse(val[1]);
    })
    return result;
  } catch (e) {
    // read key error
    return [];
  }
}