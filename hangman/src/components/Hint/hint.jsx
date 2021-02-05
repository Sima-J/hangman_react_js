import React from 'react'
import './hint.css'

export default class  hint extends React.Component {
    constructor(){
        super();
        this.state = {hints: ['sorry I can not help', 'try to think outside the box...',
         "it's your choice.", "remember it's about life or death."]
        , counter: 0
        , display: true
    }
        this.giveHint = this.giveHint.bind(this);
        this.cancelhint = this.cancelhint.bind(this);
    }
    giveHint() {
        this.setState({
            counter: this.state.counter+1,
            display: false
        })
        // so it doesn't excedd the hints array.
        if (this.state.counter === 3){
            this.setState({
                counter: 0,
                display: false
            }) 
        }
    }
    cancelhint(){
        this.setState({
            display: true
        })
    }
    render() {
        return (
            <div>
            <button onClick={this.giveHint}>hint</button>
            <p className={this.state.display? "hint displayHint": "hint"}> 
            The random word is about ... ({this.state.hints[this.state.counter]}) 
            <span onClick={this.cancelhint} className="cancel">x</span></p>
            </div>
        
        )
    }

}
