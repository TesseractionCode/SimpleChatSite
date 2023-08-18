const username_input = document.querySelector("#username-input");
const msg_input = document.querySelector("#msg-input");
const send_button = document.querySelector("#send-button");
const chat_box = document.querySelector("#chat-box");

function updateLocalMsgStream(msg_object) {
    chat_box.innerHTML += `
            <div class="msg">
                <p class="msg-sender-txt">${msg_object.username}:</p>
                <p class="msg-txt">${msg_object.message}</p>
            </div>
    `;
}

function submitTypedMessage() {
    const username = username_input.value;
    const message = msg_input.value;
    // Cancel if the username or message is empty
    if (!username || !message) {
        if (!username) {alert("Username Required");}
        return;
    }
    // Get a message object from the data
    const current_time = Date.now();
    const msg_object = {
        username: username,
        message: message,
        time: current_time
    };
    // Clear the message input
    msg_input.value = "";
    // Update the local message stream with the nessage
    updateLocalMsgStream(msg_object);
}

send_button.addEventListener("click", ev => {
    submitTypedMessage();
});

msg_input.addEventListener("keyup", ev => {
    if (ev.keyCode == 13) {
        submitTypedMessage();
    }
});