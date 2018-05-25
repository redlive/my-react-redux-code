export class CategoryServiceClass {

    constructor() {
        this.categories = require('../meta/category.json');;
    }

    getList(){
        return this.categories;
    }

    getCategoryById(id){
        return this.categories.filter((category)=>{
            return category.value === id;
        })[0] || {};
    }
}

export let CategoryService = new CategoryServiceClass();