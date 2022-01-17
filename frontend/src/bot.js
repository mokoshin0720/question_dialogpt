import React from 'react';
import ChatBot from 'react-simple-chatbot';

export const QuestionGPT = (props) => {
    return (
        <ChatBot
        headerTitle="DialoGPT"
        recognitionEnable={true}
        steps={[
            {
            id: '1',
            message: props.input_text,
            trigger: '2',
            },
            {
            id: '2',
            message: props.reply_text,
            end: true,
            },
        ]}
        />
    )
}

export default QuestionGPT