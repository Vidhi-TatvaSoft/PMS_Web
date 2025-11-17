import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CustomToasterService } from './services/toaster/custom-toaster-service';
import { ProductListComponent } from './components/products/product-list-component/product-list-component';
import { ProductFormComponent } from './components/products/product-form-component/product-form-component';
import { deleteCookie } from './core/common-methods/cookie-helper';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('PMS_Web');
  constructor(private router: Router){}


  logout() {
    console.log("sdvsdv")
    deleteCookie("authToken");
    this.router.navigate(['/login']);
  }

}
