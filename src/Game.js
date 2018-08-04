import React, {Component} from 'react';
import fetch from 'node-fetch';
import {DisplayGame, DisplayResults} from './Display';


class Game extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            countries: [],
            flag: null,
            correctAnswer: '',
            guessedAnswer: '',
            submit: false
        };
        this.onLoad = this.onLoad.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onNewGame = this.onNewGame.bind(this);
    }
    
    onLoad() {
        const countriesUrl = 'https://restcountries.eu/rest/v2/all';
        let //randomNumbers = this.pickFourNumbers(),
            correct = Math.floor(Math.random()*4);
        
        fetch(countriesUrl)
            .then(res => res.json())
            .then(json => this.pickFourNumbers(json))
            .then(countries => this.setState({
                countries,
                flag: countries[correct].flag,
                correctAnswer: countries[correct].name
            }));
    }
    
    pickFourNumbers(json) {
        let arr = [];
        let answers = [];
        while(arr.length < 4){
            let randomnumber = Math.floor(Math.random()*json.length) + 1;
            if(arr.indexOf(randomnumber) > -1) continue;
            arr[arr.length] = randomnumber;
        }
        arr.forEach(function(num) {
            answers.push(json[num]);
        });
        return answers;
    }
    
    onSubmit(guess) {
        this.setState({
            submit: true,
            guessedAnswer: guess
        });
    }
    
    onNewGame(){
        this.setState({
            countries: [],
            flag: null,
            correctAnswer: '',
            guessedAnswer: '',
            submit: false
        });
    }
    
    render() {
        const {submit, countries, flag, correctAnswer, guessedAnswer} = this.state;
        
        if (!submit) {
            return (
                <DisplayGame 
                    submit={submit} 
                    countries={countries}
                    flagUrl={flag}
                    correctAnswer={correctAnswer}
                    guessedAnswer={guessedAnswer}
                    onLoad={this.onLoad}
                    onSubmit={this.onSubmit}
                />
            );
        } else {
            return (
                <DisplayResults 
                    flagUrl={flag}
                    correctAnswer={correctAnswer}
                    guessedAnswer={guessedAnswer}
                    onNewGame={this.onNewGame}
                />
            );
        }
    }
}




export default Game;