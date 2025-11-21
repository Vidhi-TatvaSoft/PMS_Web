import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoryModel } from '../../../core/models/category-model';
import { CategoryService } from '../../../services/category/category-service';
import { CustomToasterService } from '../../../services/toaster/custom-toaster-service';
import { ApiResponse } from '../../../core/models/api-response';

@Component({
  selector: 'app-category-form-component',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './category-form-component.html',
  styleUrl: './category-form-component.css',
})
export class CategoryFormComponent {
  category: CategoryModel = {
    id: 0,
    name: '',
    createdAt: null,
    updatedAt: null
  };

  isEditMode = false;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: CustomToasterService
  ) { }

  ngOnInit(): void {
    // Check if route has an ID
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.categoryService.getCategoryById(+id).subscribe({
        next: (data) => {
          if (data.isSuccess) {
            this.category = data.data;
          } else {
            sessionStorage.setItem('toastMessage', JSON.stringify(data));
            this.router.navigate(['/dashboard/category/list']);
          }
        },
        error: (err) => console.error('API Error:', err),
      });
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const formData = new FormData();

      if (this.category.id != 0) {
        formData.append('Id', this.category.id.toString());
      }
      formData.append('Name', this.category.name);

      this.categoryService.saveCategory(formData).subscribe({
        next: (data: ApiResponse<CategoryModel>) => {

          if (data.isSuccess) {
            sessionStorage.setItem('toastMessage', JSON.stringify(data));
            this.router.navigate(['/dashboard/category/list']);
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
