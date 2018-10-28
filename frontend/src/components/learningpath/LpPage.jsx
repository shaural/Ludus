import React, { Component } from 'react';
import Lp from './Lp';
import LpCreateBtn from './LpCreateBtn';
import LpDeleteBtn from './LpDeleteBtn';
import LpEditBtn from './LpEditBtn';
import './lpPage.css';

class LpPage extends Component {
	createLpPage = () => {
		//let lpIDList = []
		//TODO: Call API for lpIDs
		let learningPaths = [];

		//for (let i = 0; i < lpIDList.length; i++) {
		for (let i = 0; i < 4; i++) {
			learningPaths.push(

				<div className="lpObject">
					{<Lp LearningPathID={i /* lpIDList[i] */} />}
					<span className="Placeholder">
						{<LpEditBtn />} <text> </text> {<LpDeleteBtn />}
					</span>
				</div>
			);
		}

		return learningPaths;
	};

	render() {
		return (
			<div>
			<div> {<LpCreateBtn />} </div>
			<div className="LpPage">{this.createLpPage()}</div>;
			</div>
		)
	}
}

export default LpPage;
