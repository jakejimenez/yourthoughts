// Initiate firebase
var config = {
   apiKey: "AIzaSyBDBhLFffiRMo-oBz9IWPwChdKBrZ7-AcM",
   authDomain: "yourthoughts-1726a.firebaseapp.com",
   databaseURL: "https://yourthoughts-1726a.firebaseio.com",
   storageBucket: "yourthoughts-1726a.appspot.com"
 };
 firebase.initializeApp(config);

 var db = firebase.database();

 onload = function() {
   var url = window.location.href.split('?=');
   db.ref('thoughts/'+url[1]).once('value', function(snapshot) {
     if (snapshot.hasChild('title')) {
       notie.alert(1, 'Success!' , 2)
       document.title = "YourThoughts 💡" + ' - ' + snapshot.key;
       document.getElementById('mainView').innerHTML = '';
       document.getElementById('mainView').innerHTML += '<div class="three columns"> <p></p> </div>'
       document.getElementById('mainView').innerHTML += '<div class="four columns"> <div style="margin: 0 auto; margin-top: 50%">'
       document.getElementById('mainView').innerHTML += '<input class="u-full-width" v-model="thoughtId" disabled type="text" value="'+snapshot.key+'">'
       document.getElementById('mainView').innerHTML += '<input class="u-full-width" v-model="thoughtTitle" type="text" value="'+snapshot.val().title+'" id="postTitle">'
       document.getElementById('mainView').innerHTML += '<textarea class="u-full-width" type="text" value="'+snapshot.val().post+'" id="post">'
       document.getElementById('mainView').innerHTML += '<input id="submitNewInfo" style="background-color: #FF1744; border-color: #FF1744;" v-on:click="submitNewInfo" class="button-primary u-full-width" type="submit" value="Update">'
       document.getElementById('mainView').innerHTML += '</div></div>'
       document.getElementById('mainView').innerHTML += '<div class="three columns"> <p></p> </div>'
     }
   });
 }

// Vue
var rootView = new Vue({
  el: '#root',
  data: {
    thoughtComments: {},
    thought: {},
    thoughtTitle: '',
    thoughtAuthor: '',
    thoughtId: '',
    thoughtPost: '',
    uid: ''
  },
  methods: {
    createThought: function () {
      var newPostId = this.thoughtId;
      db.ref('thoughts/'+this.thoughtId).once('value', function(snapshot) {
        if (snapshot.hasChild('title')) {
          notie.alert(3, snapshot.key+' already exists...' , 2)
        } else {
          Cookies.set('thoughtId', newPostId);
          db.ref('thoughts/'+newPostId).set({
            title: '',
            titleCanBeChanged: true,
            postCanBeChange: true,
            post: '',
            author: '',
            comments: {}
          });
          notie.alert(1, 'Success!', 2)
          document.getElementById('mainView').innerHTML = '';
          db.ref('thoughts/'+newPostId).once('value', function(snapshot) {
            document.title = "YourThoughts 💡" + ' - ' + snapshot.key;
            document.getElementById('mainView').innerHTML = '';
            document.getElementById('mainView').innerHTML += '<div class="three columns"> <p></p> </div>'
            document.getElementById('mainView').innerHTML += '<div class="four columns"> <div style="margin: 0 auto; margin-top: 50%">'
            document.getElementById('mainView').innerHTML += '<input class="u-full-width" v-model="thoughtId" disabled type="text" value="'+snapshot.key+'">'
            document.getElementById('mainView').innerHTML += '<input class="u-full-width" v-model="thoughtTitle" type="text" value="'+snapshot.val().title+'" id="postTitle">'
            document.getElementById('mainView').innerHTML += '<textarea class="u-full-width" type="text" value="'+snapshot.val().post+'" id="post">'
            document.getElementById('mainView').innerHTML += '<input id="submitNewInfo" style="background-color: #FF1744; border-color: #FF1744;" v-on:click="submitNewInfo" class="button-primary u-full-width" type="submit" value="Update">'
            document.getElementById('mainView').innerHTML += '</div></div>'
            document.getElementById('mainView').innerHTML += '<div class="three columns"> <p></p> </div>'
          })
        }
      })
    },

    joinThought: function () {
      db.ref('thoughts/'+this.thoughtId).once('value', function(snapshot) {
        if (snapshot.hasChild('title')) {
          notie.alert(1, 'Success!' , 2)
          document.title = "YourThoughts 💡" + ' - ' + snapshot.key;
          document.getElementById('mainView').innerHTML = '';
          document.getElementById('mainView').innerHTML += '<div class="three columns"> <p></p> </div>'
          document.getElementById('mainView').innerHTML += '<div class="four columns"> <div style="margin: 0 auto; margin-top: 50%">'
          document.getElementById('mainView').innerHTML += '<input class="u-full-width" v-model="thoughtId" disabled type="text" value="'+snapshot.key+'">'
          document.getElementById('mainView').innerHTML += '<input class="u-full-width" v-model="thoughtTitle" type="text" value="'+snapshot.val().title+'" id="postTitle">'
          document.getElementById('mainView').innerHTML += '<textarea class="u-full-width" type="text" value="'+snapshot.val().post+'" id="post">'
          document.getElementById('mainView').innerHTML += '<input id="submitNewInfo" style="background-color: #FF1744; border-color: #FF1744;" v-on:click="submitNewInfo" class="button-primary u-full-width" type="submit" value="Update">'
          document.getElementById('mainView').innerHTML += '</div></div>'
          document.getElementById('mainView').innerHTML += '<div class="three columns"> <p></p> </div>'
        } else {
          notie.alert(3, 'Sorry, that does not exist.' , 2)
        }
      })
    },

    submitNewInfo: function () {
      var postId = this.thoughtId
      var newTitle = this.thoughtTitle
      db.ref('thoughts/'+this.thoughtId).once('value', function(snapshot) {
          db.ref('thoughts/'+postId).set({
            title: newTitle,
            titleCanBeChanged: true,
            postCanBeChange: true,
            post: '',
            author: '',
            comments: {}
          });
      })
    },

    signInGoogle: function () {

    },

    signInEmail: function () {

    },

    signInAnon: function () {

    }
  }
});

// Functions
