import React from 'react';
import { Gantt } from './components';
import data from './data';
import './App.scss';

const config = {
  data: data,
  container: '#chart',
  box_padding: 10,
  rowHeight: 60,
  metrics: {
    type: 'overall', // [overall, yearly, quarterly-[months,weeks], monthly-[months,weeks]]
    startDate: '2019-04-01 10:11:12.123456',
    endDate: null,
    subType: 'weeks'
  },
  showChildColor: false,
  headerAdd: () => {
    alert('Yeyy!!!');
  }
};

function App() {
  return <Gantt config={{ ...config }} />;
}

export default App;
