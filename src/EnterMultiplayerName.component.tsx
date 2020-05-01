import React from "react";

export class EnterMultiplayerNameComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            playerOneName: '',
            playerTwoName: '',
        }
    }

    handleChangeForPlayerOneName(event: any) {
        this.setState({playerOneName: event.target.value})
    }

    handleChangeForPlayerTwoName(event: any) {
        this.setState({playerTwoName: event.target.value})
    }

    onMultiplayerNameContinueClick() {
        if(this.state.playerOneName === '') {
            alert('Please enter name of Player 1')
        } else if(this.state.playerTwoName === '') {
            alert('Please enter name of Player 2')
        } else if (this.state.playerOneName === this.state.playerTwoName) {
            alert('Player names should be distinct')
        } else {
            this.props.onMultiplayerNameContinueClick(this.state.playerOneName, this.state.playerTwoName)
        }
    }

    render() {
        return (
            <div>
                <div style={{
                    margin: 30
                }}>
                    Enter names of the players
                </div>
                <div style={{
                    margin: 20,
                }}>
                    <input type='text' value={this.state.playerOneName} 
                    placeholder='Player 1'
                    onChange={this.handleChangeForPlayerOneName.bind(this)}
                    style={{
                        padding: 5,
                    }}/>
                </div>
                <div style={{
                    margin: 20,
                }}>
                    <input type='text' value={this.state.playerTwoName} 
                    placeholder='Player 2'
                    onChange={this.handleChangeForPlayerTwoName.bind(this)}
                    style={{
                        padding: 5,
                    }}/>
                </div>
                <div onClick={this.onMultiplayerNameContinueClick.bind(this)}
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