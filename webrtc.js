const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messages = document.getElementById('messages');

// Create a new RTCPeerConnection
const peerConnection = new RTCPeerConnection();

// Create a new data channel
const dataChannel = peerConnection.createDataChannel('dataChannel');

// Handle incoming data channel messages
dataChannel.onmessage = (event) => {
  const message = event.data;
  const messageElement = document.createElement('p');
  messageElement.innerText = `Received: ${message}`;
  messages.appendChild(messageElement);
};

// Only enable the send button when the data channel is open
dataChannel.onopen = () => {
  sendButton.disabled = false;
};

// Create an offer and set the local description
peerConnection.createOffer()
  .then(offer => peerConnection.setLocalDescription(offer))
  .then(() => {
    // Set the remote description with the local description
    // This is simulating the exchange of offer and answer through a signaling server
    peerConnection.setRemoteDescription(peerConnection.localDescription);
  });

// Initially disable the send button
sendButton.disabled = true;

sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  dataChannel.send(message);

  const messageElement = document.createElement('p');
  messageElement.innerText = `Sent: ${message}`;
  messages.appendChild(messageElement);
});

