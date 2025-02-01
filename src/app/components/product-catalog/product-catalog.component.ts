import { Component, HostListener } from '@angular/core';
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

  // Local Products Array
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

  displayedProducts = this.products.slice();

  // Variables
  searchText = "";
  sortOption: string = 'relevance';
  dropdownOpen = false;

  searchProducts() {
    this.displayedProducts = this.products.filter((product) => {
      return product.name.toLowerCase().includes(this.searchText.toLowerCase());
    });
    this.sortOptions(this.sortOption);
  }

  sortOptions(option: string) {
    // Implement your sorting logic here based on this.sortOption
    switch (option) {
      case 'relevance': {
        this.displayedProducts = this.products.slice();
        this.displayedProducts = this.products.filter((product) => {
          return product.name.toLowerCase().includes(this.searchText.toLowerCase());
        });
        break;
      }
      case 'alphabetically': {
        this.displayedProducts = this.displayedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      }
      case "priceLowToHigh": {
        this.displayedProducts = this.displayedProducts.sort((a, b) => a.price - b.price);
        break;
      }
      case "priceHighToLow": {
        this.displayedProducts = this.displayedProducts.sort((a, b) => b.price - a.price);
        break;
      }
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(option: string) {
    this.sortOption = option;
    this.sortOptions(option);
  }

  getSelectedOptionLabel(): string {
    const options: { [key: string]: string } = {
        relevance: 'Relevance',
        alphabetically: 'Alphabetically',
        priceLowToHigh: 'Price: Low to High',
        priceHighToLow: 'Price: High to Low'
    };
    return options[this.sortOption as keyof typeof options];
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.sort-container')) {
        this.dropdownOpen = false;
    }
}

}
