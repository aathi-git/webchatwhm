// Initialize Firebase with your config
var firebaseConfig = {
    apiKey: "AIzaSyChjwx3VMM3KB2g7RpVYVygUq_ihYDpLMY",
    authDomain: "constant-haven-321409.firebaseapp.com",
    projectId: "constant-haven-321409",
    storageBucket: "constant-haven-321409.appspot.com",
    messagingSenderId: "357288103616",
    appId: "1:357288103616:web:3eb5638c69a058bd556725"
  };
  firebase.initializeApp(firebaseConfig);
  
  $(document).ready(function() {
    const chatScreen = document.getElementById('chat-screen');
    const loginScreen = document.getElementById('login-screen');
    const messageInput = document.getElementById('message');
    const sendButton = document.getElementById('send');
    const loginButton = document.getElementById('login');
  
    const userIdInput = document.getElementById('user-id');
  
    loginButton.addEventListener('click', () => {
      const userId = userIdInput.value;
      if (userId) {
        // Authenticate the user (you would need to implement this)
        // Once authenticated, show the chat screen and hide the login screen
        chatScreen.style.display = 'block';
        loginScreen.style.display = 'none';
  
        // Start listening for new messages
        startListeningForMessages(userId);
      }
    });
  
    sendButton.addEventListener('click', () => {
      const message = messageInput.value;
      if (message) {
        const userId = userIdInput.value;
        sendMessage(userId, message);
        messageInput.value = '';
      }
    });
  
    // Function to append a message to the chat
    function appendMessage(user, message) {
      const messageElement = document.createElement('div');
      messageElement.innerHTML = `<strong>${user}:</strong> ${message}`;
      chat.appendChild(messageElement);
    }
  
    // Function to send a message to Firebase
    function sendMessage(user, message) {
      // Push the message to Firebase (you would need to implement this)
      // Sample implementation:
      const messagesRef = firebase.database().ref('messages');
      messagesRef.push({
        user: user,
        message: message
      });
    }
  
    // Function to start listening for new messages
    function startListeningForMessages(userId) {
      const messagesRef = firebase.database().ref('messages');
  
      messagesRef.on('child_added', function(snapshot) {
        const messageData = snapshot.val();
        appendMessage(messageData.user, messageData.message);
      });
    }
  });
  