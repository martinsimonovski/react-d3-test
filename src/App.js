import React from "react";
import { Gantt } from "./components";
import "./App.scss";

const config = {
  data: [
    { name: "Resource 1", projects: [1, 2, 3] },
    { name: "Resource 2", projects: [1] },
    { name: "Resource 3", projects: [1, 2] },
    { name: "Resource 4", projects: [1] }
  ],
  container: "#chart",
  box_padding: 10,
  barHeight: 20,
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
