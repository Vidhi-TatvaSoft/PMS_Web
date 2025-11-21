import { Component, QueryList, ViewChild, ViewChildren, ViewContainerRef, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductModel } from '../../../core/models/product-model';
import { ProductService } from '../../../services/product/product-service';
import { environment } from '../../../../environments/environment';
import { CustomToasterService } from '../../../services/toaster/custom-toaster-service';
import { ConfirmDialogComponent } from '../../../dialogbox/confirm-dialog/confirm-dialog-component/confirm-dialog-component';
import { FormsModule } from '@angular/forms';
import { CategoryModel } from '../../../core/models/category-model';
import { CategoryService } from '../../../services/category/category-service';
import { filterModel } from '../../../core/models/filters-model';
import { ReusableButtonComponent } from '../../reusable-components/reusable-button-component/reusable-button-component';
import { ReusableImageComponent } from '../../reusable-components/reusable-image-component/reusable-image-component';
import { ProductDetailComponent } from '../product-detail-component/product-detail-component';
import { ProductDetailModel } from '../../../core/models/product-detail-model';

@Component({
  selector: 'app-product-list-component',
  imports: [CommonModule, RouterLink, RouterLinkActive, MatDialogModule, FormsModule, ReusableButtonComponent, ReusableImageComponent, ProductDetailComponent],
  templateUrl: './product-list-component.html',
  styleUrl: './product-list-component.css',
})
export class ProductListComponent {

  products: ProductModel[] = [];
  curDate = new Date();
  fromdate = new Date(this.curDate.getFullYear(), this.curDate.getMonth(), 1);

  // End of current month (23:59:59)
  toDate = new Date(this.curDate.getFullYear(), this.curDate.getMonth() + 1, 0, 23, 59, 59);
  // filteredProducts: ProductModel[] = [];
  categories: CategoryModel[] = [];
  filters: filterModel = {
    search: null,
    categorySelect: null,
    fromDate: this.formatDate(this.fromdate),
    toDate: this.formatDate(this.toDate),
    sortColumn: null,
    sortorder: "asc"
  }
  // searchProduct: string = '';
  // selectCategory = null;
  imageBaseUrl: string = environment.apiBaseUrl.replace('/api', '/')
  private searchTimeout: any; // used for debounce timer

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private toast: CustomToasterService,
    private dialog: MatDialog
  ) { }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  ngOnInit() {
    this.getAllcategories();
    this.getAllProducts();

    const storedToast = sessionStorage.getItem('toastMessage');
    if (storedToast) {
      const toastObject = JSON.parse(storedToast);
      if (toastObject.isSuccess) {
        this.toast.success(toastObject.message);
        sessionStorage.removeItem('toastMessage');
      } else {
        this.toast.error(toastObject.message);
        sessionStorage.removeItem('toastMessage');
      }
    }
  }

  getAllProducts() {
    this.expandedIndex = null;
    if (this.filters.fromDate && this.filters.toDate) {
      console.log("in")
      if (this.filters.fromDate < this.filters.toDate) {
        this.productService.getAllProducts(this.filters).subscribe({
          next: (data) => {
            this.products = data;
          },
          error: (err) => console.error('API Error:', err)
        });
      } else {
        this.toast.error("fromdate must be less than todate")
        this.filters.fromDate = this.formatDate(this.fromdate);
        this.filters.toDate = this.formatDate(this.toDate);
      }
    } else {
      this.toast.error("Select both fromdate and two date")
    }

  }

  getAllcategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => console.error('API Error:', err)
    })
  }

  debounce(func: Function, delay: number) {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(func, delay);
  }

  onSearchChange() {
    this.debounce(() => this.getAllProducts(), 400);
  }

  onSort(col: string, order: string) {
    this.filters.sortColumn = col;
    this.filters.sortorder = order;
    this.getAllProducts();
  }

  confirmDelete(id: number, name: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Delete Confirmation",
        message: `Are you sure you want to delete product '${name}'?`
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteProduct(id);
      }
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe({
      next: (data) => {
        if (data.isSuccess)
          this.toast.success(data.message);
        else
          this.toast.error(data.message);
        this.filters.categorySelect = null;
        this.filters.search = '';
        this.filters.fromDate = this.formatDate(this.fromdate);
        this.filters.toDate = this.formatDate(this.toDate);

        this.getAllProducts();
      },
      error: (err) => console.error("API Error:", err)
    })
  }

  // onSearchProduct() {
  //   let search = this.searchProduct.trim().toLowerCase();
  //   console.log(this.selectCategory)
  //   if (search || this.selectCategory) {
  //     this.filteredProducts = this.products.filter(product =>
  //       (product.name.toLowerCase().includes(search)
  //         || product.categoryName?.toLowerCase().includes(search))
  //       && (this.selectCategory ? product.categoryId == this.selectCategory : true));
  //     console.log(this.filteredProducts)
  //   } else {
  //     this.filteredProducts = this.products;
  //   }
  // }

  expandedIndex: number | null = null;
  expandData: ProductDetailModel | null = null;

  toggle(index: number, product: ProductModel, event: MouseEvent) {
    this.expandedIndex = this.expandedIndex === index ? null : index;

    this.expandData = {
      stock: product.stock,
      description: product.description,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    };

    const element = event.currentTarget as HTMLElement;
    const icon = element.querySelector("i");
    if (!icon) return;

    if (this.expandedIndex === index) {
      icon.classList.remove("bi-caret-right-fill");
      icon.classList.add("bi-caret-down-fill");
    } else {
      icon.classList.remove("bi-caret-down-fill");
      icon.classList.add("bi-caret-right-fill");
    }
  }
}
