import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import Default from './interface/default/';

const propTypes = {
  children: PropTypes.element,
};

//  App 启动
class AppStart extends React.Component {
  render() {
    if (!this.props.children) {
      return null;
    }
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
}

AppStart.propTypes = propTypes;

module.exports = {
  start() {
    render((
      <Router history={hashHistory}>
        <Route path="/" component={AppStart}>
          <Route path="index" component={Default} />
        </Route>
      </Router>
    ), document.getElementById('app-container'));
  }
};
