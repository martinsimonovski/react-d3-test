import React from "react";
import { Gantt } from "./components";
import "./App.css";

const config = {
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  container: "#chart",
  box_padding: 10,
  metrics: {
    type: "overall", // [overall, yearly, quarterly-[months,weeks], monthly-[months,weeks]]
    startDate: "2019-04-01 10:11:12.123456",
    endDate: null,
    subType: "weeks"
  },
  showChildColor: false,
  headerAdd: () => {
    alert("Yeyy!!!");
  }
};

function App() {
  return <Gantt config={{ ...config }} />;
}

export default App;
