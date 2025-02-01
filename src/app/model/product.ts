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
    height?: number;
    width?: number;
    depth?: number;
    weight?: number;

    constructor(
        id: number, name: string, description: string, category: ProductCategories, inventory: Inventory, 
        price: number, imageId: string, color: string, material: string, height: number | undefined,
        width: number | undefined, depth: number | undefined, weight: number | undefined
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
