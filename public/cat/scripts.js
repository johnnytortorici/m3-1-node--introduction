// Grab user message input
const messageInput = document.querySelector('#user-input');

// Grab chat content container
const conversationElem = document.querySelector('#conversation-container');

// Function to focus on chat input
const handleFocus = () => {
    messageInput.focus();
};

const sendMessage = (event) => {
    // prevent the default "page reload" from occurring.
    event.preventDefault();
    
    const message = { author: 'user', text: messageInput.value };
    updateConversation(message);

    // This is a 'GET' call to the /cat-message endpoint.
    fetch('/cat-message')
    .then((res) => res.json())
    .then((data) => {
        updateConversation(data.message);
    });
};

// updateConversation expects an object with 'user' and 'text'
const updateConversation = (message) => {
    // deconstruct the message object
    const { author, text } = message;
    // create a <p> element
    const messageElem = document.createElement('p');
    // add the text message to the element
    messageElem.innerHTML = `<span>${text}</span>`;
    // add a 'message' class and a class based on the author
    messageElem.classList.add('message', author);
    // append the element to the conversation
    conversationElem.appendChild(messageElem);
    // Scroll down as more messages appear
    conversationElem.scrollTop = conversationElem.scrollHeight;
    // Return focus to chat input after each message
    handleFocus();
    // Clear chat input after user clicks send (only for user messages)
    if (author === 'user') {
        messageInput.value = '';
    }
};

// Focus on chat input on initial page load
handleFocus();