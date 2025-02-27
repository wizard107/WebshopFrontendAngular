import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../model/product';
import { Inventory } from '../../model/inventory';
import { ProductCategories } from '../../model/enums/product-categories';
import { ProductService } from '../../services/productService';

@Component({
  selector: 'app-product-catalog',
  standalone: false,
  templateUrl: './product-catalog.component.html',
  styleUrl: './product-catalog.component.scss'
})
export class ProductCatalogComponent implements OnInit {

  products: Product[] = [];
  displayedProducts: Product[] = [];
  filteredProducts: Product[] = [];
  baseImageUrl = 'https://storage.googleapis.com/webshop-images/products/';
  categoryTitle: string = 'ALL PRODUCTS';

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
    { name: 'Price', open: false, options: [{ name: '$0-$50', selected: false }, { name: '$50-$100', selected: false }, { name: '$100-$500', selected: false }, { name: '$500+', selected: false }] },
    { name: 'Color', open: false, options: [{ name: 'light-beige', selected: false }, { name: 'beige', selected: false }, { name: 'white', selected: false }, { name: 'brown', selected: false }] },
    { name: 'Category', open: false, options: [{ name: 'Tables', selected: false }, { name: 'Sofas', selected: false }, { name: 'Desks', selected: false }, { name: 'Bedroom Furniture', selected: false }] },
    { name: 'Height', open: false, options: [{ name: '<50cm', selected: false }, { name: '50cm-100cm', selected: false }, { name: '100cm+', selected: false }] },
    { name: 'Width', open: false, options: [{ name: '<50cm', selected: false }, { name: '50cm-100cm', selected: false }, { name: '100cm+', selected: false }] },
    { name: 'Depth', open: false, options: [{ name: '<30cm', selected: false }, { name: '30cm-50cm', selected: false }, { name: '50cm+', selected: false }] },
  ];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }



  ngOnInit() {
    this.loadProducts();
    this.isSmallScreen = window.innerWidth <= 768;
    
    // Subscribe to query params to handle category filtering from navigation
    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      if (category) {
        this.handleCategoryFilter(category);
      } else {
        // Reset to "All Products" if no category is specified
        this.categoryTitle = 'ALL PRODUCTS';
        this.filteredProducts = this.products.slice();
        this.displayedProducts = this.products.slice();
      }
    });
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.displayedProducts = this.products.slice();
        this.filteredProducts = this.products.slice();
        
        // Check for category query param again here to ensure products are loaded
        this.route.queryParams.subscribe(params => {
          const category = params['category'];
          if (category) {
            this.handleCategoryFilter(category);
          }
        });
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }
  
  handleCategoryFilter(category: string) {
    // Set the category title
    this.categoryTitle = category.toUpperCase();
    
    // Map the URL parameter to the enum value
    const categoryMap: { [key: string]: ProductCategories } = {
      'tables': ProductCategories.TABLES,
      'chairs': ProductCategories.CHAIRS,
      'beds': ProductCategories.BEDS,
      'sofas': ProductCategories.SOFAS,
      'desks': ProductCategories.DESKS,
      'bedroom-furniture': ProductCategories.BEDROOM_FURNITURE
    };
    
    const categoryEnum = categoryMap[category.toLowerCase()];
    
    if (categoryEnum) {
      // Filter the products by category
      this.filteredProducts = this.products.filter(product => product.category === categoryEnum);
      this.displayedProducts = this.filteredProducts.slice();
      
      // Optionally, also set the category filter checkbox
      const categoryFilter = this.filters.find(f => f.name === 'Category');
      if (categoryFilter) {
        // Reset all category options
        categoryFilter.options.forEach(option => option.selected = false);
        
        // Find the matching option and select it
        const categoryOption = categoryFilter.options.find(option => 
          option.name.toLowerCase() === category.toLowerCase() || 
          (category.toLowerCase() === 'beds' && option.name === 'Bedroom Furniture')
        );
        
        if (categoryOption) {
          categoryOption.selected = true;
        }
      }
    } else {
      // If no valid category is provided, show all products
      this.filteredProducts = this.products.slice();
      this.displayedProducts = this.products.slice();
    }
  }
  
  getProductImageUrl(productId: number): string {
    return this.productService.getProductImageUrl(productId);
  }

  searchProducts() {
    this.displayedProducts = this.products.filter((product) => {
      return product.name.toLowerCase().includes(this.searchText.toLowerCase());
    });
    this.filteredProducts = [...this.displayedProducts];
    this.sortOptions(this.sortOption, true);
  }

  sortOptions(option: string, fromSearch?: boolean) {
    switch (option) {
      case 'relevance': {
        if (fromSearch) {
          this.displayedProducts = this.products.filter((product) => {
            return product.name.toLowerCase().includes(this.searchText.toLowerCase());
          });
        } else {
          this.displayedProducts = this.filteredProducts.slice();
        }
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
    this.displayedProducts = this.filteredProducts.filter(product => { 
      return this.filters.every(filter => {
        const selectedOptions = filter.options.filter(option => option.selected).map(option => option.name);
        if (selectedOptions.length === 0) {
          return true; // No filter applied
        }
        switch (filter.name) {
          case 'Price':
            return selectedOptions.some(option => {
              if (option === '$0-$50') return product.price >= 0 && product.price <= 50;
              if (option === '$50-$100') return product.price > 50 && product.price <= 100;
              if (option === '$100-$500') return product.price > 100 && product.price <= 500;
              if (option === '$500+') return product.price > 500;
              return false;
            });
          case 'Color':
            return selectedOptions.includes(product.color);
          case 'Category':
            const categoryMap: { [key: string]: ProductCategories } = {
              'Sofas': ProductCategories.SOFAS,
              'Tables': ProductCategories.TABLES,
              'Bedroom Furniture': ProductCategories.BEDROOM_FURNITURE,
              'Desks': ProductCategories.DESKS
            };
            return selectedOptions.some(option => product.category === categoryMap[option]);
          case 'Height':
            return selectedOptions.some(option => {
              if (option === '<50cm') return product.height < 50;
              if (option === '100cm+') return product.height > 100;
              const [min, max] = option.replace('cm', '').split('-').map(Number);
              return product.height >= min && (max ? product.height <= max : true);
            });
          case 'Width':
            return selectedOptions.some(option => {
              if (option === '<50cm') return product.width < 50;
              if (option === '100cm+') return product.width > 100;
              const [min, max] = option.replace('cm', '').split('-').map(Number);
              return product.width >= min && (max ? product.width <= max : true);
            });
          case 'Depth':
            return selectedOptions.some(option => {
              if (option === '<30cm') return product.depth < 30;
              if (option === '50cm+') return product.depth > 50;
              const [min, max] = option.replace('cm', '').split('-').map(Number);
              return product.depth >= min && (max ? product.depth <= max : true);
            });
        }
        return true;
      });
    });
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