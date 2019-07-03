import React, {Component} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import '../Styles/CocktailList.css';
import Cocktail from './Cocktail';

class CocktailList extends Component {
    static defaultProps = {
        numCocktailsToGet: 5
    };
    constructor(props) {
        super(props);
        this.state = {
            cocktails: JSON.parse(window.localStorage.getItem("cocktails") || "[]"),
            loading: false
        }
        this.seenCocktails = new Set(this.state.cocktails.map(cocktail => cocktail.strDrink));
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        if(this.state.cocktails.length === 0) this.getCocktails()   
    }
    async getCocktails() {
        try {
            let cocktails = [];
            while(cocktails.length < this.props.numCocktailsToGet) {
                let res = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
                let cocktailObj = res.data.drinks[0];
                if(!this.seenCocktails.has(cocktailObj.strDrink)) {
                    cocktails.push({...cocktailObj, votes: 0});
                } else {
                    console.log("FOUND A DUPLICATE");
                    console.log(cocktailObj.strDrink);
                }           
            }
            this.setState(st => ({
                loading: false,
                cocktails: [...st.cocktails, ...cocktails]
            }),
            () => window.localStorage.setItem("cocktails", JSON.stringify(this.state.cocktails)));
        } catch(error) {
            alert(error);
            this.setState({loading: false})
        }
    }
    handleUpvote(id) {
        this.setState(st => ({
            cocktails: st.cocktails.map(cocktail => 
                cocktail.idDrink === id ? {...cocktail, votes: cocktail.votes + 1} : cocktail
            )
        }),
        () => window.localStorage.setItem("cocktails", JSON.stringify(this.state.cocktails)));
    };
    handleDownvote(id) {
        this.setState(st => ({
            cocktails: st.cocktails.map(cocktail => (
                cocktail.idDrink === id ? {...cocktail, votes: cocktail.votes - 1} : cocktail
            ))
        }));
    };
    handleClick() {
        this.setState({loading: true}, this.getCocktails);
    }
    render() {
        let sortedCocktails = this.state.cocktails.sort((a,b) => b.votes - a.votes);
        return(
            <div className="CocktailList">
                <div className="CocktailList-sidebar">
                    <h1 className="CocktailList-title">Sippit!</h1>
                    <img className="logo" alt="Sippit Logo" src="https://image.flaticon.com/icons/svg/1860/1860254.svg" />
                    <button onClick={this.handleClick} className="CocktailList-get-more">Fetch Cocktails</button>
                    <button className="CocktailList-reset" onClick={() => {localStorage.clear(); window.location.reload();} }>Reset App</button>
                </div>
                {this.state.loading ? 
                    <div className="loading-spinner"><FontAwesomeIcon icon={faSpinner} spin size="6x"/></div>
                    :
                    <div className="CocktailList-cocktails">
                        {sortedCocktails.map(cocktail => (
                            <Cocktail 
                                key={cocktail.idDrink} 
                                id={cocktail.idDrink} 
                                text={cocktail.strDrink} 
                                votes={cocktail.votes} 
                                image={cocktail.strDrinkThumb}
                                upvote={() => this.handleUpvote(cocktail.idDrink)}
                                downvote={() => this.handleDownvote(cocktail.idDrink)}
                            />
                            ))}
                    </div>
                }
            </div>   
        )}
    };

export default CocktailList;