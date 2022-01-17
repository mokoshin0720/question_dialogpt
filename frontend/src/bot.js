import React from 'react';
import ChatBot from 'react-simple-chatbot';
 
export const Sample = () => {
    return (
        <ChatBot
        headerTitle="DialoGPT"
        recognitionEnable={true}
        steps={[
            {
            id: '1',
            message: 'お名前は?',
            trigger: '2',
            },
            {
            id: '2',
            user: true,
            trigger: '3',
            },
            {
            id: '3',
            message: '{previousValue}さん,はじめまして!',
            end: true,
            },
        ]}
        />
    )
}
  
export default Sample