import React, { Component } from 'react';
import './style.css';

// Make sure these paths are correct.
import './skeleton.min.css';
import './sweetalert2.min.css';

// Import npm modules
import * as firebase from 'firebase';
import * as Cookies from 'js-cookie';
import { default as swal } from 'sweetalert2';

// Setup
var config = {
   apiKey: "AIzaSyBDBhLFffiRMo-oBz9IWPwChdKBrZ7-AcM",
   authDomain: "yourthoughts-1726a.firebaseapp.com",
   databaseURL: "https://yourthoughts-1726a.firebaseio.com",
   storageBucket: "yourthoughts-1726a.appspot.com"
 };
 firebase.initializeApp(config);

 var db = firebase.database();

// Functions
function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

// Setup
if (Cookies.get('uid') === null || Cookies.get('uid') === undefined || Cookies.get('uid') == null || Cookies.get('uid') === '') {
  Cookies.set('uid', makeid());
  console.log(Cookies.get('uid'))
  db.ref('users/'+Cookies.get('uid')).set({
    name: ''
  })
}

 // Components
 class ThoughtView extends Component {

   constructor(props) {
     super(props);

     this.state = {
       thoughtId: '',
       thoughtPost: '',
       thoughtAuthor: '',
       updatedPost: '',
       thoughtComments: {}
     }

     this.handleChange = this.handleChange.bind(this);
     this.changePost = this.changePost.bind(this);
   }

   handleChange() {
     var textareaPost = document.getElementById('thoughtPost').value;
     this.setState({updatedPost: textareaPost});
   }

   changePost() {
     var self = this;
     db.ref('thoughts/'+self.props.thoughtIdPiped).once('value', (snapshot) => {
       if (snapshot.hasChild('post')) {
         db.ref('thoughts/'+self.props.thoughtIdPiped+'/post').set(self.state.updatedPost)
       } else {
         swal(
             'Awww!',
             'Some sort of error occured.',
             'error'
             )
       }
     })
   }

   componentWillMount () {
     console.log('DOM will load...')

     var self = this;

     db.ref('thoughts/'+self.props.thoughtIdPiped).once('value', (snapshot) => {
       if (snapshot.hasChild('post')) {
         self.setState({
           thoughtPost: snapshot.val().post
         })
       } else {
         self.setState({
           thoughtPost: 'This post has no content...'
         })
       }

       if (snapshot.hasChild('comments')) {
         self.setState({
           thoughtComments: {}
         })
         console.log(self.state.comments)
       } else {
         self.setState({
           thoughtComments: snapshot.val().comments
         })
       }

       if (snapshot.hasChild('author')) {
         self.setState({
           thoughtAuthor: snapshot.val().author
         })
         db.ref('users/'+snapshot.val().author).once('value', (snapshot) => {
           if (snapshot.hasChild('name')) {
             self.setState({
               vanityName: snapshot.val().name
             })
           } else {
             vanityName: 'This user has no username.'
           }
         })
       }
     })
   }

   addComment() {

   }

   render() {

     if (this.state.thoughtAuthor === Cookies.get('uid')) {
       // Render thought view.
       return (
         <div className="container">
           <div className="row">
             <div className="six columns middlediv">
               <h3 className="title-thoughtview">{this.props.thoughtIdPiped}</h3>
               <h4 className="author">by {this.state.vanityName} ({this.props.thoughtAuthorPiped})</h4>
               <br />
               <textarea id="thoughtPost" onChange={this.handleChange} wrap="soft" className="post">{this.state.thoughtPost}</textarea>
               <input className="button-primary u-full-width" type="submit" value="Update Post" onClick={this.changePost} />
             </div>
             <div className="six columns">
              <CommentView thoughtId={this.props.thoughtIdPiped} />
             </div>
           </div>
         </div>
       );
     } else {
       return (
         <div className="container">
           <div className="row">
             <div className="six columns middlediv">
               <h3 className="title-thoughtview">{this.props.thoughtIdPiped}</h3>
               <h4 className="author">by {this.state.vanityName} ({this.props.thoughtAuthorPiped})</h4>
               <br />
               <textarea wrap="soft" disabled className="post">{this.state.thoughtPost}</textarea>
             </div>
             <div className="six columns"><p></p></div>
           </div>
         </div>
       )
     }
   }

   componentDidMount () {
     console.log('DOM has loaded at '+Date.now())
   }

 }

class CommentView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      comments: {}
    }
  }

  /*componentWillMount() {
    var self = this;
    db.ref('thoughts/'+self.props.thoughtIdPiped).once('value', (snapshot) => {
      console.log(snapshot.val(''))
      if (snapshot.hasChild('comment')) {
        self.setState({
          comments: snapshot.val().comment
        })
      } else {
        self.setState({
          comments: {comments:0}
        })
      }
    })
  }*/

  render () {
    var {comments} = this.state;
    return (
      <div>
        <br />
        <h3 className="title-thoughtview">Comments: {comments.comments}</h3>
        <ul>
        {
          Object.keys(comments).forEach((key) => {
            console.log(comments)
            return (
              <li>{key}</li>
            )
          })
        }
        </ul>
      </div>
    );
  }
}

class MainView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      vanityName: '',
      thoughtId: '',
      thoughtAuthor: '',
      thoughtPost: '',
      thoughtComments: {},
      rerender: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.joinThought = this.joinThought.bind(this);
    this.createThought = this.createThought.bind(this);
    this.changeName = this.changeName.bind(this);
  }

  handleChange() {
    var inputIdData = document.getElementById('idInput').value;
    this.setState({thoughtId: inputIdData});

    var inputNameData = document.getElementById('idNameInput').value;
    this.setState({vanityName: inputNameData});
  }

  joinThought() {
    var self = this;
    var {thoughtId, rerender} = this.state;
    //Cookies.set('thoughtId', thoughtId)
    db.ref('thoughts/'+this.state.thoughtId).once('value', function(snapshot) {
      if (snapshot.hasChild('title')) {
        swal(
            'Success!',
            snapshot.key + ' does exist!',
            'success'
            )
        self.setState({
          rerender: true,
          thoughtAuthor: snapshot.val().author
        })
      } else {
        swal(
            'Awww!',
            snapshot.key + ' does not exist!',
            'error'
            )
      }
    })
  }

  createThought() {
    var self = this;
    var {thoughtId, rerender} = this.state;
    db.ref('thoughts/'+this.state.thoughtId).once('value', function(snapshot) {
      if (snapshot.hasChild('title')) {
        swal(
            'Aww!',
            snapshot.key + ' already exists!',
            'error'
            )
      } else {
        Cookies.set('thoughtId', thoughtId);
        db.ref('thoughts/'+thoughtId).set({
          title: '',
          titleCanBeChanged: true,
          postCanBeChange: true,
          post: '',
          author: Cookies.get('uid'),
          comments: {}
        });
        self.setState({
          rerender: true,
          thoughtAuthor: Cookies.get('uid')
        })
        swal(
            'Success!',
            thoughtId + ' has now been created!',
            'success'
            )
      }
    })
  }

  changeName () {
    var {vanityName} = this.state;
    db.ref('users/'+Cookies.get('uid')).set({
      name: vanityName
    })
  }

  componentWillMount () {
    console.log('DOM will load...')
  }

  render() {
      if (this.state.rerender) {
        return (
          <ThoughtView thoughtIdPiped={this.state.thoughtId} thoughtAuthorPiped={this.state.thoughtAuthor}/>
        )
      } else {
        return (
          <div className="container">
            <div className="row">
              <div className="four columns"><p></p></div>
              <div className="four columns middlediv">
                <h3 className="middlediv-title"><span className="first-part-title">Your</span><span className="second-part-title">Thoughts</span> 💡</h3>
                <input value={this.state.thoughtId} onChange={this.handleChange} className="id-input u-full-width" type="text" placeholder="#ID" id="idInput" />
                <div className="row">
                  <div className="six columns">
                    <input id="navToId" className="button-primary u-full-width navToId-button" type="submit" value="Enter" onClick={this.joinThought} />
                  </div>
                  <div id="createThoughtDiv" className="six columns">
                    <input id="createNewThought" className="button-primary u-full-width purple-button" type="submit" value="Create" onClick={this.createThought} />
                  </div>
                  <input value={this.state.vanityName} onChange={this.handleChange} className="id-input u-full-width" type="text" placeholder="gaben" id="idNameInput" />
                  <input className="button-primary u-full-width" type="submit" value="Change Name" onClick={this.changeName} />
                </div>
              </div>
              <div className="four columns"><p></p></div>
            </div>
          </div>
        );
      }
  }

  componentDidMount () {
    console.log('DOM has loaded at '+Date.now())
  }

}

export default MainView;
