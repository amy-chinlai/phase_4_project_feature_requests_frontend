class Request {
    constructor(id, requestAttributes){
        this.id = id
        this.name = requestAttributes.name
        this.description = requestAttributes.description
        this.categoryId = requestAttributes.categoryId
    }
}