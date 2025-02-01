import { Component } from '@angular/core';
import { Product } from '../../model/product';
import { Inventory } from '../../model/inventory';
import { ProductCategories } from '../../model/enums/product-categories';

@Component({
  selector: 'app-product-catalog',
  standalone: false,
  
  templateUrl: './product-catalog.component.html',
  styleUrl: './product-catalog.component.scss'
})
export class ProductCatalogComponent {

  products = [
    new Product(1, "Nachttisch", "This is product 1", ProductCategories.TABLES, new Inventory(1, 1, "", "", "", ""), 50, "assets/nachttisch.jpg", "brown", "wood", 100, 100, 100, 100),
    new Product(2, "Fusshocker", "This is product 1", ProductCategories.BEDROOM_FURNITURE, new Inventory(1, 1, "", "", "", ""), 100, "assets/fusshocker.jpg", "brown", "wood", 100, 100, 100, 100),
    new Product(3, "Liegestuhl", "This is product 1", ProductCategories.SOFAS, new Inventory(1, 1, "", "", "", ""), 150, "assets/brauner_liegestuhl.jpg", "brown", "wood", 100, 100, 100, 100),  
    new Product(4, "Sitzbank", "This is product 1", ProductCategories.SOFAS, new Inventory(1, 1, "", "", "", ""), 120, "assets/sitzbank.jpg", "brown", "wood", 100, 100, 100, 100),
    new Product(5, "Tischlein", "This is product 1", ProductCategories.TABLES, new Inventory(1, 1, "", "", "", ""), 90, "assets/tischlein.jpg", "brown", "wood", 100, 100, 100, 100),
    new Product(6, "Hozhocker", "This is product 1", ProductCategories.DESKS, new Inventory(1, 1, "", "", "", ""), 100, "assets/holzhocker.jpg", "brown", "wood", 100, 100, 100, 100),
    new Product(7, "Sessel Frottee", "This is product 1", ProductCategories.SOFAS, new Inventory(1, 1, "", "", "", ""), 100, "assets/sessel_frottee.jpg", "brown", "wood", 100, 100, 100, 100), 
    new Product(8, "Beistellmöbel ", "This is product 1", ProductCategories.BEDROOM_FURNITURE, new Inventory(1, 1, "", "", "", ""), 100, "assets/beistell.jpg", "brown", "wood", 100, 100, 100, 100),
    new Product(9, "Gepolsterter Sessel", "This is product 1", ProductCategories.SOFAS, new Inventory(1, 1, "", "", "", ""), 100, "assets/gepolsterter_sessel.jpg", "brown", "wood", 100, 100, 100, 100),
    new Product(10, "Faltbarer Kofferständer", "This is product 1", ProductCategories.DESKS, new Inventory(1, 1, "", "", "", ""), 100, "assets/faltbarer_kofferstaender.jpg", "brown", "wood", 100, 100, 100, 100) 
  ]

}
