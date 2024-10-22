import { Component } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Product, ProductData } from './interface/product.module';
import { Company, CompanyData } from '../company/interface/company.module';
import { Category, CategoryData } from '../category/interface/category.model';
import { ListReusable } from 'src/app/shared/interfaces/table-column';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from './service/product.service';
import { CompanyService } from '../company/service/company.service';
import { CategoryService } from '../category/service/category.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @BlockUI() blockUI!: NgBlockUI;

  name: string = '';
  deliveryTime: number | null = null;
  barCode: string = '';
  description: string = '';
  availableQuantity: number | null = null;
  price: number | null = null;
  status: boolean = true;
  companyId: number | null = null;
  categoryId: number | null = null;

  isEditing: boolean = false;
  selectedProductId: string | null = null;

  companiesData: Company[] = [];
  categoriesData: Category[] = [];
  selectedCompanyId: number | null = null;
  selectedCategoryId: number | null = null;

  productsData: Product[] = [];
  productColumns: ListReusable[] = [
    { def: 'name', header: 'Nombre de winery' }
  ];

  currentPage = 0;
  pageSize = 8;
  totalProducts = 0;
  inputSearch: string = '';

  constructor(
    public productsService: ProductService,
    public companiesService: CompanyService,
    public categoriesService: CategoryService,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCompanies();
    this.loadCategories();
  }

  loadCompanies(): void {
    this.companiesService.getData().subscribe((response: CompanyData) => {
      this.companiesData = response.data.content;
      console.log(response);
    });
  }

  loadCategories(): void {
    this.categoriesService.getData().subscribe((response: CategoryData) => {
      this.categoriesData = response.data.content;
      console.log(response);
    });
  }

  loadProducts(page: number = this.currentPage, size: number = this.pageSize): void {
    this.productsService.getData(page, size).subscribe((response: ProductData) => {
      this.productsData = response.data.content;
      this.totalProducts = response.data.totalElements;
      console.log(response);
    });
  }

  handlePageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProducts(this.currentPage, this.pageSize);
  }

  createOrUpdateProduct(): void {
    this.isEditing && this.selectedProductId ? this.updateProduct() : this.createProduct();
  }

  createProduct(): void {
    const productData: Product = {
      id: 0,
      name: this.name,
      deliveryTime: this.deliveryTime ?? 0,
      barCode: this.barCode,
      availableQuantity: this.availableQuantity ?? 0,
      description: this.description,
      price: this.price ?? 0,
      companyId: this.selectedCompanyId ?? 0,
      categoryId: this.selectedCategoryId ?? 0,
      status: this.status,
    };
    this.blockUI.start(this.translate.instant('LOADING'));

    this.productsService.createProduct(productData).subscribe({
      next: () => {
        this.resetForm();
        this.loadProducts();
        this.snackBar.open(
          this.translate.instant('PRODUCT.CREATE_SUCCESS'),
          this.translate.instant('PRODUCT.CLOSE'),
          { duration: 5000 }
        );
        this.blockUI.stop();
      },
      error: () => {
        this.snackBar.open(
          this.translate.instant('PRODUCT.CREATE_ERROR'),
          this.translate.instant('PRODUCT.CLOSE'),
          { duration: 5000 }
        );
        this.blockUI.stop();
      }
    });
  }

  updateProduct(): void {
    const productData: Product = {
      id: Number(this.selectedProductId),
      name: this.name,
      deliveryTime: this.deliveryTime ?? 0,
      barCode: this.barCode,
      availableQuantity: this.availableQuantity ?? 0,
      description: this.description,
      price: this.price ?? 0,
      companyId: this.selectedCompanyId ?? 0,
      categoryId: this.selectedCategoryId ?? 0,
      status: this.status,
    };
    this.blockUI.start(this.translate.instant('LOADING'));

    this.productsService.updateProduct(Number(this.selectedProductId), productData).subscribe({
      next: () => {
        this.resetForm();
        this.loadProducts();
        this.snackBar.open(
          this.translate.instant('PRODUCT.UPDATE_SUCCESS'),
          this.translate.instant('PRODUCT.CLOSE'),
          { duration: 5000 }
        );
        this.blockUI.stop();
      },
      error: () => {
        this.snackBar.open(
          this.translate.instant('PRODUCT.UPDATE_ERROR'),
          this.translate.instant('PRODUCT.CLOSE'),
          { duration: 5000 }
        );
        this.blockUI.stop();
      }
    });
  }

  clearSearch(): void {
    this.inputSearch = '';
    this.loadProducts();
  }

  searchProducts(): void {
    this.productsService.search(this.inputSearch).subscribe({
      next: (response) => {
        this.productsData = response.data as unknown as Product[];
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
      this.selectedProductId = item.id;
      this.name = item.name;
      this.deliveryTime = item.deliveryTime;
      this.barCode = item.barCode;
      this.availableQuantity = item.availableQuantity;
      this.description = item.description;
      this.price = item.price;
      this.selectedCompanyId = item.companyId;
      this.selectedCategoryId = item.categoryId;
      this.status = item.status;
      this.isEditing = true;
    } else {
      this.resetForm();
      this.isEditing = false;
    }
  }

  resetForm(): void {
    this.name = '';
    this.deliveryTime = null;
    this.barCode = '';
    this.availableQuantity = null;
    this.description = '';
    this.price = null;
    this.selectedCompanyId = null;
    this.selectedCategoryId = null;
    this.status = false;
    this.selectedProductId = null;
    this.isEditing = false;
  }

}
