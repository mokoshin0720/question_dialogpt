import React, { useState, useEffect } from "react";
import ChatBot, { Loading } from 'react-simple-chatbot';
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
    const [reply, setReply] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem("previousMessage") === props.steps.user.message) {
            return (
                <div>
                    <Loading />
                </div>
            )
        }

        async function fetchData() {
            localStorage.setItem("previousMessage", props.steps.user.message)
            const chat_log = {input_text: props.steps.user.message}
            const response = await instance.post(requests.chatGenerate, chat_log);
            setReply(response.data);
            setLoading(false);
            props.triggerNextStep();
            return response
        }

        fetchData();
    }, [reply]);

    return (
        <div>
            {loading ? <Loading /> : reply}
        </div>
    )
}

export default QuestionGPT
