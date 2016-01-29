import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import {
  Router,
  Route,
  IndexRoute,
  Link,
  hashHistory
} from 'react-router';
import kebabCase from 'lodash/string/kebabCase';
import startCase from 'lodash/string/startCase';
import map from 'lodash/collection/map';

import IntroPage from './pages/intro-page';
import ActionsPage from './pages/actions-page';
import ModelReducerPage from './pages/model-reducer-page';
import FormReducerPage from './pages/form-reducer-page';
import ApiPage from './pages/api-page';

import SyncValidationRecipe from './recipes/sync-validation-recipe';
import SubmitValidationRecipe from './recipes/submit-validation-recipe';
import BlurValidationRecipe from './recipes/blur-validation-recipe';
import AsyncBlurValidationRecipe from './recipes/async-blur-validation-recipe';
import AutofillRecipe from './recipes/autofill-recipe';
import DeepRecipe from './recipes/deep-recipe';
import ComplexValuesRecipe from './recipes/complex-values-recipe';
import MultiRecordRecipe from './recipes/multi-record-recipe';
import ParseRecipe from './recipes/parse-recipe';
import VariousControlsRecipe from './recipes/various-controls-recipe';
import DynamicFieldRecipe from './recipes/dynamic-field-recipe';
import CustomComponentRecipe from './recipes/custom-component-recipe';
import NestedStateRecipe from './recipes/nested-state-recipe';

import {
  createModelReducer,
  createFormReducer
} from 'react-redux-form';

import './scss/main.scss';

import teamReducer from './reducers/team-reducer';

const userReducer = (state, action) => {
  let model = createModelReducer('user', { firstName: 'david', sex: 'F', employed: true, notes: 'testing' })(state, action);

  return {
    ...model,
    fullName: model.firstName + ' ' + (model.lastName || '')
  }
}

const pageReducer = (state = '', action) => {
  if (action.type === 'SET_PAGE') {
    return action.page;
  }

  return state;
}

const store = applyMiddleware(thunk)(createStore)(combineReducers({
  page: pageReducer,
  user: userReducer,
  userForm: createFormReducer('user'),
  syncValidUser: createModelReducer('syncValidUser'),
  syncValidUserForm: createFormReducer('syncValidUser'),
  submitValidUser: createModelReducer('submitValidUser'),
  submitValidUserForm: createFormReducer('submitValidUser'),
  info: createModelReducer('info', { phones: [ null ], children: [ null ] }),
  multiRecord: createModelReducer('multiRecord', [ {} ]),
  parseUser: createModelReducer('parseUser', { phone: '' }),
  order: createModelReducer('order', {
    shipping: {},
    billing: {}
  }),
  team: teamReducer
}));

const recipes = {
  'Sync Validation': SyncValidationRecipe,
  'Validation on Submit': SubmitValidationRecipe,
  'Validation on Blur': BlurValidationRecipe,
  'Async Validation': AsyncBlurValidationRecipe,
  'Autofill Fields': AutofillRecipe,
  'Deep Fields': DeepRecipe,
  'Complex Values': ComplexValuesRecipe,
  'Multiple Records': MultiRecordRecipe,
  'Parse Fields': ParseRecipe,
  'Various Controls': VariousControlsRecipe,
  'Dynamic Fields': DynamicFieldRecipe,
  'Custom Components': CustomComponentRecipe,
  'Model in Nested State': NestedStateRecipe
};

const apiMap = {
  'Field Component': 'Field-Component',
  'Action Creators': 'Action-Creators',
  'Action Thunk Creators': 'Action-Thunk-Creators',
  'Reducers': 'Reducers',
}

const guideMap = {
  'Getting Started': 'Home',
  'Step by Step': 'Step-by-Step',
};

const Docs = (props) => (
  <main className="rsf-layout-page">
    <nav className="rsf-layout-nav">
      <h6 className="rsf-heading">Guides</h6>
      <ul className="rsf-list">
      { map(guideMap, (guide, title) =>
        <li className="rsf-item" key={ guide }>
          <Link className="rsf-anchor" to={`api/${guide}`}>
            { title }
          </Link>
        </li>
      )}
      </ul>
      <h6 className="rsf-heading">API Reference</h6>
      <ul className="rsf-list">
        { map(apiMap, (item, title) =>
          <li className="rsf-item" key={ item }>
            <Link className="rsf-anchor"
              to={`api/${item}`}>
              { title }
            </Link>
          </li>
        )}
      </ul>
      <h6 className="rsf-heading">Recipes</h6>
      <ul className="rsf-list">
        { map(recipes, (_, recipeName) =>
          <li className="rsf-item" key={ recipeName }>
            <Link className="rsf-anchor"
              to={`recipe/${kebabCase(recipeName)}`}>
              { recipeName }
            </Link>
          </li>
        )}
      </ul>
    </nav>
    <section className="rsf-layout-content">
      { props.children }
    </section>
  </main>
);

const Recipes = (props) => <div>{props.children}</div>;

class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <Router history={ hashHistory }>
          <Route path="/" component={ Docs }>
            <IndexRoute component={ IntroPage } />
            <Route path="actions" component={ ActionsPage }/>
            <Route path="model-reducer" component={ ModelReducerPage }/>
            <Route path="form-reducer" component={ FormReducerPage }/>
            <Route path="api/:page" component={ ApiPage } />
            <Route path="recipe" component={ Recipes }>
            { map(recipes, (recipe, recipeName) => 
              <Route path={kebabCase(recipeName)}
                key={ recipeName }
                component={recipe} />
            )}
            </Route>
          </Route>
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
