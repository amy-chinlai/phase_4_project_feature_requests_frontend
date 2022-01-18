const endpoint = "http://localhost:7000/api/v1/requests"

// listeners

document.addEventListener('DOMContentLoaded', () => {
    getRequests()

    const createRequestForm = document.querySelector("#request-form")
    createRequestForm.addEventListener("submit", (e) => createRequestFormHandler(e))

    const dropdown = document.querySelector("#category-dropdown")
    dropdown.addEventListener('change', function(e){
        console.log("changed")
        selectCategory(e)
    })

});

function addHeartListener() {
    console.log("hit heart listener")
    const hearts = document.querySelectorAll(".fa-heart")
        hearts.forEach(heart => { 
            heart.addEventListener('click', e => {
            patchVote(e.target.dataset)
            })
        })
}


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
            addHeartListener()
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
        let newRequest = new Request(object, object)
        document.querySelector("#requests-container").innerHTML += newRequest.renderRequest()
        addHeartListener()
    })
    .catch(function(error) {
        console.log(error)
      })
}

function patchVote(request) {
    let submitValue 
    if (request.value == "true") {
        submitValue = "false"
    } else {
        submitValue = "true"
    }
    fetch(endpoint + `/${request.id}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            vote: submitValue
        })
    }).then(function(response) {
        return response.json()
    })
    .then(function(object) {
        console.log(object)
        // let editedRequest = new Request(object, object)
        // document.querySelector('#requests-container').insertAdjacentHTML("beforeend", editedRequest.renderRequest())
        document.querySelector("#requests-container").innerHTML = ""
        getRequests()
        addHeartListener() // better way than blanking out the innherHTML? also how to do the heart multiple times without refreshing
    })
}


// helper functions

function createRequestFormHandler(e){
    e.preventDefault()
    const nameInput = document.querySelector("#input-name").value
    const descriptionInput = document.querySelector("#input-description").value
    const categoryId = parseInt(document.querySelector("#select-categories").value)

    postFetch(nameInput, descriptionInput, categoryId)
}

function selectCategory(e) {
    console.log(e.target.value)
    let filteredRequests = Request.all.filter(request => request.category.id === parseInt(e.target.value))

    document.querySelector("#requests-container").innerHTML = ""

    filteredRequests.forEach(request => {
        let newRequest = new Request(request, request)
        document.querySelector("#requests-container").innerHTML += newRequest.renderRequest()
    })
}
