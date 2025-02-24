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

  products = [
    new Product(1, "Nachttisch", "Nachttisch aus echtem Eichenholz mit Schublade. Ohne Montage.", 
      ProductCategories.TABLES, new Inventory(1, 1, "", "", "", ""), 179, "assets/nachttisch.jpg", "light-beige", "wood", 55, 45, 35, 3.5),
    new Product(2, "Fusshocker", "Fusshocker mit beigefarbenem Frottee-Bezug", 
      ProductCategories.BEDROOM_FURNITURE, new Inventory(1, 1, "", "", "", ""), 89.99, "assets/fusshocker.jpg", "beige", "wood", 40, 51, 40, 2.5),
    new Product(3, "Liegestuhl", "Brauner Marken-Liegestuhl", 
      ProductCategories.SOFAS, new Inventory(1, 1, "", "", "", ""), 2600, "assets/brauner_liegestuhl.jpg", "brown", "wood", 100, 100, 100, 100),  
    new Product(4, "Sitzbank", "Diese Sitzbank aus Akazienholz besticht durch ihre Vielseitigkeit und ihr Design und erweist sich als elegant und funktional zugleich. Komplett aus Akazienholz gefertigt.", 
      ProductCategories.SOFAS, new Inventory(1, 1, "", "", "", ""), 99.99, "assets/sitzbank.jpg", "brown", "wood", 43, 55, 25, 7),
    new Product(5, "Tischlein", "Staumöbel aus Holz mit zwei Regalen und Schublade oben. Aufgrund der Beschaffenheit des Materials kann die Farbe und das Aussehen leicht abweichen.",
       ProductCategories.TABLES, new Inventory(1, 1, "", "", "", ""), 449, "assets/tischlein.jpg", "light-beige", "wood", 90, 90, 45, 10),
    new Product(6, "Hozhocker", "Rechteckiger Hocker aus echtem Ulmenholz. Kein Aufbau erforderlich. Aufgrund der Beschaffenheit des Materials kann die Farbe leicht abweichen.", 
      ProductCategories.DESKS, new Inventory(1, 1, "", "", "", ""), 89.99, "assets/holzhocker.jpg", "light-beige", "wood", 46, 40, 24, 3),
    new Product(7, "Sessel Frottee", "Sessel mit beigefarbenem Frotteebezug und Holzbeinen.", 
      ProductCategories.SOFAS, new Inventory(1, 1, "", "", "", ""), 249, "assets/sessel_frottee.jpg", "beige", "wood", 76, 66, 58, 7.5), 
    new Product(8, "Beistellmöbel ", "Honigfarbenes, kleines Beistellmöbel aus Eichenholz mit zwei Fächern. Kann für verschiedene Zwecke als niedriges Regal, Sideboard für einen Eingangsbereich oder Nachttisch verwendet werden", 
      ProductCategories.BEDROOM_FURNITURE, new Inventory(1, 1, "", "", "", ""), 249, "assets/beistell.jpg", "light-beige", "wood", 75, 57, 35, 12),
    new Product(9, "Gepolsterter Sessel", 
      "Gepolsterter Sessel mit Armlehnen aus Nussbaumholz und appliziertem Mattwachs. Das Design ist das Ergebnis einer Kooperation mit dem auf Polstermöbel spezialisierten Unternehmen Blasco. Hergestellt in Spanien. Blasco ist ein spanisches Unternehmen, das 1945 von den Brüdern Pedro und Rafael Blasco, Auszubildenden einer Polsterwerkstatt, gegründet wurde. Im Laufe der Zeit hat es sich aufgrund seiner schlichten, gesteppten Möbel zu einer Bezugsgröße in der Dekorationswelt entwickelt. Die zeitlosen Designs sind eines der Hauptmerkmale.",
       ProductCategories.SOFAS, new Inventory(1, 1, "", "", "", ""), 299, "assets/gepolsterter_sessel.jpg", "white", "wood", 75, 63, 78, 11),
    new Product(10, "Faltbarer Kofferständer", "Faltbarer Kofferständer aus Holz mit Stoff aus Leinen.", 
      ProductCategories.DESKS, new Inventory(1, 1, "", "", "", ""), 119, "assets/faltbarer_kofferstaender.jpg", "light-beige", "wood", 64, 64, 44, 2.5), 
    new Product(11, "Barhocker", "Barhocker aus Eschenholz mit geformetem Sitz Form. In zwei Größen erhältlich.", 
      ProductCategories.SOFAS, new Inventory(1, 1, "", "", "", ""), 99.99, "assets/barhocker.jpg", "brown", "wood", 72, 40, 37, 7.5),
    new Product(12, "Beistelltisch", "Beistelltisch aus Eschenholz mit klappbarer Tischplatte, um die Aufbewahrung zu erleichtern",
       ProductCategories.TABLES, new Inventory(1, 1, "", "", "", ""), 99.99, "assets/beistelltisch.jpg", "light-beige", "wood", 64, 47, 39, 9)
  ]

  displayedProducts = this.products.slice();

  // Variables
  searchText = "";
  sortOption: string = 'relevance';
  dropdownOpen = false;
  isSmallScreen = false;
  filterMenuOpen = false;
  filterOpen = {
    price: false,
    color: false,
    category: false,
    height: false,
    width: false,
    depth: false
  };
  filters = [
    { name: 'Price', open: false, options: [{ name: '$0-$50', selected: false }, { name: '$50-$100', selected: false }] },
    { name: 'Color', open: false, options: [{ name: 'Red', selected: false }, { name: 'Blue', selected: false }] },
    { name: 'Category', open: false, options: [{ name: 'Electronics', selected: false }, { name: 'Furniture', selected: false }] },
    { name: 'Height', open: false, options: [{ name: 'Short', selected: false }, { name: 'Tall', selected: false }] },
    { name: 'Width', open: false, options: [{ name: 'Narrow', selected: false }, { name: 'Wide', selected: false }] },
    { name: 'Depth', open: false, options: [{ name: 'Shallow', selected: false }, { name: 'Deep', selected: false }] },
];

  searchProducts() {
    this.displayedProducts = this.products.filter((product) => {
      return product.name.toLowerCase().includes(this.searchText.toLowerCase());
    });
    this.sortOptions(this.sortOption);
  }

  sortOptions(option: string) {
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

  toggleFilter(name: string) {
    this.filters.forEach(filter => {
        if (filter.name === name) {
            filter.open = !filter.open;
        } else {
            filter.open = false; // Close other filters
        }
    });
  }

  applyFilters() {
    // Logic to filter products based on selected options
    console.log(this.filters);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.sort-container')) {
        this.dropdownOpen = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
      this.isSmallScreen = window.innerWidth <= 768;
  }

  toggleFilterMenu() {
      this.filterMenuOpen = !this.filterMenuOpen;
  }

}
