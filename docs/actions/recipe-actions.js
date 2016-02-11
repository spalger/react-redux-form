import 'whatwg-fetch';

export default function getRecipe(recipeName) {
  return (dispatch) => {
    fetch(`https://raw.githubusercontent.com/davidkpiano/react-redux-form/gh-pages/docs/recipes/${ recipeName }-recipe.js`)
      .then((res) => res.text())
      .then((code) => {
        dispatch({
          type: 'SET_RECIPE',
          name: recipeName,
          code: code
        })
      });
  }
}
