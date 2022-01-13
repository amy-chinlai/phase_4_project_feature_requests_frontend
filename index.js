const endpoint = "http://localhost:7000/api/v1/requests"

document.addEventListener('DOMContentLoaded', function() {
    console.log("The DOM has loaded");
    fetch(endpoint)
    .then (function(response) {
        return response.json()
    })
    .then(requests => {
        requests.data.forEach(request => {
            const requestMarkup = ` 
                <div class="request">
                    <h2>${request.attributes.name}</h2>
                </div> `

                document.querySelector("#requests-container").innerHTML += requestMarkup
        })
    })
});

// function appendRequest(e) {
//     console.log("appending")
//     // var h1 = document.createElement('h1')
//     // h1.classList.add('request')
//     // h1.innerHTML = `${e.name}`
//     // document.appendChild(h1)
// }