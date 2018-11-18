import React, { Component } from 'react';

class PageofLp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      owner: '',
      lpID: '-LO0Mk238mCqz4fbfMjh',
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
    //Get individual LP
    Axios.get(
      `https://us-central1-ludusfire.cloudfunctions.net/learningPath/${
        this.state.lpID
      }`
    ).then(({ data }) => {
      console.log(data);
      this.setState({
        length: data.length,
        data: data
      });
    });
  }
  render() {
    return (
      <h3> {this.state.name} </h3>
      //create classes based on amount w/h view buttons
    );
  }
}

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
export default PageofLp;
