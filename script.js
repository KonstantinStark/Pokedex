


function init() {
    fetchDataText();
}

async function fetchDataText() {
    let response = await fetch('');

    let responseAsText = await response.json();
    console.log(responseAsText);

    let htmlContent = document.getElementById('content');
    for (let index = 0; index < responseAsText.length; index++) {
        let element = responseAsText[index];
        htmlContent.innerHTML += /*html*/`
        <div class="gotChars">
            <h1>${element.fullName}</h1>
            <h2>${element.title}</h2>
        </divY>
    `
    }
}