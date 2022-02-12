const table = document.querySelector("#imagesTable");
let images = [];
let availableNumbers = [];
let meetingsImages = [];

for (let i = 0; i < 9; i++) {
    availableNumbers.push(i);
}

for (let i = 0; i < 3; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 3; j++) {
        const cell = document.createElement("td");
        const image = document.createElement("img");
        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        const randomNumber = availableNumbers[randomIndex];
        availableNumbers.splice(randomIndex, 1);
        console.log(randomNumber);
        const imageName = `images/party0${randomNumber}_200px.jpg`;
        image.classList.add("captchaImage");
        image.src = imageName;
        image.onclick = imageClicked;
        image.clicked = false;
        images.push(image);
        if ([3, 4, 5, 7].includes(randomNumber)) {
            meetingsImages.push(image);
        }
        cell.appendChild(image);
        row.appendChild(cell);
    }
    table.appendChild(row);
}

document.querySelector("#verify").onclick = verify;

function arraysEqual(arr1, arr2) {
    if (arr1.length != arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) {
            return false;
        }
    }
    return true;
}

function imageClicked() {
    console.log(this);
    if (this.clicked) {
        this.checkboxDiv.remove();
        this.style.width = "100%";
        this.style.height = "100%";
        this.clicked = false;
    } else {
        const checkboxDiv = document.createElement("div");
        checkboxDiv.classList.add("checkbox");
        const checkmark = document.createElement("img");
        checkmark.classList.add("checkmark");
        checkmark.src = "checkmark.svg";
        checkboxDiv.appendChild(checkmark);

        this.parentElement.appendChild(checkboxDiv);
        this.style.width = "75%";
        this.style.height = "75%";
        this.clicked = true;
        this.checkboxDiv = checkboxDiv;
    }
}

function verify() {
    let selectedImages = [];
    images.forEach((image) => {
        if (image.clicked) {
            selectedImages.push(image);
        }
    });
    selectedImages.sort();
    meetingsImages.sort();
    if (!arraysEqual(selectedImages, meetingsImages)) {
        console.log(document.querySelector("#incorrectMessage"));
        document.querySelector("#incorrectMessage").style.display = "block";
    } else {
        const main = document.querySelector("main");
        main.innerHTML = "";
        const successfulDiv = document.createElement("div");
        successfulDiv.id = "successfulDiv";
        const checkmark = document.createElement("img");
        checkmark.src = "checkmark.svg";
        checkmark.id = "successfulCheckmark";
        successfulDiv.appendChild(checkmark);
        main.appendChild(successfulDiv);
    }
}
