import React from "react";
import logo from './assets/icon_logo.jpg';
import logo_png from '.assets/icon.png';

export class PlayModeComponent extends React.Component<any, any> {

    onPlayWithAIClick = () => {
        this.props.onPlayWithAIClick();
    }

    onPlayWithFriendClick = () => {
        this.props.onPlayWithFriendClick();
    }

    render() {
        return (
            <div>
                <div>
                    <img src={require('./assets/icon_logo.jpg')}
                        style={{
                            width: 300,
                            height: 160,
                        }}/>
                </div>
                <div style={{
                    padding: 30
                }}>
                    Choose your play mode
                </div>
                <div
                style={aiButtonStyle}
                onClick={this.onPlayWithAIClick}>
                    With AI
                </div>
                <div
                style={friendButtonStyle}
                onClick={this.onPlayWithFriendClick}>
                    With a friend
                </div>
            </div>
        )
    }
}

const aiButtonStyle = {
    padding: 10,
    margin: 15,
    borderRadius: 7,
    backgroundColor: '#3264a8',
    color: 'white',
    borderTopLeftRadius: 19,
    borderBottomLeftRadius: 19,
    borderTopRightRadius: 19,
    borderBottomRightRadius: 19,
    boxShadow: "1px 2px 12px 1px #9E9E9E",
    cursor: 'pointer',
}

const friendButtonStyle = {
    padding: 10,
    margin: 15,
    borderRadius: 7,
    backgroundColor: 'white',
    borderTopLeftRadius: 19,
    borderBottomLeftRadius: 19,
    borderTopRightRadius: 19,
    borderBottomRightRadius: 19,
    boxShadow: "1px 2px 12px 1px #9E9E9E",
    cursor: 'pointer',
}