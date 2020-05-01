import React from "react";
import { BlockElement } from "./BlockElement.component";
import { timingSafeEqual } from "crypto";

enum PlayerType {
    playerIsX = 1,
    playerIs0 = 0,
    noPlayer = 2,
}

export class AIBoardComponent extends React.Component<any, any> {

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

    public getEmptyBlockDetails() {
        let id = 999;
        let rowNum = 999;
        let colNum = 999;
        this.state.blocks.map((row: any, i: any) => {
            row.map((block: any, j: any) => {
                if (block.visited === 0) {
                    id = block.id;
                    rowNum = i;
                    colNum = j;
                }
            })
        })
        return {
            id, rowNum, colNum
        }
    }

    public getEmptyBlockForRow(row: any) {
        let id = 999;
        let colNum = 999;
        row.map((block: any, j: any) => {
            if (block.visited === 0) {
                id = block.id;
                colNum = j;
            }
        })
        return ({
            id: id,
            j: colNum,
        })
    }

    public getEmptyBlockForColumn(columnNumber: any) {
        let id = 999;
        let rowNum = 999;
        const blocks = this.state.blocks;
        for(let i=0;i<3;i++) {
            let block = blocks[i][columnNumber];
            if(block.visited === 0) {
                id = block.id;
                rowNum = i;
            }
        }
        return ({
            id: id,
            rowNum: rowNum,
        })
    }

    public isOpponentWinningDiagnal(value: any) {
        let opponentBlockCount = 0;
        let emptyBlockCount = 0;
        let emptyBlockId = 999;
        let emptyBLockRowNum = 999;
        let emptyBlockColNum = 999;

        this.state.blocks.map((row: any, i: any) => {
            row.map((block: any, j: any) => {
                if ( i === j) {
                    if (block.playerType === PlayerType.noPlayer) {
                        emptyBlockCount++;
                        emptyBlockId = block.id;
                        emptyBLockRowNum = i;
                        emptyBlockColNum = j;
                    } else if (block.playerType === value) {
                        opponentBlockCount++;
                    }
                }
            })
        })
        if (opponentBlockCount === 2 && emptyBlockCount === 1) {
            return ({
                id: emptyBlockId,
                rowNum: emptyBLockRowNum,
                colNum: emptyBlockColNum,
            })
        } else {
            let opponentBlockCount = 0;
            let emptyBlockCount = 0;
            let emptyBlockId = 999;
            let emptyBLockRowNum = 999;
            let emptyBlockColNum = 999;
            this.state.blocks.map((row: any, i: any) => {
                row.map((block: any, j: any) => {
                    if ( (i === 0 && j === 2) ||
                         (i === 1 && j === 1) ||
                         (i === 2 && j === 0) ) {
                            if (block.playerType === PlayerType.noPlayer) {
                                emptyBlockCount++;
                                emptyBlockId = block.id;
                                emptyBLockRowNum = i;
                                emptyBlockColNum = j;
                            } else if (block.playerType === value) {
                                opponentBlockCount++;
                            }
                    }
                })
            })
            if (opponentBlockCount === 2 && emptyBlockCount === 1) {
                return ({
                    id: emptyBlockId,
                    rowNum: emptyBLockRowNum,
                    colNum: emptyBlockColNum,
                })
            } else {
                let opponentBlockCount = 0;
                let emptyBlockCount = 0;
                let emptyBlockId = 999;
                let emptyBLockRowNum = 999;
                let emptyBlockColNum = 999;
                return ({
                    id: emptyBlockId,
                    rowNum: emptyBLockRowNum,
                    colNum: emptyBlockColNum,
                })
            }
        }
    }

    public isOpponentWinningRow(value: any) {
        let id = 999;
        let rowNum = 999;
        let colNum = 999; 
        this.state.blocks.map((row: any, i: any) => {
            let countOne = 0;
            row.map((block: any, j: any) => {
                if(block.visited === 1 && block.playerType === value) {
                    countOne++;
                    if (countOne === 2) {
                        let tempBlock = this.getEmptyBlockForRow(row);
                        if (tempBlock.id !== 999) {
                            id = tempBlock.id;
                            rowNum = i;
                            colNum = tempBlock.j;
                        }
                    }
                }
            })

        })
        return (
            {
                id, rowNum, colNum
            }
        ) 
    }

    public isOpponentWinningColumn(value: any) {
        let id = 999;
        let rowNum = 999;
        let colNum = 999; 
        const blocks = this.state.blocks;
        for(let i=0;i<3;i++){
            let countOne = 0;
            for(let j=0;j<3;j++){
                let block = blocks[j][i];
                if(block.visited === 1 && block.playerType === value) {
                    countOne++;
                    if (countOne === 2) {
                        let tempBlock = this.getEmptyBlockForColumn(i);
                        if (tempBlock.id !== 999) {
                            id = tempBlock.id;
                            rowNum = tempBlock.rowNum;
                            colNum = i;
                        }
                    }
                }
            }
        }
        return (
            {
                id, rowNum, colNum
            }
        ) 
    }

    public isOpponentWinning(value: any) {
        let id = 999;
        let rowNum = 999;
        let colNum = 999;
        let targetBlock = this.isOpponentWinningRow(value);
        if (targetBlock.id !== 999) {
            id = targetBlock.id;
            rowNum = targetBlock.rowNum;
            colNum = targetBlock.colNum;
            return ({
                id, rowNum, colNum
            })
        } else {
            targetBlock = this.isOpponentWinningColumn(value);
            if (targetBlock.id !== 999) {
                id = targetBlock.id;
                rowNum = targetBlock.rowNum;
                colNum = targetBlock.colNum;
                return ({
                    id, rowNum, colNum
                })
            } else {
                targetBlock = this.isOpponentWinningDiagnal(value);
                if (targetBlock.id !== 999) {
                    id = targetBlock.id;
                    rowNum = targetBlock.rowNum;
                    colNum = targetBlock.colNum;
                    return ({
                        id, rowNum, colNum
                    })
                } else {
                    return ({
                        id, rowNum, colNum
                    })
                }
            }
        }
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
                    })
                } else if (this.state.winner === PlayerType.playerIs0) {
                    this.setState({
                        playerOWinCount: this.state.playerOWinCount + 1
                    })
                } else {
                    if (this.state.currentPlayer !== this.props.selectedOption) {
                        setTimeout(() => {
                            const selectBlockToWin = this.isOpponentWinning(this.state.currentPlayer)
                            if (selectBlockToWin.id !== 999) {
                                // console.log('ATTEMPT TO WIN');
                                this.onBlockClick(selectBlockToWin.id, selectBlockToWin.rowNum, selectBlockToWin.colNum);
                            } else {
                                const selectBlockToStopWin = this.isOpponentWinning(this.props.selectedOption)
                                if (selectBlockToStopWin.id !== 999) {
                                    // console.log('ATTEMPT TO STOP OPPONENT FROM WINNING')
                                    this.onBlockClick(selectBlockToStopWin.id, selectBlockToStopWin.rowNum, selectBlockToStopWin.colNum);
                                } else {
                                    const emptyBlock = this.getEmptyBlockDetails();
                                    if (emptyBlock.id !== 999) {
                                        // console.log('EMPTY BLOCK')
                                        this.onBlockClick(emptyBlock.id, emptyBlock.rowNum, emptyBlock.colNum);
                                    }
                                }
                            }
                        }, 250)
                    }
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
                {/* {this.renderCurrentPlayer()}
                {this.renderNextPlayer()}
                {this.renderPlayerNames()}
                {this.renderWinner()} */}
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