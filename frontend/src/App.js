import React, { useState, useEffect } from "react";
import Sample from './bot';
import './App.css';
import instance from './axios';
import requests from './requests';

function App() {
  const style = {
    width: "50%",
    margin: "0 auto",
    marginTop: 150
  };

  const [reply, setReply] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const chat_log = {input_text: "It is difficult to study English."}
      const response = await instance.post(requests.chatGenerate, chat_log);
      setReply(response.data.reply_text);
      console.log(response)
      return response
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <div style={style}>
        <Sample />
        <p>reply</p>
        <p>{reply}</p>
      </div>
    </div>
  );
}

export default App;
