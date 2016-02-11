import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/object/get';
import startCase from 'lodash/string/startCase';
import words from 'lodash/string/words';
import Code from './code-component';

import getRecipe from '../actions/recipe-actions';

function formatCode(code) {
  return code
    .replace(/import Recipe.*/ig, '')
    .replace(/(\n){3,}/g, '\n\n')
    .replace(/<Recipe.*/ig, '<form>')
    .replace(/<\/Recipe>/ig, '</form>')
}

class Recipe extends React.Component {
  constructor() {
    super();

    this.state = {
      data: 'model' // or 'form'
    }
  }
  render() {
    let {
      recipe,
      name,
      children,
      model,
      form = `${model}Form`,
      code
    } = this.props;

    const recipeCode = code || recipe.code;

    return (
      <div className="rsf-recipe">
        <form
          name={ name }
          className="rsf-content"
          onSubmit={this.props.onSubmit}>
            <h3>{ startCase(words(name)) } Recipe</h3>
            { children }
        </form>

        <div className="rsf-data">
          <span
            className={`rsf-tab ${this.state.data === 'model' ? '-active' : ''}`}
            onClick={() => this.setState({data: 'model'})}>Model</span>
          { get(this.props, form) &&
            <span
              className={`rsf-tab ${this.state.data === 'form' ? '-active' : ''}`}
              onClick={() => this.setState({data: 'form'})}>Form</span>
          }
          <br />
          { this.state.data === 'model' && 
            <pre>{ JSON.stringify(get(this.props, model), null, 2) }</pre>
          }
          { this.state.data === 'form' && 
            <pre>{ JSON.stringify(get(this.props, form), null, 2) }</pre>
          }
        </div>
        { recipeCode && <Code className="rsf-code" content={formatCode(recipeCode)} /> }

      </div>
    );
  }

  componentDidMount() {
    let { dispatch, name } = this.props;

    dispatch(getRecipe(name));
  }
}

export default connect(s => s)(Recipe);
