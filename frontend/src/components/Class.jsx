import React, { Component } from 'react';

class Class extends Component {

    render(ClassID) { 
        this.fetchData(ClassID);
        return (
            <div>
                
                <button>Edit</button>
            </div>
        );
    }

    fetchData(ClassID) {
        //API Call for info on the class from database
        return (
            <div>
                <span>{/* name */}</span>
                <span>{/* lp */}</span>
                <span>{/* ct */}</span>
                <span>{/* rating */}</span>
            </div>
        );
    }

}
 
export default Class;