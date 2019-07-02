import React, {Component} from 'react';
import axios from 'axios';
import '../Styles/CocktailList.css';

class CocktailList extends Component {
    static defaultProps = {
        numCocktailsToGet: 40
    };
    constructor(props) {
        super(props);
        this.state = {
            cocktails: []
        }
    }
    async componentDidMount() {
        // load cocktails
        let cocktails = [];
        while(cocktails.length < this.props.numCocktailsToGet) {
            let res = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
            let cocktailObj = res.data.drinks[0]
            cocktails.push(cocktailObj);
            console.log(cocktailObj);
        }
        this.setState({cocktails: cocktails})
    }
    render() {
        return(
            <div className="CocktailList">
                <div className="CocktailList-sidebar">
                    <h1 className="CocktailList-title">Sippit!</h1>
                    <img className="logo" src="https://image.flaticon.com/icons/svg/1860/1860254.svg" />
                    <button className="CocktailList-get-more">New Cocktails</button>
                </div>
                <div className="CocktailList-cocktails">
                    {this.state.cocktails.map(cocktail => (
                        <div>{cocktail.strDrink}</div>
                    ))}
                </div>
            </div>
        )
    }
}

export default CocktailList;