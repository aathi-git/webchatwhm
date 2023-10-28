var currentUserID;
var currentRoomID;
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

  $('#logout').click(function() {
    // Log out the user and clear their local storage
    currentUserID = null;
    localStorage.removeItem('user_id');
    $('#chat-screen').hide();
    $('#login-screen').show();
  });

  $('#connect').click(function() {
    const roomID = $('#search-room').val();
    if (roomID && roomID.length === 6) {
      currentRoomID = roomID;
      $('#room-search').hide();
      $('#chat-section').show();
      displayMessages(currentRoomID);
    }
  });

  $('#send').click(function() {
    const message = $('#message').val();
    if (message) {
      sendMessage(currentUserID, currentRoomID, message);
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

function sendMessage(user, roomID, message) {
  const chatRef = database.ref('rooms/' + roomID);
  chatRef.push({
    user: user,
    message: message
  });
}

function displayMessages(roomID) {
  const chatRef = database.ref('rooms/' + roomID);
  chatRef.on('child_added', function(snapshot) {
    const messageData = snapshot.val();
    appendMessage(messageData.user, messageData.message);
  });
}

function appendMessage(user, message) {
  $('#chat').append(`<strong>${user}:</strong> ${message}<br>`);
}
