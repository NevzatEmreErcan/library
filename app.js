const tBody_table = document.querySelector("tbody");
const form = document.querySelector("form")
const dialog_div = document.querySelector(".dialog");
const add_btn = document.querySelector(".add-btn");
const close_btn = document.querySelector(".close-btn")
const deleteAll_btn = document.querySelector(".delete>button")

let library = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addToLibrary(book) {
    library.push(book)
}

function addToTable(book) {
    const newRow = document.createElement("tr");

    for (let prop in book) {
        const newData = document.createElement("td");
        newData.innerHTML = book[prop];
        newRow.appendChild(newData);
    }

    statusColumnsRevisory(newRow);

    addDeleteButton(newRow, book);

    tBody_table.appendChild(newRow)
}

function statusColumnsRevisory(row) {
    const statusData = row.querySelector(":nth-child(4)");
    statusData.classList.add("status-checkbox")
    let isTrue;
    
    if (statusData.innerHTML === "true") {
        statusData.innerHTML = "&#9745"; // Checked symbol
        isTrue = true;
    } else if (statusData.innerHTML === "false") {
        statusData.innerHTML = "&#9744"; // Unchecked symbol
        isTrue = false;
    }
    
    statusData.addEventListener("click", () => {
        if (isTrue) {
            statusData.innerHTML = "&#9744"; // Unchecked symbol
            isTrue = false;
        } else {
            statusData.innerHTML = "&#9745"; // Checked symbol
            isTrue = true
        }
    })
}

function addDeleteButton(row, book) {
    const newData = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("close-btn");
    deleteBtn.innerHTML = "&#10005"
    newData.appendChild(deleteBtn);
    row.appendChild(newData);

    deleteBtn.addEventListener("click", () => {
        const bookIndex = library.indexOf(book);
        if ( bookIndex !== -1) {
            library.splice(bookIndex, 1)
        }
        row.remove();
    })
}

add_btn.addEventListener("click", () => {
    dialog_div.classList.remove("hidden")
})

close_btn.addEventListener("click", () => {
    dialog_div.classList.add("hidden")
})

deleteAll_btn.addEventListener("click", () => {
    library = [];
    tBody_table.innerHTML = "";
})

form.addEventListener("submit", () => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const status = document.getElementById("status").checked;

    const newBook = new Book(title, author, pages, status);


    addToLibrary(newBook);
    addToTable(newBook)

    dialog_div.classList.add("hidden")
    form.reset();
});