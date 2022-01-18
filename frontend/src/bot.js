import React, { useState, useEffect } from "react";
import ChatBot from 'react-simple-chatbot';
import instance from './axios';
import requests from './requests';

export const QuestionGPT = () => {
    const welcomeText = "Let's have a conversation with me!"

    return (
        <ChatBot
        headerTitle="QuestionGPT"
        recognitionEnable={true}
        steps={[
            {
                id: '1',
                message: welcomeText,
                trigger: 'user',
            },
            {
                id: 'user',
                user: true,
                trigger: 'bot',
            },
            {
                id: 'bot',
                component: <NextSentence />,
                waitAction: true,
                asMessage: true,
                trigger: 'user',
            },
        ]}
        />
    )
}

export const NextSentence = (props) => {
    const [replies, setReplies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const chat_log = {input_text: props.steps.user.message}
            const response = await instance.post(requests.chatGenerate, chat_log);
            setReplies([...replies, response.data]);
            props.triggerNextStep();
            return response
        }

        fetchData();
    }, []);

    return (
        <div>
                {replies}
        </div>
    )
}

export default QuestionGPT