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
import { ProductCatalogComponent } from './components/product-catalog/product-catalog.component';
@NgModule({
  declarations: [
    AppComponent,
    WebshopComponent,
    HeaderComponent,
    FooterComponent,
    MainPageComponent,
    BannerComponent,
    ProductCatalogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
