import React, { Component } from 'react';
import './index.css';
import './skeleton.min.css';

// Import npm modules
import * as firebase from 'firebase';
import * as Cookies from 'js-cookie';

class ThoughtView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      thoughtId: '',
      thoughtPost: '',
      thoughtAuthor: ''
    }
  }

  handleChange() {

  }

  joinThought() {

  }

  createThought() {
  }

  componentWillMount () {
    console.log('DOM will load...')
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="four columns"><p></p></div>
          <div className="four columns middlediv">
            {this.props.thoughtIdPiped}
          </div>
          <div className="four columns"><p></p></div>
        </div>
      </div>
    );
  }

  componentDidMount () {
    console.log('DOM has loaded at '+Date.now())
  }

}

export default ThoughtView;
