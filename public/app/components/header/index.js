import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import log from 'log';

const propTypes = {
  name: PropTypes.string.isRequired,
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.name = props.name;
  }
  componentWillMount() {
    //  render 调用之前

  }
  componentDidMount() {
    //  render调用之后
    this.header = findDOMNode(this.refs.header);
    log.info(this.header);
  }
  render() {
    return (
      <div className="header-container">
        <h1 ref="header">Header</h1>
      </div>
    );
  }
}

Header.propTypes = propTypes;

module.exports = Header;
