class Request {
    constructor(request, requestAttributes){
        this.id = request.id
        this.name = requestAttributes.name
        this.description = requestAttributes.description
        this.category = requestAttributes.category
        Request.all.push(this)
    }

    renderRequest() {
        return ` 
                    <div class="request" data-id=${this.id}>
                        <h2>${this.category.name}: ${this.name}</h2>
                        <p>${this.description}</p>
                        <p class="dates">Created on ${dateify(this.created_at)}<p></p>
                    </div> `
    
    }
} // ends class

Request.all = []