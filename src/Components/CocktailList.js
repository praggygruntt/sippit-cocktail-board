import React, {Component} from 'react';
import axios from 'axios';
import '../Styles/CocktailList.css';

class CocktailList extends Component {
    static defaultProps = {
        numCocktailsToGet: 10
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
                <h1>Sippit!</h1>
                <h4>Cocktail Board</h4>
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