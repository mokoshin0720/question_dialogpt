import React, { useState, useEffect } from "react";
import QuestionGPT from './bot';
import './App.css';
import instance from './axios';
import requests from './requests';

export const ReplyText = React.createContext();

function App() {
  const style = {
    width: "50%",
    margin: "0 auto",
    marginTop: 150
  };

  const [reply, setReply] = useState("JUST A MINUTES...");
  const dummyText = "It is difficult to study English."

  useEffect(() => {
    async function fetchData() {
      const chat_log = {input_text: dummyText}
      const response = await instance.post(requests.chatGenerate, chat_log);
      setReply(response.data);
      return response
    }

    fetchData();
  }, []);

  const value = {
    reply,
    setReply,
  }

  return (
    <div className="App">
      <div style={style}>
        <ReplyText.Provider value={value}>
          <QuestionGPT />
        </ReplyText.Provider>
      </div>
    </div>
  );
}

export default App;
