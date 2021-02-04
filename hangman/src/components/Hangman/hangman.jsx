import React, { Component } from 'react';
import './hangman.css'
import Hint from '../hint';
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
    this.setState(st => (
    {MakeGuess: st.MakeGuess.add(Letter), wrong: st.wrong + (st.Ans.includes(Letter) ? 0 : 1) }));
  }

 TriedWords() {
    return this.state.Ans.split("").map(Letter => (this.state.MakeGuess.has(Letter) ? Letter : " _ "));
  }


  render() {
    const over = this.state.wrong >= this.props.Counter;
    const winner = this.TriedWords().join("") === this.state.Ans;

    // if (winner) {
    //    = "Congratulation, You WON:)"
    // }

    // if (over) {
    //    = "Sorry, You LOST"
    // }

    return (
      <div className="Hangman container">
        <h1><span className='hangcol'>Hang</span><span className='mancol'>man</span></h1>
        <div className="">Wrong Guesses: {this.state.wrong} of {this.props.Counter}</div>
        <div className="">
          <p>Guess the Word</p>
          <p>
            {!over ? this.TriedWords() : this.state.Ans}
          </p>
          
        </div>
        <div className="text-center">
          <img width="500" src={this.props.Sequence[this.state.wrong]} alt="Loading"/>
        </div>
        <Hint />
      </div>
    )
  }
}

export default Hangman;

