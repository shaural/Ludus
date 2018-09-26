import React, { Component } from 'react';

class Class extends Component {
    state = { 
        ClassName: 0,
        LearningPath: 0,
        ContentType: 0,
        Tags: 0,
        Rating: 0
    };

    render(ClassID) { 
        this.fetchData(ClassID);
        return (
            <div>
                <span>{this.state.ClassName}</span>
                <span>{this.state.LearningPath}</span>
                <span>{this.state.ContentType}</span>
                <span>{this.state.Tags}</span>
                <button>Edit</button>
            </div>
        );
    }

    fetchData(ClassID) {
        //TODO when API
    }

}
 
export default Class;