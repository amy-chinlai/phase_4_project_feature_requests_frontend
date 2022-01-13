const endpoint = "http://localhost:7000/api/v1/requests"

document.addEventListener('DOMContentLoaded', () => {
    console.log("The DOM has loaded");
    getRequests()

    const createRequestForm = document.querySelector("#request-form")

    createRequestForm.addEventListener("submit", (e) => createRequestFormHandler(e))
});

function getRequests() {
    fetch(endpoint)
    .then (function(response) {
        return response.json()
    })
    .then(requests => {
        requests.data.forEach(request => {
            renderRequest(request.attributes)
        })
    })
};



function postFetch(name, description, category) {
    console.log(name, description, category)
    fetch(endpoint, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: name,
            description: description,
            category_id: category
        })
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(object) {
        console.log(object)
        renderRequest(object)
    })
}

const renderRequest = function(request){
    const requestMarkup = ` 
                <div class="request">
                    <h2>${request.name}</h2>
                    <p>${request.description}</p>
                    <p class="dates">Created on ${dateify(request.created_at)}<p></p>
                </div> `

                document.querySelector("#requests-container").innerHTML += requestMarkup
}

// helper functions

let dateify = function(dateString){
    let date = new Date(dateString)
    return date.toDateString()
}

function createRequestFormHandler(e){
    e.preventDefault()
    const nameInput = document.querySelector("#input-name").value
    const descriptionInput = document.querySelector("#input-description").value
    const categoryId = parseInt(document.querySelector("#select-categories").value)

    postFetch(nameInput, descriptionInput, categoryId)
}
