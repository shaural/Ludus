import React, { Component } from 'react';
import ViewContent from './ViewContent';
import './LpOverview.css';

const Axios = require('axios');

class Class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      num: 0,
      name: '',
      content: '',
      time: 0,
      data: []
    };
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  componentDidMount() {
    Axios.get(
      `https://us-central1-ludusfire.cloudfunctions.net/classes/${
        this.props.ClassID
      }/info`
    ).then(({ data }) => {
      console.log(data);
      this.setState({
        data: data,
        name: data.Name,
        content: data.Content,
        time: data.Time,
        num: this.props.Num + 1
      });
    });
  }

  render() {
    return (
      <container>
        <div>
          <h3 align="left"> {this.state.name} </h3>
          <span> Class #{this.state.num}</span>
        </div>
        <div>
          <p align="left"> Time estimate: {this.state.time} minutes</p>
        </div>
        <button onClick={this.showModal}>View Content</button>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <ViewContent ContentID={this.props.ClassID} />
        </Modal>
      </container>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <br />
        <button onClick={handleClose}>Back</button>
      </section>
    </div>
  );
};

export default Class;
