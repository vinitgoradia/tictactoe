import React from "react";
import { BlockElement } from "./BlockElement.component";
import { timingSafeEqual } from "crypto";

enum PlayerType {
    playerIsX = 1,
    playerIs0 = 0,
    noPlayer = 2,
}

export class MultiplayerBoard extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            currentPlayer: this.props.selectedOption,
            firstPlayer: this.props.selectedOption,
            winner: PlayerType.noPlayer,
            playerXWinCount: 0,
            playerOWinCount: 0,
            blocks: this.getGeneratedInitialStateOfBlocks(),
        }
    }

    public getGeneratedInitialStateOfBlocks() {
        let initialStateOfBlocks = [];
        let blockId = 1;
        for(let i = 1; i < 4; i++) {
            let row = [];
            for(let j = 1; j < 4; j++) {
                row.push({
                    playerType: PlayerType.noPlayer,
                    visited: 0,
                    id: blockId,
                })
                blockId += 1;
            }
            initialStateOfBlocks.push(row);
        }
        return initialStateOfBlocks;
    }

    public getNextPlayer(currentPlayer: any) {
        let nextPlayer = PlayerType.noPlayer;
        if (currentPlayer === PlayerType.playerIsX) {
            nextPlayer = PlayerType.playerIs0;
        } else {
            nextPlayer = PlayerType.playerIsX
        }
        return nextPlayer;
    }

    public isAllVisited() {
        let visitedCount = 0;
        this.state.blocks.map((row: any, i: any) => {
            row.map((block: any, j: any) => {
                if (block.visited === 1) {
                    visitedCount++;
                }
            })
        })
        if (visitedCount === 9) {
            return true;
        } else {
            return false;
        }
    }

    public detectWinner(blocks: any) {
        let winningPlayer;
        if (blocks[0][0].playerType === blocks[0][1].playerType &&
            blocks[0][1].playerType === blocks[0][2].playerType) {
            winningPlayer = blocks[0][0].playerType;
        } else if ( blocks[1][0].playerType === blocks[1][1].playerType &&
                    blocks[1][1].playerType === blocks[1][2].playerType) {
                    winningPlayer = blocks[1][0].playerType;
        } else if ( blocks[2][0].playerType === blocks[2][1].playerType &&
                    blocks[2][1].playerType === blocks[2][2].playerType) {
                    winningPlayer = blocks[2][0].playerType;
        } else if ( blocks[0][0].playerType === blocks[1][0].playerType &&
                    blocks[1][0].playerType === blocks[2][0].playerType) {
                    winningPlayer = blocks[0][0].playerType;
        } else if ( blocks[0][1].playerType === blocks[1][1].playerType &&
                    blocks[1][1].playerType === blocks[2][1].playerType) {
                    winningPlayer = blocks[0][1].playerType;
        } else if ( blocks[0][2].playerType === blocks[1][2].playerType &&
                    blocks[1][2].playerType === blocks[2][2].playerType) {
                    winningPlayer = blocks[0][2].playerType;
        } else if ( blocks[0][0].playerType === blocks[1][1].playerType &&
                    blocks[1][1].playerType === blocks[2][2].playerType) {
                    winningPlayer = blocks[0][0].playerType;
        } else if ( blocks[0][2].playerType === blocks[1][1].playerType &&
                    blocks[1][1].playerType === blocks[2][0].playerType) {
                    winningPlayer = blocks[0][2].playerType;
        } else {
            winningPlayer = PlayerType.noPlayer;
        }
        return winningPlayer;
    }

    public onBlockClick = (id: any, rowNum: any, colNum: any) => {
        if (this.state.blocks[rowNum][colNum].visited === 0 &&
            this.state.winner === PlayerType.noPlayer) {
            let updatedBlocks: any[] = [];
            this.state.blocks.map((row: any, i: any) => {
                if (i !== rowNum) {
                    updatedBlocks.push(row);
                } else {
                    let updatedRow: any[] = [];
                    row.map((blockElement: any, j: any) => {
                        if (blockElement.id !== id) {
                            updatedRow.push(blockElement);                            
                        } else {
                            updatedRow.push({
                                playerType: this.state.currentPlayer,
                                visited: 1,
                                id: blockElement.id,
                            })
                        }
                    })
                    updatedBlocks.push(updatedRow)
                }
            })
            this.setState({
                blocks: updatedBlocks,
                currentPlayer: this.getNextPlayer(this.state.currentPlayer),
                winner: this.detectWinner(updatedBlocks)
            }, () => {
                if (this.state.winner === PlayerType.playerIsX) {
                    this.setState({
                        playerXWinCount: this.state.playerXWinCount + 1
                    }, () => {
                        // alert(this.state.currentPlayer + 'won!')
                    })
                } else if (this.state.winner === PlayerType.playerIs0) {
                    this.setState({
                        playerOWinCount: this.state.playerOWinCount + 1
                    }, () => {
                        // alert(this.state.currentPlayer + 'won')
                    })
                }
            });
        }
    }

    public renderCurrentPlayer() {
        return (
            <div>
                Current Player: {this.state.currentPlayer}
            </div>
        )
    }

    public renderNextPlayer() {
        return (
            <div>
                Next Player: {this.getNextPlayer(this.state.currentPlayer)}
            </div>
        )
    }

    public renderWinner() {
        return (
            <div>
                Winner: {this.state.winner}
            </div>
        )
    }

    public renderPlayerNames() {
        return (
            <div>
                <div>
                    {this.props.playerOneName}
                </div>
                <div>
                    {this.props.playerTwoName}
                </div>
            </div>
        )
    }

    public getScoreCountElement() {
        if(this.state.firstPlayer === PlayerType.playerIsX) {
            return (
                <span style={scoreElementStyle}>
                    {this.state.playerXWinCount} - {this.state.playerOWinCount}
                </span>
            )
        } else {
            return (
                <span style={scoreElementStyle}>
                    {this.state.playerOWinCount} - {this.state.playerXWinCount}
                </span>
            )
        }
    }

    public getPlayerOneNameSpanElement() {
        if (this.state.firstPlayer === PlayerType.playerIsX) {
            return (
                <span style={
                    (this.state.currentPlayer === PlayerType.playerIsX) ?
                    {
                        padding: 10,
                        color: 'green',
                    }:
                    { 
                        padding: 10,
                        color: 'black',
                    }}>
                    {this.props.playerOneName}
                </span>
            )
        } else {
            return (
                <span style={
                    (this.state.currentPlayer === PlayerType.playerIsX) ?
                    {
                        padding: 10,
                        color: 'black',
                    }:
                    { 
                        padding: 10,
                        color: 'green',
                    }}>
                    {this.props.playerOneName}
                </span>
            )
        }
    }

    public getPlayerTwoNameSpanElement() {
        if (this.state.firstPlayer === PlayerType.playerIsX) {
            return (
                <span style={
                    (this.state.currentPlayer === PlayerType.playerIs0) ?
                    {
                        padding: 10,
                        color: 'green',
                    }:
                    { 
                        padding: 10,
                        color: 'black',
                    }}>
                    {this.props.playerTwoName}
                </span>
            )
        } else {
            return (
                <span style={
                    (this.state.currentPlayer === PlayerType.playerIs0) ?
                    {
                        padding: 10,
                        color: 'black',
                    }:
                    { 
                        padding: 10,
                        color: 'green',
                    }}>
                    {this.props.playerTwoName}
                </span>
            )
        }
    }

    public renderPlayerNamesWithScores() {
        return (
            <div style={{
                padding: 10,
                margin: 15,
            }}>
                {this.getPlayerOneNameSpanElement()}
                {this.getScoreCountElement()}
                {this.getPlayerTwoNameSpanElement()}
            </div>
        )
    }

    public getWinningPlayerName() {
        let winningPlayerName = '';
        if (this.props.selectedOption === this.state.winner) {
            winningPlayerName = this.props.playerOneName;
        } else {
            winningPlayerName = this.props.playerTwoName;
        }
        return winningPlayerName;
    }

    onPlayAgainClick = () => {
        this.setState({
            blocks: this.getGeneratedInitialStateOfBlocks(),
            winner: PlayerType.noPlayer,
            currentPlayer: this.props.selectedOption,
        })
    }

    public getPlayAgainButton() {
        return (
            <div style={playAgainButtonStyle}
            onClick={this.onPlayAgainClick}>
                    Play Again
            </div>
        )
    }

    public getWinStatusElements() {
        if ((this.state.winner === PlayerType.playerIsX) ||
            (this.state.winner === PlayerType.playerIs0)) {
            return (
                <div style={{
                    margin: 20
                }}>
                    {this.getWinningPlayerName()} won!
                    {this.getPlayAgainButton()}
                </div>
            )
        } else if(this.isAllVisited() && (this.state.winner === PlayerType.noPlayer)) {
            return (
                <div style={{
                    margin: 20
                }}>
                    <div>
                        Tie!
                    </div>
                    {this.getPlayAgainButton()}
                </div>
            )
        } else {
            return null;
        }
    }

    public renderBlocks() {
        return (
            <div style={boardStyle}>
                {this.state.blocks.map((row: any, i: any) => {
                    return (
                        <div key={i}>
                            {(row.map((blockDetails: any, j: any) => {
                            return (
                                <BlockElement
                                    id={blockDetails.id}
                                    key={blockDetails.id}
                                    rowNum={i}
                                    colNum={j}
                                    player={blockDetails}
                                    onBlockClick={this.onBlockClick}
                                />
                            )}))}
                        </div>
                    )
                })}
            </div>
        )
    }

    public getQuitToHomeButton() {
        return (
            <div style={quitToHomeStyle}
            onClick={() => window.location.reload(true)}>
                Quit To Home
            </div>
        )
    }

    public render() {
        return (
            <div>
                {this.renderPlayerNamesWithScores()}
                {this.renderBlocks()}
                {this.getWinStatusElements()}
                {this.getQuitToHomeButton()}
            </div>
        );
    }
}

const boardStyle = {
    padding: 25,
    boxShadow: "1px 2px 12px 1px #9E9E9E",
    borderRadius: 10,
}

const quitToHomeStyle = {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
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

const scoreElementStyle = {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 15,
    borderRadius: 7,
    backgroundColor: 'white',
    borderTopLeftRadius: 19,
    borderBottomLeftRadius: 19,
    borderTopRightRadius: 19,
    borderBottomRightRadius: 19,
    boxShadow: "1px 2px 12px 1px #9E9E9E",
}

const playAgainButtonStyle = {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
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