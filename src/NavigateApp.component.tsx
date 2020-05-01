import React from "react";
import { PlayModeComponent } from "./PlayMode.component";
import { EnterMultiplayerNameComponent } from "./EnterMultiplayerName.component";
import { EnterAINameComponent } from "./EnterAIName.component";
import { PickYourSideComponent } from "./PickYourSide.component";
import { MultiplayerBoard } from "./MultiplayerBoard.component";
import { PickYourSideForAIComponent } from "./PickYourSideForAI.component";
import { AIBoardComponent } from "./AIBoard.component";

enum Screens {
    playModeScreen = 1,
    enterMultiplayerNameScreen = 2,
    enterAINameScreen = 3,
    pickYourSideScreen = 4,
    multiplayerBoardScreen = 5,
    pickYourSideScreenForAI =  6,
    AIBoardScreen = 7,
}

export class NavigateAppComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            currentActiveScreen: Screens.playModeScreen,
        }
    }

    onPlayWithFriendClick = () => {
        this.setState({
            currentActiveScreen: Screens.enterMultiplayerNameScreen
        })
    }

    onPlayWithAIClick = () => {
        this.setState({
            currentActiveScreen: Screens.enterAINameScreen
        })
    }

    onMultiplayerNameContinueClick = (playerOneName: any, playerTwoName: any) => {
        this.setState({
            currentActiveScreen: Screens.pickYourSideScreen,
            playerOneName: playerOneName,
            playerTwoName: playerTwoName,
        })
    }

    onAINameContinueClick = (playerForAIName: any) => {
        this.setState({
            currentActiveScreen: Screens.pickYourSideScreenForAI,
            playerForAIName: playerForAIName,
            playerAIName: 'AI',
        })
    }

    onContinuePickYourSideClick = (selectedOption: any) => {
        this.setState({
            selectedOption: selectedOption,
            currentActiveScreen: Screens.multiplayerBoardScreen,
        })
    }

    onContinuePickYourSideForAIClick = (selectedOption: any) => {
        this.setState({
            selectedOption: selectedOption,
            currentActiveScreen: Screens.AIBoardScreen,
        })
    }

    getActiveScreen() {
        let screen;
        switch(this.state.currentActiveScreen) {
            case Screens.playModeScreen: {
                screen = <PlayModeComponent
                onPlayWithFriendClick={this.onPlayWithFriendClick}
                onPlayWithAIClick={this.onPlayWithAIClick}/>
                break;
            }
            case Screens.enterMultiplayerNameScreen: {
                screen = <EnterMultiplayerNameComponent
                onMultiplayerNameContinueClick={this.onMultiplayerNameContinueClick}/>
                break;
            }
            case Screens.enterAINameScreen: {
                screen = <EnterAINameComponent
                onAINameContinueClick={this.onAINameContinueClick}/>
                break;
            }
            case Screens.pickYourSideScreen: {
                screen = <PickYourSideComponent
                onContinuePickYourSideClick={this.onContinuePickYourSideClick}/>
                break;
            }
            case Screens.pickYourSideScreenForAI: {
                screen = <PickYourSideForAIComponent
                onContinuePickYourSideForAIClick={this.onContinuePickYourSideForAIClick}/>
                break;
            }
            case Screens.multiplayerBoardScreen: {
                screen = <MultiplayerBoard
                playerOneName={this.state.playerOneName}
                playerTwoName={this.state.playerTwoName}
                selectedOption={this.state.selectedOption}/>
                break;
            }
            case Screens.AIBoardScreen: {
                screen = <AIBoardComponent
                playerOneName={this.state.playerForAIName}
                playerTwoName={this.state.playerAIName}
                selectedOption={this.state.selectedOption}/>
                break;
            }
            default: {
                screen = <div></div>
            }
        }
        return screen;
    }

    render() {
        return (
            <div>
                {this.getActiveScreen()}
            </div>
        )
    }
}