import React from 'react';
import Code from '../components/code-component';
import Markdown, { js } from '../components/markdown-component';
import { connect } from 'react-redux';

import getPage from '../actions/wiki-actions';

class ApiPage extends React.Component {
  componentWillMount() {
    let { dispatch, params } = this.props;

    dispatch(getPage(params.page));
  }

  render() {
    let { params, page, dispatch } = this.props;

    if (!page.length) {
      return <div>Loading...</div>
    }

    return <Markdown content={page} key={ params.page }/>
  }

  componentWillUpdate(nextProps) {
    let { params, dispatch } = this.props;

    if (nextProps.params.page !== params.page) {
      dispatch(getPage(nextProps.params.page));
    } 
  }
}

export default connect(s => s)(ApiPage);
