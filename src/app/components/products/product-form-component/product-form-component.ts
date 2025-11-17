import { Component, NgModule } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductModel } from '../../../core/models/product-model';
import { ProductService } from '../../../services/product/product-service';
import { ApiResponse } from '../../../core/models/api-response';
import { environment } from '../../../../environments/environment';
import { CustomToasterService } from '../../../services/toaster/custom-toaster-service';
import { CategoryService } from '../../../services/category/category-service';
import { CategoryModel } from '../../../core/models/category-model';
import { ReusableButtonComponent } from '../../reusable-components/reusable-button-component/reusable-button-component';
import { ReusableImageComponent } from '../../reusable-components/reusable-image-component/reusable-image-component';

@Component({
  selector: 'app-product-form-component',
  imports: [FormsModule, CommonModule, RouterLink, RouterLinkActive,ReusableButtonComponent, ReusableImageComponent],
  templateUrl: './product-form-component.html',
  styleUrl: './product-form-component.css',
})

export class ProductFormComponent {
  product: ProductModel = {
    id: 0,
    name: '',
    price: 0,
    imagePath: null,
    imageFile: null,
    description: null,
    stock: null,
    isActive: true,
    createdAt: null,
    updatedAt: null,
    categories: null,
    categoryId: null,
    categoryName: null
  };
  categories: CategoryModel[] = []
  imageBaseUrl: string = environment.apiBaseUrl.replace('/api', '/')
  isEditMode = false;
  isInvalidImage = false;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: CustomToasterService
  ) { }

  ngOnInit(): void {

    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;

        // Check if route has an ID
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
          this.isEditMode = true;
          this.productService.getProductById(+id).subscribe({
            next: (data) => {
              if (data.isSuccess) {
                this.product = data.data;
              } else {
                sessionStorage.setItem('toastMessage', JSON.stringify(data));
                this.router.navigate(['/product/list']);
              }
            },
            error: (err) => console.error('API Error:', err),
          });
        }
      },
      error: (err) => console.error('API Error:', err),
    });
  }

  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      this.isInvalidImage = false;
      this.previewUrl = null;
      this.product.imageFile = null;
      return;
    }

    const file = input.files[0];
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    this.product.imageFile = file;

    if (!allowedTypes.includes(file.type)) {
      this.isInvalidImage = true;
      this.previewUrl = null;
      return;
    }

    // valid file
    this.isInvalidImage = false;

    const reader = new FileReader();
    reader.onload = () => {
      // No more ExpressionChanged errors
      this.previewUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

  removeImage() {
    this.previewUrl = null;
    this.product.imageFile = null;
    this.product.imagePath = null;
    this.isInvalidImage = false;

    const input = document.getElementById("imageFile") as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }

  onResetForm(form: NgForm) {
    form.resetForm();
    this.previewUrl = null;
    this.product.imageFile = null;
    this.isInvalidImage = false;

    const input = document.getElementById("imageFile") as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const formData = new FormData();

      if (this.product.id != 0) {
        formData.append('Id', this.product.id.toString());
      }
      formData.append('Name', this.product.name);
      if (this.product.description)
        formData.append('Description', this.product.description);
      formData.append('Price', this.product.price.toString());
      formData.append('Stock', this.product.stock ? this.product.stock.toString() : '');
      formData.append('IsActive', this.product.isActive.toString());
      if (this.product.imageFile) {
        formData.append('ImageFile', this.product.imageFile);
      }
      if (this.product.imagePath) {
        formData.append('ImagePath', this.product.imagePath);
      }
      formData.append('CategoryId', this.product.categoryId!.toString());

      this.productService.saveProduct(formData).subscribe({
        next: (data: ApiResponse<ProductModel>) => {

          if (data.isSuccess) {
            sessionStorage.setItem('toastMessage', JSON.stringify(data));
            this.router.navigate(['/product/list']);
          } else {
            this.toast.error(data.message)
          }
        },
        error: (err) => console.error('API Error:', err)
      })
    } else {
      form.form.markAllAsTouched();
    }
  }
}
