import React, { useState, useEffect } from "react";
import ChatBot from 'react-simple-chatbot';
import instance from './axios';
import requests from './requests';

export const QuestionGPT = () => {
    const welcomeText = "Let's have a conversation with me!"

    return (
        <ChatBot
        headerTitle="DialoGPT"
        recognitionEnable={true}
        steps={[
            {
                id: '1',
                message: welcomeText,
                trigger: 'chat',
            },
            {
                id: 'chat',
                user: true,
                trigger: '3',
            },
            {
                id: '3',
                component: <NextSentence />,
                waitAction: true,
                end: true,
                },
        ]}
        />
    )
}

export const NextSentence = (props) => {
    const [reply, setReply] = useState("JUST A MINUTES...");

    useEffect(() => {
        async function fetchData() {
            const chat_log = {input_text: props.steps.chat.message}
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