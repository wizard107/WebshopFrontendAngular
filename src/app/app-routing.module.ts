import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCatalogComponent } from './components/product-catalog/product-catalog.component';
import { MainPageComponent } from './components/main-page/main-page.component';

const routes: Routes = [
  { path: '',  component:  MainPageComponent },
  { path: 'product-catalog', component: ProductCatalogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
