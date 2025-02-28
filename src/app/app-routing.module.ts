import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCatalogComponent } from './components/product-catalog/product-catalog.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderReviewComponent } from './components/order-review/order-review.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';

const routes: Routes = [
  { path: '',  component:  MainPageComponent },
  { path: 'product-catalog', component: ProductCatalogComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'product-catalog', component: ProductCatalogComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order-review', component: OrderReviewComponent },
  { path: 'order-confirmation', component: OrderConfirmationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
