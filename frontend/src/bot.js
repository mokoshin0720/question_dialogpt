import React, { useContext } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ReplyText } from './App';

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
    const {reply} = useContext(ReplyText);

    return (
        <div>{reply}</div>
    )
}

export default QuestionGPT