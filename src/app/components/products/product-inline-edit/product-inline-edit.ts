import { Component } from '@angular/core';
import { ProductModel, ProductModelPartial } from '../../../core/models/product-model';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product/product-service';
import { ApiResponse } from '../../../core/models/api-response';
import { Route, Router } from '@angular/router';
import { CustomToasterService } from '../../../services/toaster/custom-toaster-service';
import { CommonModule } from '@angular/common';
import { filterModel } from '../../../core/models/filters-model';
import { environment } from '../../../../environments/environment';
import { CategoryService } from '../../../services/category/category-service';
import { CategoryModel } from '../../../core/models/category-model';

@Component({
  selector: 'app-product-inline-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-inline-edit.html',
  styleUrl: './product-inline-edit.css',
})
export class ProductInlineEdit {
  products: ProductModel[] = [];
  productsForm: FormArray;
  editRowIndex: number | null = null;
  categories: CategoryModel[] = [];
  filters: filterModel = {
    search: null,
    categorySelect: null,
    fromDate: null,
    toDate: null,
    sortColumn: null,
    sortorder: "asc"
  }

  // Track preview URL per row
  previewUrls: (string | ArrayBuffer | null)[] = [];
  // Track invalid image per row
  invalidImages: boolean[] = [];
  imageBaseUrl: string = environment.apiBaseUrl.replace('/api', '/')

  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private toast: CustomToasterService
  ) {
    this.productsForm = this.fb.array([]);
  }

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      }
    })
  }

  loadProducts() {
    this.productService.getAllProducts(this.filters).subscribe(data => {
      this.products = data;

      // Create form array
      this.productsForm = this.fb.array(
        this.products.map(p => this.fb.group({
          name: [p.name, [Validators.required]],
          price: [p.price, [Validators.required, Validators.min(0.01)]],
          categoryId: [p.categoryId, Validators.required],
          imageFile: [null] // for new file upload
        }))
      );
    });
  }

  startEdit(index: number) {
    this.editRowIndex = index;
  }

  cancelEdit() {
    if (this.editRowIndex !== null) {
      const p = this.products[this.editRowIndex];
      this.productsForm.at(this.editRowIndex).patchValue({
        name: p.name,
        price: p.price,
        categoryId: p.categoryId,
        imageFile: null
      });
    }
    this.editRowIndex = null;
  }


  onImageChange(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      this.invalidImages[index] = false;
      this.previewUrls[index] = null;
      this.productsForm.at(index).patchValue({ imageFile: null });
      return;
    }

    const file = input.files[0];
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    this.productsForm.at(index).patchValue({ imageFile: file });

    if (!allowedTypes.includes(file.type)) {
      this.invalidImages[index] = true;
      this.previewUrls[index] = null;
      return;
    }

    // valid file
    this.invalidImages[index] = false;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrls[index] = reader.result;
    };
    reader.readAsDataURL(file);
  }


  save(index: number) {
    const rowForm = this.productsForm.at(index) as FormGroup;
    if (rowForm.invalid) {
      rowForm.markAllAsTouched();
      return;
    }

    const updatedProduct = {
      ...this.products[index],
      ...rowForm.value
    } as ProductModelPartial;

    let formData: FormData | null = null;

    formData = new FormData();
    formData.append('id', updatedProduct.id.toString());
    formData.append('name', updatedProduct.name);
    formData.append('price', updatedProduct.price.toString());
    formData.append('categoryId', updatedProduct.categoryId!.toString());
    if (updatedProduct.imageFile) {
      formData.append('imageFile', updatedProduct.imageFile);
    }

    this.productService.saveProduct(formData).subscribe({
      next: (data: ApiResponse<ProductModel>) => {

        if (data.isSuccess) {
          this.toast.success(data.message)
          this.loadProducts();
          this.cancelEdit();
        } else {
          this.toast.error(data.message)
        }
      },
      error: (err) => console.error('API Error:', err)
    })
  }

  getFormGroup(index: number): FormGroup {
    return this.productsForm.at(index) as FormGroup;
  }
}
