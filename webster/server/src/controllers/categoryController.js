import CategoryService from "../services/category.service.js";

export class CategoryController {
    constructor (service) {
        this.service = new CategoryService();
    }

    async selectAll(req, res) {
        const result = await this.service.selectAll();
        return result;
    }

    async selectById(req, res) {
        const result = await this.service.selectById(req.params.id);
        return result;
    }

    async create(req, res) {
        await this.service.create(req.body);
    }

    async update(req, res){
        await this.service.update(req.body, req.params.id);
    }

    async deleteById(req, res) {
        await this.service.deleteById(req.params.id);
    }
}

const categoryController = new CategoryController(new CategoryService());
export default categoryController;