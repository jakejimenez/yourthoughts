import React, { Component } from 'react';
import './style.css';

// Make sure these paths are correct.
import './skeleton.min.css';

// Import npm modules
import * as firebase from 'firebase';
import * as Cookies from 'js-cookie';
import * as Push from 'push.js';

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
     this.handlePostPress = this.handlePostPress.bind(this);
   }

   handleChange() {
     var textareaPost = document.getElementById('thoughtPost').value;
     this.setState({updatedPost: textareaPost});
   }

   handlePostPress(e) {
   if (e.key === 'Enter') {
     console.log(e.key)
     this.changePost()
   }
 }

   changePost() {
     var self = this;
     db.ref('thoughts/'+self.props.thoughtIdPiped).once('value', (snapshot) => {
       if (snapshot.hasChild('post')) {
         db.ref('thoughts/'+self.props.thoughtIdPiped+'/post').set(self.state.updatedPost)
         Push.create(self.props.thoughtIdPiped, {
           body: 'Your post has been updated.',
           icon: 'https://cdn3.iconfinder.com/data/icons/brain-games/1042/Brain-Games.png',
           timeout: 6000
         })
       } else {
         Push.create(self.props.thoughtIdPiped, {
           body: 'An error occured...',
           icon: 'https://cdn3.iconfinder.com/data/icons/brain-games/1042/Brain-Games.png',
           timeout: 6000
         })
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
         console.log(snapshot.val().post)
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
               <textarea id="thoughtPost" onChange={this.handleChange} onKeyPress={this.handlePostPress} wrap="soft" className="post" defaultValue={this.state.thoughtPost}/>
               <input className="button-primary u-full-width" type="submit" value="Update Post" onClick={this.changePost} />
             </div>
             <div className="six columns middlediv">
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
               <textarea wrap="soft" disabled className="post" value={this.state.thoughtPost}/>
             </div>
             <div className="six columns middlediv"><p></p></div>
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
      comments: [],
      newComment: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.addComment = this.addComment.bind(this);
    this.handleNewComment = this.handleNewComment.bind(this);
  }

  handleNewComment(comment) {
    console.log(comment.text);
  }

  componentWillMount() {
    var self = this;
    db.ref('thoughts/'+self.props.thoughtIdPiped).once('value', (snapshot) => {
      if (snapshot.hasChild('comments')) {
        self.setState({
          comments: JSON.parse(snapshot.val().comments)
        })
      } else (
        Push.create('Awww', {
          body: 'There are no comments for this post',
          icon: 'https://cdn3.iconfinder.com/data/icons/brain-games/1042/Brain-Games.png',
          timeout: 6000
        })
      )
    })
  }

  handleChange() {
    var {comments} = this.state;

    var commentData = document.getElementById('commentInput').value;
    this.setState({
      newComment: commentData
    })
  }

  addComment() {

  }

  render () {
    var {comments} = this.state;
    var self = this;
    return (
      <div>
        <h3 className="title-thoughtview">Add Comment</h3>
          <textarea id="commentInput" onChange={this.handleChange} className="comments-box" />
          <input className="button-primary u-full-width" type="submit" onClick={this.addComment} value="Post Comment"/>
          <br/>
          <br/>
        <h3 className="title-thoughtview">Comments: {comments.comments}</h3>
          <br/>

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
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange() {
    var inputIdData = document.getElementById('idInput').value;
    this.setState({thoughtId: inputIdData});

    var inputNameData = document.getElementById('idNameInput').value;
    this.setState({vanityName: inputNameData});
  }

  handleKeyPress(e) {
  if (e.key === 'Enter') {
    console.log(e.key)
    this.joinThought()
  }
}

  joinThought() {
    var self = this;
    var {thoughtId, rerender} = this.state;
    //Cookies.set('thoughtId', thoughtId)
    db.ref('thoughts/'+this.state.thoughtId).once('value', function(snapshot) {
      if (snapshot.hasChild('title')) {
        Push.create(snapshot.key, {
          body: 'It exists!',
          icon: 'https://cdn3.iconfinder.com/data/icons/brain-games/1042/Brain-Games.png',
          timeout: 6000
        })
        self.setState({
          rerender: true,
          thoughtAuthor: snapshot.val().author
        })
      } else {
        Push.create(snapshot.key, {
          body: snapshot.key+' doesn\'t exist.',
          icon: 'https://cdn3.iconfinder.com/data/icons/brain-games/1042/Brain-Games.png',
          timeout: 6000
        })
      }
    })
  }

  createThought() {
    var self = this;
    var {thoughtId, rerender} = this.state;
    db.ref('thoughts/'+this.state.thoughtId).once('value', function(snapshot) {
      if (snapshot.hasChild('title')) {
        Push.create(snapshot.key, {
          body: 'Already exists!',
          icon: 'https://cdn3.iconfinder.com/data/icons/brain-games/1042/Brain-Games.png',
          timeout: 6000
        })
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
        Push.create(thoughtId, {
          body: 'It has been created!',
          icon: 'https://cdn3.iconfinder.com/data/icons/brain-games/1042/Brain-Games.png',
          timeout: 6000
        })
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
                <input value={this.state.thoughtId} onChange={this.handleChange} className="id-input u-full-width" type="text" placeholder="#ID" id="idInput" onKeyPress={this.handleKeyPress}/>
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
