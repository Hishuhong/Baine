import React, { PropTypes } from 'react';

const propTypes = {
  name: PropTypes.string,
};

const defaultProps = {
  name: 'icepy',
};

class Footer extends React.Component {
  // 渲染
  render() {
    if (!this.props.name) {
      return null;
    }
    return (
      <div className="footer-container">@ {this.props.name}</div>
    );
  }
}

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

module.exports = Footer;
