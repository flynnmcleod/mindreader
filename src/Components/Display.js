import React from 'react';
import { useState } from 'react';
import MindRead from './mind_read'



function Display() {
    const [result, updateResult] = useState('welcome to have your mind read.');
    return (<div>
                <Result result={result} />
                <div className = "video-wrapper">
                    <MindRead onReceivedResult={updateResult} />

                </div>
            </div>
    );
}

function Result(props) {
    return (
        <div>
            <h1> You are {props.result}</h1>
        </div>
    );
}

export default Display