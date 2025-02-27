import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCatalogComponent } from './components/product-catalog/product-catalog.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import {ProductDetailComponent} from './components/product-detail/product-detail.component';

const routes: Routes = [
  { path: '',  component:  MainPageComponent },
  { path: 'product-catalog', component: ProductCatalogComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'product-catalog', component: ProductCatalogComponent },
  { path: 'product/:id', component: ProductDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
