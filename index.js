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
            renderRequest(request)
        })
    })
};

const renderRequest = function(request){
    const requestMarkup = ` 
                <div class="request">
                    <h2>${request.attributes.name}</h2>
                    <p>${request.attributes.description}</p>
                    <p class="dates">Created on ${dateify(request.attributes.created_at)}<p></p>
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
    console.log(e)
}