import React, { Component } from 'react';
import './hangman.css'
import Hint from '../Hint/hint';
import I0 from "../images/0.png";
import I1 from "../images/1.PNG";
import I2 from "../images/2.PNG";
import I3 from "../images/3.PNG";
import I4 from "../images/4.PNG";
import I5 from "../images/5.PNG";
import I6 from "../images/6.PNG";
import I7 from "../images/7.PNG";
import I8 from "../images/8.PNG";
import I9 from "../images/9.PNG";


class Hangman extends Component {
  static defaultProps = {

    Counter: 10,
    Sequence: [I0, I1, I2, I3, I4, I5, I6, I7, I8,I9]
  }

  constructor(props) {
    super(props);
    this.state = {
      wrong: 0,
      MakeGuess: new Set([]),
      Ans: ""
    }
  }

  ManageGuess = a => {
    let Letter = a.target.value;
    this.setState(po => (
    {MakeGuess: po.MakeGuess.add(Letter), wrong: po.wrong + (po.Ans.includes(Letter) ? 0 : 1) }));
  }

 TriedWords() {
    return this.state.Ans.split("").map(Letter => (this.state.MakeGuess.has(Letter) ? Letter : " _ "));
  }
  LetterButtons() {
    return "abcdefghjklmnopqrstuvwxyz".split("").map(Letter => (
      <button
        class='ButtonOfLetter'
        key={Letter}
        value={Letter}
        onClick={this.ManageGuess}
        disabled={this.state.MakeGuess.has(Letter)}
      >{Letter} </button>
    ));
  }


  render() {
    const over = this.state.wrong >= this.props.Counter;
    const winner = this.TriedWords().join("") === this.state.Ans;
    let satus=this.LetterButtons();

     if (winner) {
     satus  = "Congratulation, You WON:)"
     }

    if (over) {
    satus  = "Sorry, You LOST"
    }

    return (
      <div className="Hangman">
        <h1><span className='One'>Hangman</span></h1>
        <div className="two">Wrong Guesses: {this.state.wrong} / {this.props.Counter}</div>
        <div className="three">
          <h3>Take a Guess </h3>
          <p>{satus}</p>

          <p>{!over ? this.TriedWords() : this.state.Ans}</p> </div>
        <div className="four"> <img src={this.props.Sequence[this.state.wrong]} alt="Loading"/> </div>
        <Hint />
      </div>
    )
  }
}

export default Hangman;

