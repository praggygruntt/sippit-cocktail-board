import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons';
import '../Styles/Cocktail.css';

class Cocktail extends Component {
    getColor() {
        if(this.props.votes >= 15) {
            return "#4CAF50";
        } else if (this.props.votes >= 12) {
            return "#8BC34A";
        } else if (this.props.votes >= 9) {
            return "#cddc39";
        } else if (this.props.votes >= 6) {
            return "#ffeb3b";
        } else if (this.props.votes >= 3) {
            return "#ffc107";
        } else if (this.props.votes >= 0) {
            return "#ff9800";
        } else {
            return "#f44336";
        } 
    }
    render() {
        let externalURL = `https://www.google.com/search?q=${this.props.text}%20cocktail`;
        return(
            <div className="Cocktail">
                <div className="Cocktail-buttons">
                    <span className="Cocktail-buttons-upvote" onClick={this.props.upvote}><FontAwesomeIcon icon={faArrowUp}  /></span>
                    <span className="Cocktail-votes" style={{borderColor: this.getColor()}}>{this.props.votes}</span>
                    <span className="Cocktail-buttons-downvote" onClick={this.props.downvote}><FontAwesomeIcon icon={faArrowDown}/></span>
                </div>
                <div className="Cocktail-text">
                    {this.props.text}
                </div>
                <a href={externalURL} rel="noopener noreferrer" target="_blank"><img className="Cocktail-thumbnail" alt={this.props.text} src={this.props.image}></img></a>
            </div>
        )
    }
}

export default Cocktail;