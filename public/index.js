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

function submitMessageGlobal(msg_object) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(msg_object)
    };
    fetch("/submit-message", options);
}

function updateCurrentMessages() {

    fetch("/get-current-messages").then(res => {
        var last_scroll_top = chat_box.scrollTop
        original_html = chat_box.innerHTML;
        chat_box.innerHTML = "";
        res.json().then(msg_objects => {
            for (i in msg_objects) {
                const msg_object = msg_objects[i];
                chat_box.innerHTML += `
                    <div class="msg">
                        <p class="msg-sender-txt">${msg_object.username}:</p>
                        <p class="msg-txt">${msg_object.message}</p>
                    </div>
                `
            }
            if (original_html !== chat_box.innerHTML) {
                // new messages
                chat_box.scrollTop = chat_box.scrollHeight;
            } else {
                chat_box.scrollTop = last_scroll_top;
            }
        });
    });
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
    // Send the message to the server
    submitMessageGlobal(msg_object);
    // Update the local message stream with the nessage
    //updateLocalMsgStream(msg_object);
}

setInterval(() => {
    updateCurrentMessages();
}, 500);

send_button.addEventListener("click", ev => {
    submitTypedMessage();
});

msg_input.addEventListener("keyup", ev => {
    if (ev.keyCode == 13) {
        submitTypedMessage();
    }
});