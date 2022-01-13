const endpoint = "http://localhost:7000/api/v1/requests"

document.addEventListener('DOMContentLoaded', function() {
    console.log("The DOM has loaded");
    fetch(endpoint)
    .then (function(response) {
        return response.json()
    })
    .then(function(json) {
        for (const element of json.data) {
            console.log(element)
        }
    })
});

