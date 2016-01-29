import 'whatwg-fetch';

export default function getPage(page) {
  return (dispatch) => {
    fetch(`https://raw.githubusercontent.com/wiki/davidkpiano/react-redux-form/${page}.md`)
      .then((res) => res.text())
      .then((page) => dispatch({
        type: 'SET_PAGE',
        page
      }));
  }
}
