import { Inventory } from './inventory';
import { ProductCategories } from './enums/product-categories';

export class Product {
    id: number;
    name: string;
    description: string;
    category: ProductCategories;
    inventory: Inventory;
    price: number;
    imageId: string;
    color: string;
    material: string;
    height: number;
    width: number;
    depth: number;
    weight: number;

    constructor(
        id: number, name: string, description: string, category: ProductCategories, inventory: Inventory,
        price: number, imageId: string, color: string, material: string, height: number,
        width: number, depth: number, weight: number
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.inventory = inventory;
        this.price = price;
        this.imageId = imageId;
        this.color = color;
        this.material = material;
        this.height = height;
        this.width = width;
        this.depth = depth;
        this.weight = weight;
    }

}

export class ProductDTO{
    id: number;
    quantity: number;
    
    constructor(id: number, quantity: number){
        this.id = id;
        this.quantity = quantity;
    }
}