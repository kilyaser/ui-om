import {productApi} from "../../clients/generated"
import type {
    CreateProductRequest,
    SearchRequest,
    UiProduct,
    UiProducts
} from "../../clients/generated/commonApi/models";

class ProductService {

    async searchProducts(req: SearchRequest): Promise<UiProducts> {
        try {
            return await productApi.searchProducts(req);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async createProduct(productName: string): Promise<UiProduct> {
        try {
            const req: CreateProductRequest = {
                productName: productName,
            }
            return await productApi.createProduct(req);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const productService = new ProductService();

export default productService;