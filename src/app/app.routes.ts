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
import { ForbidenComponent } from './components/error-pages/forbidden/forbiden-component/forbiden-component';
import { ObservableDemoComponent } from './components/rxjs/observable/observable-demo.component/observable-demo.component';
import { RxjsHomeComponent } from './components/rxjs/homepage/rxjs-home.component/rxjs-home.component';
import { SubscribeDemoComponent } from './components/rxjs/subscribe-demo.component/subscribe-demo.component';
import { SubjectDemoComponent } from './components/rxjs/subjects/subject-demo.component/subject-demo.component';
import { OperatorListComponent } from './components/rxjs/operators/operator-list.component/operator-list.component';
import { MapComponent } from './components/rxjs/operators/operators.compoent/map';
import { FilterComponent } from './components/rxjs/operators/operators.compoent/filter';
import { TakeComponent } from './components/rxjs/operators/operators.compoent/take';
import { SwitchMapComponent } from './components/rxjs/operators/operators.compoent/switch-map';
import { FirstComponent } from './components/rxjs/operators/operators.compoent/first';
import { DebounceTimeComponent } from './components/rxjs/operators/operators.compoent/debounce-time';
import { MergeMapComponent } from './components/rxjs/operators/operators.compoent/merge-map';
import { ConcatMapComponent } from './components/rxjs/operators/operators.compoent/concate-map';
import { TapComponent } from './components/rxjs/operators/operators.compoent/tap';
import { ReduceComponent } from './components/rxjs/operators/operators.compoent/reduce';
import { OfComponent } from './components/rxjs/operators/operators.compoent/creation-operators/of';
import { AjaxComponent } from './components/rxjs/operators/operators.compoent/creation-operators/ajax';
import { FromEventComponent } from './components/rxjs/operators/operators.compoent/creation-operators/from-event';
import { FromComponent } from './components/rxjs/operators/operators.compoent/creation-operators/from';
import { IntervalComponent } from './components/rxjs/operators/operators.compoent/creation-operators/interval';
import { TimerComponent } from './components/rxjs/operators/operators.compoent/creation-operators/timer';
import { ProductInlineEdit } from './components/products/product-inline-edit/product-inline-edit';
import { CombineLatestComponent } from './components/rxjs/operators/operators.compoent/join-creation-operators/combineLatest';
import { ConcatComponent } from './components/rxjs/operators/operators.compoent/join-creation-operators/concate';
import { ForkJoinComponent } from './components/rxjs/operators/operators.compoent/join-creation-operators/fork-join';
import { MergeComponent } from './components/rxjs/operators/operators.compoent/join-creation-operators/merge';
import { ZipComponent } from './components/rxjs/operators/operators.compoent/join-creation-operators/zip';
import { RaceComponent } from './components/rxjs/operators/operators.compoent/join-creation-operators/race';

export const routes: Routes = [
  { path: 'login', canActivate: [noAuthGuard], component: LoginComponent, title: "Login" },
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
          { path: 'inline-edit', component: ProductInlineEdit, title: "product edit" },
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
  { path: 'rxjs-demo', component: RxjsHomeComponent, title: "RxJs" },
  { path: 'observable', component: ObservableDemoComponent, title: "observable" },
  { path: 'subscription', component: SubscribeDemoComponent, title: "Subscription" },
  { path: 'subject', component: SubjectDemoComponent, title: "Subjects" },
  {
    path: 'operators', component: OperatorListComponent, title: "Operators",
    children: [
      { path: 'map', component: MapComponent, title: "Operator - Map" },
      { path: 'filter', component: FilterComponent, title: "Operator - Filter" },
      { path: 'take', component: TakeComponent, title: "Operator - Take" },
      { path: 'first', component: FirstComponent, title: "Operator - First" },
      { path: 'switch-map', component: SwitchMapComponent, title: "Operator - SwitchMap" },
      { path: 'merge-map', component: MergeMapComponent, title: "Operator - MergeMap" },
      { path: 'concat-map', component: ConcatMapComponent, title: "Operator - Concatemap" },
      { path: 'debounce-time', component: DebounceTimeComponent, title: "Operator - DebounceTime" },
      { path: 'tap', component: TapComponent, title: "Operator - Tap" },
      { path: 'reduce', component: ReduceComponent, title: "Operator - Reduce" },

      // creation
      { path: 'of', component: OfComponent, title: "Operator - Of" },
      { path: 'ajax', component: AjaxComponent, title: "Operator - Ajax" },
      { path: 'from-event', component: FromEventComponent, title: "Operator - Of" },
      { path: 'from', component: FromComponent, title: "Operator - From" },
      { path: 'interval', component: IntervalComponent, title: "Operator - Interval" },
      { path: 'timer', component: TimerComponent, title: "Operator - Timer" },

      //join
      {path:'combine-latest', component: CombineLatestComponent, title:"CombineLatest"},
      {path:'concat', component: ConcatComponent, title:"concat"},
      {path:'fork-join', component: ForkJoinComponent, title:"forkJoin"},
      {path:'merge', component: MergeComponent, title:"merge"},
      {path:'zip', component: ZipComponent, title:"zip"},
      {path:'race', component: RaceComponent, title:"race"},


      { path: '', redirectTo: 'map', pathMatch: 'full' } // default child route
    ]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' }, // default
  {
    path: '**',
    component: PageNotFoundComponent,
    title: "Page not found"
  }
];
