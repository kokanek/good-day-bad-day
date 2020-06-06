import { AsyncStorage } from 'react-native';
import { formatDate } from './utils';

export async function setData(date, tasks) {
  const strTasks = await JSON.stringify(tasks);
  const strDate = formatDate(date);
  try {
    await AsyncStorage.setItem(strDate, strTasks);
    return true;
  } catch {
    return false;
  }
}

export async function getData(date) {
  const strDate = formatDate(date);
  try {
    let tasks = await AsyncStorage.getItem(strDate);
    tasks = await JSON.parse(tasks);
    return tasks || [];
  } catch {
    return Promise.resolve([]);
  }
}

export async function getAllData() {
  let keys = [];
  let values = [];
  let result = [];

  try {
    keys = await AsyncStorage.getAllKeys();
    values = await AsyncStorage.multiGet(keys || []);
    values.forEach(async val => {
      const date = val[0];
      const allTasks = JSON.parse(val[1]);

      const totalTasks = allTasks.length;
      const completedTasks = allTasks.filter(task => task.done === true).length;
      // console.log('all tasks detailed: ', allTasks);
      let stars = calculateStars(allTasks);

      result.push({date, totalTasks, completedTasks, stars});
    })
    return result;
  } catch (e) {
    // read key error
    return [];
  }
}

function calculateStars(allTasks) {
  const smallTasks = countTasks(allTasks, 'small');
  const smallDone = countTasks(allTasks, 'small', true);
  const mediumTasks = countTasks(allTasks, 'medium');
  const mediumDone = countTasks(allTasks, 'medium', true);
  const largeTasks = countTasks(allTasks, 'large');
  const largeDone = countTasks(allTasks, 'large', true);

  const doneWeighted = smallDone*1+mediumDone*2+largeDone*3;
  const totalWeighted = smallTasks*1+mediumTasks*2+largeTasks*3;

  // console.log('weighted: ', doneWeighted, totalWeighted)
  const ratio = doneWeighted / totalWeighted;
  let stars = (ratio * 5).toFixed(1);
  return stars;
}

function countTasks(tasks, type, done) {
  if (!done) {
    return tasks.filter(task => task.size == type).length;
  } else {
    return tasks.filter(task => (task.size == type) && (task.done == done)).length;
  }
}