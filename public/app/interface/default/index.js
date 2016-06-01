import React, { PropTypes } from 'react';
import Header from '../../components/header/';
import Footer from '../../components/footer/';

const propTypes = {
  info: PropTypes.string.isRequired,
};
const defaultProps = {
  info: 'hello javascript learn website',
};

//  初始界面
class DefaultDesign extends React.Component {
  componentDidMount() {
    console.log(this.props.info);
  }
  //  ...
  render() {
    if (!this.props.info) {
      return null;
    }
    return (
      <div className="default-container">
        <Header name={'icepy'} />
        <div className="jl-container">
          <h1>{this.props.info}</h1>
        </div>
        <Footer />
      </div>
    );
  }
}

DefaultDesign.defaultProps = defaultProps;
DefaultDesign.propTypes = propTypes;

module.exports = DefaultDesign;
