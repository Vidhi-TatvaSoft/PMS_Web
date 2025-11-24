import { Component } from '@angular/core';
import { CategoryModel } from '../../../core/models/category-model';
import { CustomToasterService } from '../../../services/toaster/custom-toaster-service';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from '../../../services/category/category-service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from '../../../dialogbox/confirm-dialog/confirm-dialog-component/confirm-dialog-component';
import { FormsModule } from '@angular/forms';
import { RoleService } from '../../../services/role/role-service';

@Component({
  selector: 'app-category-list-component',
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './category-list-component.html',
  styleUrl: './category-list-component.css',
})

export class CategoryListComponent {
  categories: CategoryModel[] = [];
  filteredCategories: CategoryModel[] = [];
  searchCategory: string = '';

  constructor(
    private categoryService: CategoryService,
    private toast: CustomToasterService,
    private dialog: MatDialog,
    public roleService: RoleService
  ) { }

  ngOnInit() {
    this.getAllCategories();

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

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.searchCategory = '';
        this.categories = data;
        this.filteredCategories = data;
      },
      error: (err) => this.toast.error("Something went wrong")
    });
  }

  confirmDelete(id: number, name: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Delete Confirmation",
        message: `<div>If you delete this category then products of this category will be deleted automatically.</div>
                  <div>Are you sure you want to delete category '${name}'?</div>`
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteCategory(id);
      }
    });
  }

  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe({
      next: (data) => {
        if (data.isSuccess)
          this.toast.success(data.message);
        else
          this.toast.error(data.message);
        this.getAllCategories();
      },
      error: (err) => this.toast.error("Something went wrong.")
    })
  }

  onSearchCategory() {
    let search = this.searchCategory.toLowerCase().trim();
    if (search) {
      this.filteredCategories = this.categories.filter(category => category.name.trim().toLowerCase().includes(search))
    } else {
      this.filteredCategories = this.categories;
    }
  }
}
