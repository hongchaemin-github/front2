const BACKEND_URL = 'http://http://34.236.9.92/:8080'; // 실제 백엔드 서버의 주소로 변경하세요

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("guestbook-form");
    const nameInput = document.getElementById("name");
    const messageInput = document.getElementById("message");
    const entriesDiv = document.getElementById("guestbook-entries");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = nameInput.value.trim();
        const message = messageInput.value.trim();

        if (name && message) {
            addEntry(name, message);
            nameInput.value = "";
            messageInput.value = "";

            // 백엔드 서버로 데이터 전송
            sendDataToBackend(name, message);
        }
    });

    function addEntry(name, message) {
        const entryDiv = document.createElement("div");
        entryDiv.classList.add("entry");

        const nameElem = document.createElement("div");
        nameElem.classList.add("name");
        nameElem.textContent = name;

        const messageElem = document.createElement("div");
        messageElem.classList.add("message");
        messageElem.textContent = message;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            entriesDiv.removeChild(entryDiv);
        });

        entryDiv.appendChild(nameElem);
        entryDiv.appendChild(messageElem);
        entryDiv.appendChild(deleteButton);

        entriesDiv.appendChild(entryDiv);
    }

    function sendDataToBackend(name, message) {
        const url = BACKEND_URL + '/api/guestbook';

        const data = { name: name, message: message };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }
});
