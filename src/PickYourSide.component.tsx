import React from "react";
import imgDivOne from './assets/tictactoe_one.png';
import imgDivTwo from './assets/tictactoe_two.png';
enum OptionTypes {
    optionOne = 1,
    optionTwo = 0,
    none = 2,
}
export class PickYourSideComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            selectedOption: OptionTypes.optionOne,
        }
    }

    onOptionOneSelect = () => {
        this.setState({
            selectedOption: OptionTypes.optionOne
        })
    }

    onOptionTwoSelect = () => {
        this.setState({
            selectedOption: OptionTypes.optionTwo,
        })
    }

    onContinuePickYourSideClick = () => {
        this.props.onContinuePickYourSideClick(this.state.selectedOption)
    }

    public getInnerDivForOptionOne(): React.ReactNode {
        if(this.state.selectedOption === OptionTypes.optionOne) {
            return (
                <div style={{
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    backgroundColor: '#3264a8',
                    position: 'absolute',
                    top: 2,
                    right: 2,
                }}>

                </div>
            );
        } else {
            return null;
        }
    }

    public getOptionOneDiv(): React.ReactNode {
        return (
            <div style={
                (this.state.selectedOption === OptionTypes.optionOne) ?
                    {
                        display: 'inline-block',
                    } : {
                        display: 'inline-block',
                        opacity: 0.5,
                    }
            }>
                <img src={imgDivOne} style={{
                    height: 105,
                    width: 100,
                }}/>
                <div
                    style={{
                        paddingLeft: 40,
                    }}>
                        <div onClick={this.onOptionOneSelect}
                        style={{
                            width: 20,
                            height: 20,
                            border: '2px solid',
                            borderColor: '#3264a8',
                            borderRadius: '50%',
                            position: 'relative',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                        }}>
                            {this.getInnerDivForOptionOne()}
                        </div>
                </div>
            </div>
        )
    } 

    public getInnerDivForOptionTwo(): React.ReactNode {
        if(this.state.selectedOption === OptionTypes.optionTwo) {
            return (
                <div style={{
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    backgroundColor: '#3264a8',
                    position: 'absolute',
                    top: 2,
                    right: 2,
                }}>

                </div>
            );
        } else {
            return null;
        }
    }

    public getOptionTwoDiv(): React.ReactNode {
        return (
            <div style={
                (this.state.selectedOption === OptionTypes.optionTwo) ?
                    {
                        display: 'inline-block',
                        marginLeft: 15,
                    } : {
                        display: 'inline-block',
                        marginLeft: 15,
                        opacity: 0.5,
                    }
            }>
                <img src={imgDivTwo} style={{
                    height: 105,
                    width: 100,
                }}/>
                <div
                    style={{
                        paddingLeft: 35,
                    }}>
                        <div 
                        onClick={this.onOptionTwoSelect}
                        style={{
                            width: 20,
                            height: 20,
                            border: '2px solid',
                            borderColor: '#3264a8',
                            borderRadius: '50%',
                            position: 'relative',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                        }}>
                            {this.getInnerDivForOptionTwo()}
                        </div>
                </div>
            </div>
        )
    } 

    public getContinueButton(): React.ReactNode {
        return (
            <div onClick={this.onContinuePickYourSideClick}
                style={{
                    margin: 40,
                    padding: 10,
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
        );
    }

    render() {
       return(
            <div>
                <div
                style={{
                    margin: 30
                }}>
                    Pick your side
                </div>
                <div style={{
                    margin: 30
                }}>
                    {this.getOptionOneDiv()}
                    {this.getOptionTwoDiv()}
                </div>
                {this.getContinueButton()}
            </div>
        )
    }

}