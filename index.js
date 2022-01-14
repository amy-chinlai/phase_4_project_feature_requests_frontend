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

    window.setTimeout(() => {
        const hearts = document.querySelectorAll(".fa-heart")
        hearts.forEach(heart => { 
            heart.addEventListener('click', e => {
            console.log("hearted")
            })
        })
    }, 1000)

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
            // newRequest.heartListener()
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
    })
    .catch(function(error) {
        console.log(error)
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
