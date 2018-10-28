import React, { Component } from 'react';
import './Lp.css';

class Lp extends Component {
	render() {
		return <div>{this.fetchData(this.props.LearningPathID)}</div>;
	}

	fetchData(LearningPathID) {
		//TODO: API Call for info on the lp from database
		return (
			<container>
				<span className="lpInfo">
					<span>
						{/*Placeholder values for now*/ 'LearningPath'} "LearningPath Name here"
					</span>
          <div>Class 1: {'Example Class Name'} </div>
          <div>Class 2: {'Example Class Name'} </div>
				</span>

			</container>
		);
	}
}

export default Lp;
