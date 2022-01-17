import React, { useState, useEffect } from "react";
import ChatBot from 'react-simple-chatbot';
import instance from './axios';
import requests from './requests';

export const QuestionGPT = () => {
    const dummyText = "It is difficult to study English."

    return (
        <ChatBot
        headerTitle="DialoGPT"
        recognitionEnable={true}
        steps={[
            {
            id: '1',
            message: dummyText,
            trigger: '2',
            },
            {
            id: '2',
            component: <NextSentence />,
            waitAction: true,
            end: true,
            },
        ]}
        />
    )
}

export const NextSentence = () => {
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

    return (
        <div>{reply}</div>
    )
}

export default QuestionGPT