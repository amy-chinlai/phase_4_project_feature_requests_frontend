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
                    <div class="request" data-id=${this.id}>
                        <h2>${this.category.name}: ${this.name}</h2>
                        <p>${this.description}</p>
                        <p>${this.vote} ${this.renderVote()}</p>
                        <p class="dates">Created on ${this.dateify()}<p></p>
                    </div> `
    
    }

    dateify() {
        let date = new Date(this.created_at)
        return date.toDateString()
    }

    renderVote() {
        let vote = this.vote
        if (vote === 1) {
            console.log("vote = 1")
        } else if (vote === -1) {
            console.log("vote = -1")
        }
    }
} // ends class

Request.all = []