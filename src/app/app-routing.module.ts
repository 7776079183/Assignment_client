import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { CustomerProductComponent } from './customer-product/customer-product.component';
import { AuthGuardGuard } from './_auth/auth-guard.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { AdminGuard } from './_auth/admin.guard'

const routes: Routes = [
  { path:  '', component: SignInComponent},
  { path:  'admin', component: AdminProductComponent,canActivate:[AdminGuard]},
  { path:  'customer', component: CustomerProductComponent,canActivate:[AuthGuardGuard]},
  { path:  'add-product', component: AddProductComponent,canActivate:[AdminGuard]},
  { path:  'update-product/:_id', component: UpdateProductComponent,canActivate:[AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
