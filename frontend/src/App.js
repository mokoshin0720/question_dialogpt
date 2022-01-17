import React, { useState, useEffect } from "react";
import QuestionGPT from './bot';
import './App.css';
import instance from './axios';
import requests from './requests';

function App() {
  const style = {
    width: "50%",
    margin: "0 auto",
    marginTop: 150
  };

  const [reply, setReply] = useState("some messa");
  const dummyText = "It is difficult to study English."

  useEffect(() => {
    async function fetchData() {
      const chat_log = {input_text: dummyText}
      const response = await instance.post(requests.chatGenerate, chat_log);
      console.log(response.data)
      console.log(response)
      setReply(response.data);
      return response
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <div style={style}>
        <QuestionGPT input_text={dummyText} reply_text={reply} />
      </div>
    </div>
  );
}

export default App;
