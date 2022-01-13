const endpoint = "http://localhost:7000/api/v1/requests"

document.addEventListener('DOMContentLoaded', () => {
    getRequests()

    const createRequestForm = document.querySelector("#request-form")

    createRequestForm.addEventListener("submit", (e) => createRequestFormHandler(e))
});

// CRUD functions

function getRequests() {
    fetch(endpoint)
    .then (function(response) {
        return response.json()
    })
    .then(requests => {
        requests.data.forEach(request => {
            let newRequest = new Request(request, request.attributes)
            document.querySelector("#requests-container").innerHTML += newRequest.renderRequest()
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
    .catch(function(error) {
        console.log(error)
      })
}


// helper functions

// const renderRequest = function(request){
//     const requestMarkup = ` 
//                 <div class="request">
//                     <h2>${request.category.name}: ${request.name}</h2>
//                     <p>${request.description}</p>
//                     <p class="dates">Created on ${dateify(request.created_at)}<p></p>
//                 </div> `

//                 document.querySelector("#requests-container").innerHTML += requestMarkup
// }

// let dateify = function(dateString){
//     let date = new Date(dateString)
//     return date.toDateString()
// }

function createRequestFormHandler(e){
    e.preventDefault()
    const nameInput = document.querySelector("#input-name").value
    const descriptionInput = document.querySelector("#input-description").value
    const categoryId = parseInt(document.querySelector("#select-categories").value)

    postFetch(nameInput, descriptionInput, categoryId)
}
