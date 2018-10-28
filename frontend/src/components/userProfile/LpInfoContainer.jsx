import React, { Component } from 'react';
import LpPage from '../learningpath/LpPage';
import './LpInfoContainer.css'

class LpInfoContainer extends Component {
  render() {
    return (
      <span>
        <div className="borderLpInfo">
          {'LearningPaths'}
        {/*<LpPage />*/}
        </div>
      </span>
    );
  }
}

export default LpInfoContainer;
