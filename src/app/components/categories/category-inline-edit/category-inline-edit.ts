import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CategoryModel } from '../../../core/models/category-model';
import { CategoryService } from '../../../services/category/category-service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ApiResponse } from '../../../core/models/api-response';
import { Route, Router } from '@angular/router';
import { Toast } from 'ngx-toastr';
import { CustomToasterService } from '../../../services/toaster/custom-toaster-service';

interface Person {
  id: number;
  name: string;
  age: number;
  isEditMode?: boolean; // temporary flag
  originalData?: Partial<Person>; // for cancel
}

@Component({
  selector: 'app-category-inline-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './category-inline-edit.html',
  styleUrl: './category-inline-edit.css',
})
export class CategoryInlineEdit {
  categories: CategoryModel[] = [];

  editId: number | null = null;
  editName: string = '';
  nameError: string = '';

  constructor(private categoryService: CategoryService,
    private router: Router,
    private toast: CustomToasterService
  ) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  startEdit(category: CategoryModel) {
    this.editId = category.id;
    this.editName = category.name;
    this.nameError = '';
  }

  validateName() {
    if (!this.editName.trim()) {
      this.nameError = "Name cannot be empty";
      return false;
    }
    if (this.editName.length < 3) {
      this.nameError = "Name must be at least 3 characters";
      return false;
    }
    this.nameError = '';
    return true;
  }

  save(category: CategoryModel) {
    if (!this.validateName()) return;
    console.log(category)
    const formData = new FormData();

    if (category.id != 0) {
      formData.append('Id', category.id.toString());
    }
    formData.append('Name', category.name);

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
    });
  }

  cancel() {
    this.editId = null;
    this.editName = '';
    this.nameError = '';
  }
}
