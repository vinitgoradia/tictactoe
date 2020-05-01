import React from "react";

export class EnterAINameComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            playerForAIName: '',
        }
    }

    handleChangeForPlayerOneName(event: any) {
        this.setState({playerForAIName: event.target.value})
    }

    onAINameContinueClick = () => {
        if (this.state.playerForAIName === '') {
            alert('Please enter your name')
        } else {
            this.props.onAINameContinueClick(this.state.playerForAIName)
        }
    }

    render() {
        return (
            <div>
                <div style={{
                    margin: 30
                }}>
                    Enter your name
                </div>
                <input type='text' value={this.state.playerOneName} 
                    placeholder='Your Name'
                    onChange={this.handleChangeForPlayerOneName.bind(this)}
                    style={{
                        padding: 5,
                    }}/>
                <div onClick={this.onAINameContinueClick}
                style={{
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
                }}>
                    Continue
                </div>
            </div>
        )
    }
}