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
});