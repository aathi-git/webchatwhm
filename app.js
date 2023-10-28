var currentUserID;
var targetUserID;
var database;

const firebaseConfig = {
    apiKey: "AIzaSyChjwx3VMM3KB2g7RpVYVygUq_ihYDpLMY",
    authDomain: "constant-haven-321409.firebaseapp.com",
    projectId: "constant-haven-321409",
    storageBucket: "constant-haven-321409.appspot.com",
    messagingSenderId: "357288103616",
    appId: "1:357288103616:web:3eb5638c69a058bd556725"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

$(document).ready(function() {
  database = firebase.database();
  
  // Check if the user is already logged in
  currentUserID = localStorage.getItem('user_id');
  if (currentUserID) {
    showChatScreen(currentUserID);
  }

  $('#register').click(function() {
    const userName = $('#user-name').val();
    if (userName) {
      currentUserID = generateUniqueID();
      localStorage.setItem('user_id', currentUserID);
      showChatScreen(currentUserID);
    }
  });

  $('#login').click(function() {
    const userName = $('#user-name').val();
    if (userName) {
      currentUserID = generateUniqueID();
      localStorage.setItem('user_id', currentUserID);
      showChatScreen(currentUserID);
    }
  });

  $('#connect').click(function() {
    const searchUserID = $('#search-user').val();
    if (searchUserID && searchUserID !== currentUserID) {
      targetUserID = searchUserID;
      $('#search-screen').hide();
      $('#chat-section').show();
      displayMessages(currentUserID, targetUserID);
    }
  });

  $('#send').click(function() {
    const message = $('#message').val();
    if (message) {
      sendMessage(currentUserID, targetUserID, message);
      $('#message').val('');
    }
  });
});

function generateUniqueID() {
  const timestamp = new Date().getTime();
  return `User${timestamp}`;
}

function showChatScreen(user) {
  $('#login-screen').hide();
  $('#chat-screen').show();
  $('#user-id-display').text(user);
}

function sendMessage(user, targetUser, message) {
  const chatRef = database.ref('chats/' + user + '-' + targetUser);
  chatRef.push({
    user: user,
    message: message
  });
}

function displayMessages(user, targetUser) {
  const chatRef = database.ref('chats/' + user + '-' + targetUser);
  chatRef.on('child_added', function(snapshot) {
    const messageData = snapshot.val();
    appendMessage(messageData.user, messageData.message);
  });
}

function appendMessage(user, message) {
  $('#chat').append(`<strong>${user}:</strong> ${message}<br>`);
}
