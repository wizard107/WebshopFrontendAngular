import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebshopComponent } from './webshop/webshop.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { BannerComponent } from './components/main-page/banner/banner.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ProductCatalogComponent } from './components/product-catalog/product-catalog.component';
import { BedsBannerComponent } from './components/main-page/beds-banner/beds-banner.component';
import { ChairsBannerComponent } from './components/main-page/chairs-banner/chairs-banner.component';
import { TablesBannerComponent } from './components/main-page/tables-banner/tables-banner.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AddressComponent } from './components/checkout/address/address.component';
import { PaymentComponent } from './components/checkout/payment/payment.component';
import { OrderReviewComponent } from './components/order-review/order-review.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import {ProductDetailComponent} from './components/product-detail/product-detail.component';
import {CartService} from './services/CartService';
import {CommonModule} from '@angular/common';
import { ProductService } from './services/productService';
import { CheckoutService } from './services/checkoutService';
// Material Components

@NgModule({
  declarations: [
    AppComponent,
    WebshopComponent,
    HeaderComponent,
    FooterComponent,
    MainPageComponent,
    BannerComponent,
    ProductCatalogComponent,
    BedsBannerComponent,
    ChairsBannerComponent,
    TablesBannerComponent,
    ProductDetailComponent,
    CheckoutComponent,
    AddressComponent,
    PaymentComponent,
    OrderReviewComponent,
    OrderConfirmationComponent,
    ProductDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule
  ],
  providers: [provideHttpClient(), provideAnimationsAsync(),CartService,    ProductService,
    CheckoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
