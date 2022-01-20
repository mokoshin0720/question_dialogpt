import React from "react";
import QuestionGPT from './bot';
import './App.css';

export const ReplyText = React.createContext();

function App() {
  const style = {
    width: "50%",
    margin: "0 auto",
    marginTop: 150
  };

  localStorage.clear()

  return (
    <div className="App">
      <div style={style}>
          <QuestionGPT />
      </div>
    </div>
  );
}

export default App;
