import React, {Component} from 'react';
import propTypes from 'prop-types';
import './Display.css';

class DisplayGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedAnswer: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    static propTypes = {
        submit: propTypes.bool.isRequired,
        countries: propTypes.array.isRequired,
        flagUrl: propTypes.string,
        correctAnswer: propTypes.string.isRequired,
        guessedAnswer: propTypes.string.isRequired,
        onLoad: propTypes.func.isRequired,
        onSubmit: propTypes.func.isRequired
    };
    
    componentDidMount() {
        this.props.onLoad();
    }
    
    handleChange(event) {
        this.setState({
            checkedAnswer: event.target.value
        });
    }
    
    handleSubmit(event){
        event.preventDefault();
        this.props.onSubmit(this.state.checkedAnswer);
    }
 
    render() {
        let {countries, flagUrl} = this.props;
        let view = 'Loading...';
        let flag = flagUrl ? <img 
                    src={flagUrl} 
                    id="flag"
                    //height='400' 
                    alt='This is the flag of what country?' /> : 
                    <div></div>;
        
        if (countries && countries.length > 0) {
            view = countries.map(country => (
                <div key={country.alpha2Code} className='choice'>
                    <input 
                        type="radio" 
                        value={country.name}
                        id={country.name}
                        name="guessedAnswer"
                        checked={this.state.checkedAnswer === country.name}
                        onChange={this.handleChange}
                    />
                    <label htmlFor={country['name']}> {country['name']}</label>
                </div>
            ));
        }
        
        return (
            <div className="game">
                <div className="view">
                    <span className="countries">{view}</span>
                    <button className="submit-btn" onClick={this.handleSubmit}>Submit Guess</button>
                </div>
                {flag}
            </div>
        );
    } 
}

class DisplayResults extends Component {
    constructor(props) {
        super(props);
        this.handleNewGame = this.handleNewGame.bind(this);
    }
    
    static propTypes = {
        flagUrl: propTypes.string,
        correctAnswer: propTypes.string.isRequired,
        guessedAnswer: propTypes.string.isRequired,
        onNewGame: propTypes.func.isRequired
    };
    
    handleNewGame() {
        this.props.onNewGame();
    }
    
    render() {
        const {flagUrl, correctAnswer, guessedAnswer} = this.props;
        let flag = <img 
                        id='flag' 
                        src={flagUrl} 
                        //height='400' 
                        alt='This is the flag of what country?' />;
        const button = <button className="new-game-btn" onClick={this.handleNewGame}>New Flag</button>;
        
        let results = (correctAnswer === guessedAnswer) ? 
            <div className="view">
                <span className="answer">Correct! This flag belongs to {correctAnswer}.</span>
                {button}
            </div> :
            <div className="view">
                <span className="answer">You picked {guessedAnswer}. 
                The correct answer is {correctAnswer}.</span>
                {button}
            </div>;
        
        return (
            <div className="game">
                {results}
                {flag}
            </div>
        );
    }
}

export {DisplayGame, DisplayResults};