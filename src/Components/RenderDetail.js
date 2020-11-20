import React, { Component } from 'react'
import reactHtmlParser from 'react-html-parser';
import request from 'superagent';

export default class RenderDetail extends Component {
    state = {
        favorites: [],
        recipes: []
    }

    componentDidMount = async () => {
        await this.fetchFavorites();
    }

    fetchFavorites = async () => {
        const response = await request
            .get(`${process.env.REACT_APP_BACK_END_URL}/api/user-recipes`)
            .set('Authorization', this.props.token)

            this.setState({ favorites: response.body });
    }

    handleFavorite = async (recipe) => {
        const favorite = {
            recipeId: recipe.id,
        };
        console.log(favorite, this.props.token);
        await request 
            .post (`${process.env.REACT_APP_BACK_END_URL}/api/user-recipes`)
            .set('Authorization', this.props.token)
            .send(favorite);
        
        await this.fetchFavorites();
    }    

    render() {
        // console.log(this.props.recipe);
        // console.log(this.state.favorites, this.props.token);
        console.log(this.state.favorites);
        return (
            <div>
                {
                        <div className='recipe-detail'>
                            <p className='title'>{this.props.recipe.title}</p>

                            <img src={this.props.recipe.image} alt={this.props.recipe.title} />

                            <p className='section-header'>Dietary Information: </p>
                            <p className='section-details'>{this.props.recipe.diets}</p>
                            
                            <p className="section-header">Summary: </p>
                            <p className='section-details'>{reactHtmlParser(this.props.recipe.summary)}</p>

                            <p className="section-header">Ingredients: </p>
                            <p className="section-details">{this.props.recipe.extendedIngredients.map(ingredient =>
                                <p>{ingredient.original}</p>)}
                            </p>

                            <p className="section-header">Instructions: </p>
                            <p className='section-details'>{reactHtmlParser(this.props.recipe.instructions)}</p>

                            <button onClick={() => this.handleFavorite(this.props.recipe)}>Add to Recipe Box</button>
                    <div>
                        {/* {
                            !!this.state.recipes.length && this.state.recipes.map(recipe => 
                                <div id={recipe.id}>
                            {
                                this.state.favorites.find(favorite => favorite.id === this.props.recipe.id)
                                ? <div>Hello</div>
                                : <button onClick={() => this.handleFavorite(recipe)}>Add to Recipe Box</button>
                            }
                            </div>)
                        } */}
                    </div>
                </div>
                }
            </div>
        )
    }
}
