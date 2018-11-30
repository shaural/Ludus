import React, { Component } from 'react';
import Class from './Class';
import './LpOverview.css'
const Axios = require('axios');

class LpOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      length: 0,
      topic: 'no topic',
      ownerid: '',
      name: 'error',
      ownername: '',
      data: [],
      userdata: []
    };
  }

getOwnerInfo() {
  Axios.get(`https://us-central1-ludusfire.cloudfunctions.net/users/${this.state.ownerid}/`)
  .then(({ data }) => {
    console.log(data);
    this.setState({
        userdata: data,
        ownername: data.Name
    });
  });

}

componentDidMount() {
	 Axios.get(`https://us-central1-ludusfire.cloudfunctions.net/learningPath/-LQ1SMJladZM5nJ52mDP`)
   .then(({ data }) => {
      console.log(data);
      this.setState({
        data: data,
        name: data.Name,
        length: data.Classes.length,
        topic: data.Topic,
        ownerid: data.Owner
			 });
       this.getOwnerInfo();
	  });
	}

  createClasses = () => {

  	let classes = [];
  	var y = this.state.length;

  	for (let i = 0; i < y; i++) {

  		classes.push(
  			<div className="classObject">
  				<Class ClassID={this.state.data.Classes[i]} Num={i} LpID="-LQ1SMJladZM5nJ52mDP" UserID={this.props.UserID}/>
  				<span className="Placeholder">
  				</span>
  			</div>
  		);

  	}
  	if(!y){
  		classes.push(
  			<text>"No classes in the Learning Path yet" </text>
  		);
  	}
  	return classes;
  };



  render() {
    return (
      <main>
        <h1><b>{this.state.name}</b></h1>
        <p>Topic: {this.state.topic} </p> <p> Learning Path By: {this.state.userdata.Name}</p>
        <hr />
        <div> {this.createClasses()}</div>
      </main>
    );
  }

}

export default LpOverview;
