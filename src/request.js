class Request {
    constructor(request, requestAttributes){
        this.id = request.id
        this.name = requestAttributes.name
        this.description = requestAttributes.description
        this.category = requestAttributes.category
        this.created_at = requestAttributes.created_at
        this.vote = requestAttributes.vote
        Request.all.push(this)
    }

    renderRequest() {
        return ` 
                    <div class="request" data-id=${this.id} id="request_${this.id}">
                        <h2>${this.category.name}: ${this.name} ${this.vote === 1 ? '<i class="fas fa-heart" data-id="${this.id}"></i>' : '<i class="far fa-heart" data-id="${this.id}"></i>'}</h2>
                        <p>${this.description}</p>
                        <p class="dates">Created on ${this.dateify()}<p></p>
                    </div> `
    
    }

    dateify() {
        let date = new Date(this.created_at)
        return date.toDateString()
    }

    // renderVote() {
    //     let vote = this.vote
    //     if (vote === 1) {
    //         return `<i class="fas fa-heart" data-id="${this.id}"></i>`
    //     } else {
    //         return `<i class="far fa-heart" data-id="${this.id}"></i>`
    //     }
    // }

    // heartListener() {
    //     console.log("heartlistener")
    //     console.log(this.id)
    //     let heart = document.querySelector(`div#request_${this.id} .fa-heart`)
    //     console.log(heart)
    //     debugger
    //     heart.addEventListener('click', event => {
    //         console.log("hearted")
    //     })
    // } 

} // ends class

Request.all = []