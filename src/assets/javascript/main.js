// Initiate firebase
var config = {
   apiKey: "AIzaSyBDBhLFffiRMo-oBz9IWPwChdKBrZ7-AcM",
   authDomain: "yourthoughts-1726a.firebaseapp.com",
   databaseURL: "https://yourthoughts-1726a.firebaseio.com",
   storageBucket: "yourthoughts-1726a.appspot.com"
 };
 firebase.initializeApp(config);

// Vue
var mainView = new Vue({
  el: '#root',
  data: {
    comments: {},
    post: {},
    postAuthor: '',
    postId: ''
  },
  methods: {
    createThought: function () {

    },

    joinThought: function () {

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
