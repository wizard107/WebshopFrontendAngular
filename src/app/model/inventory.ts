export class Inventory {
    id: number;
    stock: number;
    supplierName: string;
    supplierEmail: string;
    supplierPhone: string;
    warehouseLocation: string;

    constructor(id: number, stock: number, supplierName: string, supplierEmail: string, supplierPhone: string, warehouseLocation: string) {
        this.id = id;
        this.stock = stock;
        this.supplierName = supplierName;
        this.supplierEmail = supplierEmail;
        this.supplierPhone = supplierPhone;
        this.warehouseLocation = warehouseLocation;
    }
}