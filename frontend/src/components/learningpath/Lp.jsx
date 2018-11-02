import React, { Component } from 'react';
import './Lp.css';

class Lp extends Component {
	render() {
		return <div>{this.fetchData(this.props.LearningPathID)}</div>;
	}

	fetchData(LearningPathID) {
		var index = this.props.i;
		var obj = JSON.parse(JSON.stringify(this.props.LearningPathID));
		console.log(index)
		console.log(obj[index]);
		//TODO: API Call for info on the lp from database
		return (
			<container>
				<span className="lpInfo">
					<span>
						{'LearningPath'}
					</span>
          <div>Class 1: {'Example Class Name'} </div>
          <div>Class 2: {'Example Class Name'} </div>
				</span>

			</container>
		);
	}
}

export default Lp;
