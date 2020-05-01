import React from "react";
import img_x from './assets/tictactoe_one.png';
import img_o from './assets/tictactoe_two.png';

enum PlayerType {
  playerIsX = 1,
  playerIs0 = 0,
  noPlayer = 2,
}

export class BlockElement extends React.Component<any, any> {
    
    public onBlockClick = () => {
        this.props.onBlockClick(this.props.id, this.props.rowNum, this.props.colNum);
    }

    public getImgX() {
      return (
        <img src={img_x} style={{
          width: 42,
          height: 48,
        }}/>
      )
    }

    public getImgO() {
      return (
        <img src={img_o} style={{
          width: 48,
          height: 48,
        }}/>
      )
    }

    public getPlayerTypeImg() {
      switch (this.props.player.playerType) {
        case PlayerType.playerIsX: {
          return this.getImgX();
        }
        case PlayerType.playerIs0: {
          return this.getImgO();
        }
        case PlayerType.noPlayer: {
          return null;
        }
        default: {
          return null;
        }
      }
    }
  
    public render() {
        return (
          <div
            style={blockStyle}
            id={this.props.id}
            onClick={this.onBlockClick.bind(this, this.props.id)}>
                {this.getPlayerTypeImg()}
          </div>
        );
      }
    }

    const blockStyle = {
        width: "50px",
        height: "50px",
        display: "inline-block",
        border: "1px solid #DFDFDF",
        verticalAlign: 'middle',
    }