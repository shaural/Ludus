import React, { Component } from 'react';
import Lp from './Lp';
import LpCreateBtn from './LpCreateBtn';
import LpDeleteBtn from './LpDeleteBtn';
import LpEditBtn from './LpEditBtn';
import './lpPage.css';

const Axios =require('axios');

class LpPage extends Component {

	constructor(props){
	  super(props);
	  this.state = {
	    length: 10,
	    data: []
	  }
	}

	componentDidMount() {
	  Axios.get(`https://us-central1-ludusfire.cloudfunctions.net/users/-LNVWR9kD2dvN8GLGFYE/student/learningPaths/`)
	  .then(({ data }) => {
			console.log(data);
	    this.setState({
	      length: data.out.length
	    });
	  })
	}
	createLpPage = () => {
		//let lpIDList = []
		//TODO: Call API for lpIDs
		let learningPaths = [];

		//for (let i = 0; i < lpIDList.length; i++) {
		for (let i = 0; i < this.state.length; i++) {
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
