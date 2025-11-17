import { Routes } from '@angular/router';
import { ProductListComponent } from './components/products/product-list-component/product-list-component';
import { ProductFormComponent } from './components/products/product-form-component/product-form-component';
import { ProductComponent } from './components/products/product-component/product-component';
import { CategoryComponent } from './components/categories/category-component/category-component';
import { CategoryListComponent } from './components/categories/category-list-component/category-list-component';
import { CategoryFormComponent } from './components/categories/category-form-component/category-form-component';
import { LoginComponent } from './components/login/login-component/login-component';
import { DashboardComponent } from './components/dashboard/dashboard-component/dashboard-component';
import { PageNotFoundComponent } from './components/error-pages/page-not-found/page-not-found-component/page-not-found-component';
import { UnAuthorizePageComponent } from './components/error-pages/unauthorize-page/un-authorize-page-component/un-authorize-page-component';
import { authGuardGuard } from './authGuards/authGuard/auth-guard-guard';
import { noAuthGuard } from './authGuards/no-auth/no-auth-guard';
import { roleGuard } from './authGuards/role-guard/role-guard';
import { ForbidenComponent } from './components/error-pages/forbidden/forbiden-component/forbiden-component';

export const routes: Routes = [
  { path: 'login', canActivate:[noAuthGuard], component: LoginComponent, title: "Login" },
  { path: 'un-authorize', component: UnAuthorizePageComponent, title: "Access denied" },
  { path: 'forbidden', component: ForbidenComponent, title: "Access denied" },
  {
    path: 'dashboard', canActivate: [authGuardGuard], component: DashboardComponent,
    children: [
      {
        path: 'product',
        component: ProductComponent,
        children: [
          { path: 'list', component: ProductListComponent, title: "Product List" },
          { path: 'add', component: ProductFormComponent, title: "Add Product" },
          { path: 'edit/:id', component: ProductFormComponent, title: "Edit Product" },
          { path: '', redirectTo: 'list', pathMatch: 'full' } // default child route
        ]
      },
      {
        path: 'category',
        component: CategoryComponent,
        children: [
          { path: 'list', component: CategoryListComponent, title: "Category List" },
          { path: 'add', component: CategoryFormComponent, title: "Add Category" },
          { path: 'edit/:id', component: CategoryFormComponent, title: "Edit Category" },
          { path: '', redirectTo: 'list', pathMatch: 'full' } // default child route
        ]
      },
      { path: '', redirectTo: 'product', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // default
  {
    path: '**',
    component: PageNotFoundComponent,
    title: "Page not found"
  }
];
