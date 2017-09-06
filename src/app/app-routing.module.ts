import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsByCategoryComponent } from './products-by-category/products-by-category.component';
import { CartDetailComponent } from './cart/cart-detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'confirm/:confirm_token', component: ConfirmAccountComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'product', component: ProductDetailComponent },
  { path: 'category/:slug', component: ProductsByCategoryComponent },
  { path: 'cart', component: CartDetailComponent },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
