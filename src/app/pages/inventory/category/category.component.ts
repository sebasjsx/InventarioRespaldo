import { Component } from '@angular/core';
import { CategoryService } from './service/category.service';
import { Category, CategoryData } from './interface/category.model';
import { ListReusable } from 'src/app/shared/interfaces/table-column';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  @BlockUI() blockUI!: NgBlockUI;
  selectedStatus: boolean = true;
  name: string = '';
  description: string = '';
  status: boolean = false;
  isEditing: boolean = false;
  selectedCategoryId: string | null = null;

  categoriesData: Category[] = [];
  categoryColumns: ListReusable[] = [
    { def: 'name', header: 'Nombre de categoria' }
  ];

  currentPage = 0;
  pageSize = 8;
  totalCategories = 0;
  inputSearch: string = '';

  constructor(
    public CategoriesService: CategoryService,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(page: number = this.currentPage, size: number = this.pageSize): void {
    this.CategoriesService.getData(page, size).subscribe((response: CategoryData) => {
      this.categoriesData = response.data.content;
      this.totalCategories = response.data.totalElements;
      console.log(response);
    });
  }

  handlePageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCategories();
  }
  
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCategories(this.currentPage, this.pageSize);
  }

  createOrUpdateCategory(): void {
    this.isEditing && this.selectedCategoryId ? this.updateCategory() : this.createCategory();
  }

  createCategory(): void {
    const categoryData: Category = {
      categoryId: 0,
      name: this.name,
      description: this.description,
      status: this.status,
    };

    this.blockUI.start(this.translate.instant('LOADING'));

    this.CategoriesService.createCategory(categoryData).subscribe({
      next: () => {
        this.resetForm();
        this.loadCategories();
        this.snackBar.open(
          this.translate.instant('CATEGORY.CREATE_SUCCESS'),
          this.translate.instant('CATEGORY.CLOSE'),
          { duration: 5000 }
        );
        this.blockUI.stop();
      },
      error: () => {
        this.snackBar.open(
          this.translate.instant('CATEGORY.CREATE_ERROR'),
          this.translate.instant('CATEGORY.CLOSE'),
          { duration: 5000 }
        );
        this.blockUI.stop();
      }
    });
  }

  updateCategory(): void {
    const categoryData: Category = {
      categoryId: Number(this.selectedCategoryId),
      name: this.name,
      description: this.description,
      status: this.status,
    };
    this.blockUI.start(this.translate.instant('LOADING'));

    this.CategoriesService.updateCategory(Number(this.selectedCategoryId), categoryData).subscribe({
      next: () => {
        this.resetForm();
        this.loadCategories();
        this.snackBar.open(
          this.translate.instant('CATEGORY.UPDATE_SUCCESS'),
          this.translate.instant('CATEGORY.CLOSE'),
          { duration: 5000 }
        );
        this.blockUI.stop();
      },
      error: () => {
        this.snackBar.open(
          this.translate.instant('CATEGORY.UPDATE_ERROR'),
          this.translate.instant('CATEGORY.CLOSE'),
          { duration: 5000 }
        );
        this.blockUI.stop();
      }
    });
  }

  clearSearch(): void {
    this.inputSearch = '';
    this.loadCategories();
  }
  
  searchCategories(): void {
    this.CategoriesService.searchCategory(this.inputSearch).subscribe({
      next: (response) => {
        this.categoriesData = response.data as unknown as Category[];
        console.log(response);
      },
      error: (err) => {
        console.error('Error:', err);
        this.snackBar.open(
          this.translate.instant('PRODUCT.SEARCH_ERROR'),
          this.translate.instant('PRODUCT.CLOSE'),
          { duration: 5000 }
        );
      }
    });
    
  }

  onItemSelected(item: any): void {
    if (item) {
      this.selectedCategoryId = item.categoryId;
      this.name = item.name;
      this.description = item.description;
      this.status = item.status;
      this.isEditing = true;
    } else {
      this.resetForm();
      this.isEditing = false;
    }
  }

  resetForm(): void {
    this.name = '';
    this.description = '';
    this.status = false;
    this.selectedCategoryId = null;
    this.isEditing = false;
  }
}
