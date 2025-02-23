import {Product} from '../model/product';
import {Injectable} from '@angular/core';
import {Inventory} from '../model/inventory';
import {ProductCategories} from '../model/enums/product-categories';
import {Observable, of} from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products = [
    new Product(1, "Nachttisch", "This is product 1", ProductCategories.TABLES, new Inventory(1, 1, "", "", "", ""), 179, "assets/nachttisch.jpg", "brown", "wood", 100, 100, 100, 100),
    new Product(2, "Fusshocker", "This is product 1", ProductCategories.BEDROOM_FURNITURE, new Inventory(1, 1, "", "", "", ""), 89.99, "assets/fusshocker.jpg", "brown", "wood", 100, 100, 100, 100),
    new Product(3, "Liegestuhl", "This is product 1", ProductCategories.SOFAS, new Inventory(1, 1, "", "", "", ""), 2600, "assets/brauner_liegestuhl.jpg", "brown", "wood", 100, 100, 100, 100),
    new Product(4, "Sitzbank", "This is product 1", ProductCategories.SOFAS, new Inventory(1, 1, "", "", "", ""), 99.99, "assets/sitzbank.jpg", "brown", "wood", 100, 100, 100, 100),
    new Product(5, "Tischlein", "This is product 1", ProductCategories.TABLES, new Inventory(1, 1, "", "", "", ""), 449, "assets/tischlein.jpg", "brown", "wood", 100, 100, 100, 100),
    new Product(6, "Hozhocker", "This is product 1", ProductCategories.DESKS, new Inventory(1, 1, "", "", "", ""), 89.99, "assets/holzhocker.jpg", "brown", "wood", 100, 100, 100, 100),
    new Product(7, "Sessel Frottee", "This is product 1", ProductCategories.SOFAS, new Inventory(1, 1, "", "", "", ""), 249, "assets/sessel_frottee.jpg", "brown", "wood", 100, 100, 100, 100),
    new Product(8, "Beistellmöbel ", "This is product 1", ProductCategories.BEDROOM_FURNITURE, new Inventory(1, 1, "", "", "", ""), 249, "assets/beistell.jpg", "brown", "wood", 100, 100, 100, 100),
    new Product(9, "Gepolsterter Sessel", "This is product 1", ProductCategories.SOFAS, new Inventory(1, 1, "", "", "", ""), 299, "assets/gepolsterter_sessel.jpg", "brown", "wood", 100, 100, 100, 100),
    new Product(10, "Faltbarer Kofferständer", "This is product 1", ProductCategories.DESKS, new Inventory(1, 1, "", "", "", ""), 119, "assets/faltbarer_kofferstaender.jpg", "brown", "wood", 100, 100, 100, 100),
    new Product(11, "Barhocker", "This is product 1", ProductCategories.SOFAS, new Inventory(1, 1, "", "", "", ""), 99.99, "assets/barhocker.jpg", "brown", "wood", 100, 100, 100, 100),
    new Product(11, "Beistelltisch", "This is product 1", ProductCategories.TABLES, new Inventory(1, 1, "", "", "", ""), 99.99, "assets/beistelltisch.jpg", "brown", "wood", 100, 100, 100, 100)
  ]

  constructor() {}

  getProductById(id: number):  Observable<Product | null>  {
    console.log(`Suche nach Produkt mit ID: ${id}`);

    const foundProduct = this.products.find(product => product.id === id) || null;
    console.log(foundProduct); // Debugging

    return of(foundProduct);}
}
