import React from "react";
import Webcam from "react-webcam";

class MindRead extends React.Component {
    constructor(props) {
        super(props);
        this.timerId = null;
        this.isCapturing = false;
    }

    setRef = webcam => {
        this.webcam = webcam;
    };

    startCapturing = () => {
        this.isCapturing = true;
        this.timerId = setInterval(() => {
            const image = this.webcam.getScreenshot();
            const byteArrayImage = this.convertToByteArray(image);
            this.fetchData(byteArrayImage)
        }, 2000);
    }

    fetchData = (byteArray) => {
        const apiKey = '4d59b64d62364e0e95bab8765324381f';
        const apiEndpoint = 'https://southcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=emotion'
        fetch(apiEndpoint, {
            body: byteArray,
            headers: {
                'cache-control': 'no-cache', 'Ocp-Apim-Subscription-Key': apiKey, 'Content-Type': 'application/octet-stream'
            },
            method: 'POST'
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    var anger = (data[0] != null ? data[0].faceAttributes.emotion.anger : 0);
                    var contempt = (data[0] != null ? data[0].faceAttributes.emotion.contempt : 0);
                    var disgust = (data[0] != null ? data[0].faceAttributes.emotion.disgust : 0);
                    var fear = (data[0] != null ? data[0].faceAttributes.emotion.fear : 0);
                    var happiness = (data[0] != null ? data[0].faceAttributes.emotion.happiness : 0);
                    var neutral = (data[0] != null ? data[0].faceAttributes.emotion.neutral : 0);
                    var sadness = (data[0] != null ? data[0].faceAttributes.emotion.sadness : 0);
                    var surprise = (data[0] != null ? data[0].faceAttributes.emotion.surprise : 0);
                    var values = [anger, contempt,disgust,fear,happiness,neutral,sadness,surprise];
                    var descriptors = ['angry with the world.', 'at peace.','appalled.','afraid.','happy as ever.','nothing special.','upset.','suprised!'];
                    var maxIndex = 0;
                    for (var i = 1; i < values.length; i++) {
                        if (values[maxIndex] < values[i]) {
                          maxIndex = i;
                          }
        }                      

                    if (values[maxIndex] < 0.5){
                        this.props.onReceivedResult('hard to read.');
                    }else{
                        this.props.onReceivedResult(descriptors[maxIndex]);
                    }
                    
                });
            }
        });
    }


    convertToByteArray = (image) => {
        const base64 = require('base64-js');
        const base64string = image.split(',')[1];
        return base64.toByteArray(base64string)
    };

    render() {

        
        return (
            <div>
                <Webcam
                    audio={false}
                    height={400}
                    width={450 }
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                />
                <div className = "button-wrapper">
                    <button variant="primary" onClick={this.startCapturing}>Let me read your mind.</button>
                </div>
            </div>
        );
    }
} 
    
export default MindRead