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

  constructor() {
    super();
    this.state = {
      Sequence: [I0, I1, I2, I3, I4, I5, I6, I7, I8, I8,I9],
      wrong: 0,
      trueClick: 0,
      win: false,
      originalWord: '',
      cutWord: '',
      letters: ["a", "b", "c", "d", "e", "f", "g", "h","i", "j" 
      ,"k","l", "m", "n", "o", "p", "q", "r", "s", "t","u", "v", "w", "x", "y", "z"]
    }
  }

  componentDidMount(){
    fetch("https://random-word-api.herokuapp.com/word?number=1")
    .then(res => res.json())
    .then(data => {
      this.setState({
        originalWord: data[0]
      })
      if (data[0].length <= 7){
        this.setState({cutWord: "_ _ " + this.state.originalWord.slice(2)})
      } else{
        this.setState({cutWord: "_ _ _ _ " + this.state.originalWord.slice(4)})
      }
    })
  }


  triedLetters = (e, l) => {
   e.target.disabled=true

   this.setState(
    {wrong: this.state.wrong + (this.state.originalWord.includes(l) ? 0 : 1) });
    if (this.state.originalWord.includes(l)){
      // cos changing the state is async that needs some time.
     this.setState({
        trueClick: this.state.trueClick+1,
        cutWord: this.state.cutWord.replace("_ ", l)
      }, function(){

        if (this.state.originalWord.length <= 7){
          // 
          if (this.state.trueClick === 2){
            this.setState({
              win: true
            })
          }
    
        }else if (this.state.originalWord.length > 7){
          if (this.state.trueClick === 4){
            this.setState({
              win: true
            })
          }
        }
      })
    }
  }

  render() {

    return (
      <div className="Hangman container">
        <h1><span className='hangcol'>Hang</span><span className='mancol'>man</span></h1>
        <h4>choose one of the letters to to fill the spaces below: </h4>

        <div>
          {/* disable the buttons when lose and win */}
          {this.state.letters.map((l, index) => (<button disabled={this.state.win || this.state.wrong===10? true: false} onClick={e => {this.triedLetters(e, l)}} className="l-btn" key={index}>{l}</button>))}
        </div>
        

        <div>
        <h3 className="guessmargin">Guess the Word</h3>
          <h1 className="cutmargin">{this.state.cutWord}</h1>
        </div>

        <div> <strong> Wrong Guesses: {this.state.wrong} of 10</strong></div>

        <div>
          <div>
            <h1  className={this.state.win? ' woncol': 'won woncol'}>you won!</h1>
            <h1  className={this.state.wrong===10? ' lostcol': 'lost lostcol'}>you lost!</h1>
          </div>

        </div>
        <div className={this.state.win? 'won ': ''}>
          <img width="500" src={this.state.Sequence[this.state.wrong]} alt="Loading"/>
        </div>
        <Hint />
      </div>
    )
  }
}

export default Hangman;

