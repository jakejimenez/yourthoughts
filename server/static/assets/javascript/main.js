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
       document.getElementById('mainView').innerHTML = '';
       document.getElementById('mainView').innerHTML += '<h1 style="text-align: center; font-family:"CircularStdBold", sans-serif;" class="u-full-width" id="postkey">'+snapshot.key+'</h1>';
       document.getElementById('mainView').innerHTML += '<input class="u-full-width" type="text" value="'+snapshot.val().title+'" id="postTitle">'
       document.getElementById('mainView').innerHTML += '<textarea class="u-full-width" type="text" value="'+snapshot.val().post+'" id="post">'
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
    uid: '',
    htmlTitle: 'YourThoughts 💡'
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
          document.getElementById('mainView').innerHTML = '<input class="u-full-width" type="text" value="'+newPostId+'" id="postTitle">'
        }
      })
    },

    joinThought: function () {
      db.ref('thoughts/'+this.thoughtId).once('value', function(snapshot) {
        if (snapshot.hasChild('title')) {
          notie.alert(1, 'Success!' , 2)
          document.getElementById('mainView').innerHTML = '';
          document.getElementById('mainView').innerHTML = '<input class="u-full-width" type="text" value="'+snapshot.key+'" id="postTitle">'
        } else {
          notie.alert(3, 'Sorry, that does not exist.' , 2)
        }
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
