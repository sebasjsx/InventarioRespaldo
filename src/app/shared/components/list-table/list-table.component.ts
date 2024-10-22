import { Component, Input, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ListReusable } from '../../interfaces/table-column';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { UsersService } from 'src/app/pages/admin/users/service/users.service';
import { ProfilesService } from 'src/app/pages/admin/profile/service/profiles.service';
import { CategoryService } from 'src/app/pages/inventory/category/service/category.service';
import { CompanyService } from 'src/app/pages/inventory/company/service/company.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { WineryService } from 'src/app/pages/inventory/winery/service/winery.service';
import { ProductService } from 'src/app/pages/inventory/product/service/product.service';
import { PurchaseService } from 'src/app/pages/inventory/purchase/service/purchase.service';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss'],
})
export class ListTableComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  dataSource: any[] = [];
  tableDisplayColumns: string[] = [];
  tableColumns: ListReusable[] = [];
  paginatedData: any[] = [];
  currentPage = 0;
  selectedItem: any = null;

  @Input() dataType: 'users' | 'profiles' | 'categories' | 'company' | 'wineries' | 'products'| 'purchase' = 'users';
  @Input() userService!: UsersService;
  @Input() profileService!: ProfilesService;
  @Input() categoryService!: CategoryService;
  @Input() companyService!: CompanyService;
  @Input() wineryService!: WineryService;
  @Input() productService!: ProductService;
  @Input() purchaseService!: PurchaseService;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() totalSize!: number;
  @Input() pageSize = 8;


  @Input() set data(data: any) {
    this.dataSource = data;
    this.updatePaginatedData();
  }

  @Input() set columns(columns: ListReusable[]) {
    this.tableColumns = columns;
    this.tableDisplayColumns = this.tableColumns.map((col) => col.def);
  }

  @Output() itemSelected = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<PageEvent>();

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.setColumnsAndData();
    this.updatePaginatedData();
  }

  setColumnsAndData() {
    if (this.dataType === 'users') {
      this.tableDisplayColumns = ['username', 'email', 'status'];
    } else if (this.dataType === 'profiles') {
      this.tableDisplayColumns = ['name', 'description', 'status'];
    } else if (this.dataType === 'categories') {
      this.tableDisplayColumns = ['categoryName', 'description', 'status'];
    } else if (this.dataType === 'company') {
      this.tableDisplayColumns = ['companyName', 'phone', 'direccion', 'telefono', 'status'];
    } else if (this.dataType === 'wineries') {
      this.tableDisplayColumns = ['name', 'address'];
    } else if (this.dataType === 'products') {
      this.tableDisplayColumns = ['name', 'address'];
    } else if (this.dataType === 'purchase'){
      this.tableDisplayColumns =['wineryName', 'datePurchase', 'totalPurchase'];
    }
  }

  updatePaginatedData(): void {
    this.paginatedData = this.dataSource;
  }

  handlePageEvent(event: PageEvent): void {
    this.pageChange.emit(event);
  }

  selectItem(item: any): void {
    if (this.selectedItem === item) {
      this.selectedItem = null;
    } else {
      this.selectedItem = item;
    }
    this.itemSelected.emit(this.selectedItem);
  }

  deleteItem(): void {
    if (this.selectedItem) {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        width: '250px',
        data: { item: this.selectedItem, type: this.dataType },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.blockUI.start(this.translate.instant('LOADING'));

          switch (this.dataType) {
            case 'users':
              this.userService.deleteUserById(this.selectedItem.id).subscribe({
                next: () => this.DeleteSucess('USER.DELETE_SUCCESS', 'USER.CLOSE'),
                error: () => this.DeleteError('USER.DELETE_ERROR', 'USER.CLOSE'),
              });
              break;

            case 'profiles':
              this.profileService.deleteProfileById(this.selectedItem.profileId).subscribe({
                next: () => this.DeleteSucess('PROFILES.DELETE_SUCCESS', 'PROFILES.CLOSE'),
                error: () => this.DeleteError('PROFILES.DELETE_ERROR', 'PROFILES.CLOSE'),
              });
              break;

            case 'categories':
              this.categoryService.deleteCategoryById(this.selectedItem.categoryId).subscribe({
                next: () => this.DeleteSucess('CATEGORY.DELETE_SUCCESS', 'CATEGORY.CLOSE'),
                error: () => this.DeleteError('CATEGORY.DELETE_ERROR', 'CATEGORY.CLOSE'),
              });
              break;

            case 'company':
              this.companyService.deleteCompanyById(this.selectedItem.companyId).subscribe({
                next: () => this.DeleteSucess('COMPANY.DELETE_SUCCESS', 'COMPANY.CLOSE'),
                error: () => this.DeleteError('COMPANY.DELETE_ERROR', 'COMPANY.CLOSE'),
              });
              break;

            case 'wineries':
              this.wineryService.deleteWineryById(this.selectedItem.id).subscribe({
                next: () => this.DeleteSucess('WINERY.DELETE_SUCCESS', 'WINERY.CLOSE'),
                error: () => this.DeleteError('WINERY.DELETE_ERROR', 'WINERY.CLOSE'),
              });
              break;
            case 'products':
              this.productService.deleteProductById(this.selectedItem.id).subscribe({
                next: () => this.DeleteSucess('PRODUCT.DELETE_SUCCESS', 'PRODUCT.CLOSE'),
                error: () => this.DeleteError('PRODUCT.DELETE_ERROR', 'PRODUCT.CLOSE'),
              });
              break;
            case 'purchase':
              this.purchaseService.deletePurchaseById(this.selectedItem.id).subscribe({
                next: () => this.DeleteSucess('PURCHASE.DELETE_SUCCES', 'PURCHASE.CLOSE'),
                error: () => this.DeleteError('PURCHASE.DELETE_ERROR', 'PURCHASE.CLOSE')
              });
              break;
            default:
              this.blockUI.stop();
              break;
          }
        }
      });
    }
  }

  DeleteSucess(successMessage: string, closeMessage: string): void {
    this.dataSource = this.dataSource.filter((item: any) => item !== this.selectedItem);
    this.updatePaginatedData();
    this.snackBar.open(this.translate.instant(successMessage), this.translate.instant(closeMessage), {
      duration: 3000,
    });
    this.selectedItem = null;
    this.itemSelected.emit(this.selectedItem);
    this.blockUI.stop();
  }

  DeleteError(errorMessage: string, closeMessage: string): void {
    this.snackBar.open(this.translate.instant(errorMessage), this.translate.instant(closeMessage), {
      duration: 3000,
    });
    this.blockUI.stop();
  }
}