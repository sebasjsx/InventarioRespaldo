import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { WineryService } from './service/winery.service';
import { Winery, WineryData } from './interface/winery.module';
import { ListReusable } from 'src/app/shared/interfaces/table-column';
import { PageEvent } from '@angular/material/paginator';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { UsersService } from '../../admin/users/service/users.service';
import { UserData, User } from '../../admin/users/interface/users.module';

@Component({
  selector: 'app-winery',
  templateUrl: './winery.component.html',
  styleUrls: ['./winery.component.scss']
})
export class WineryComponent {
  @BlockUI() blockUI!: NgBlockUI;
  name: string = '';
  address: string = '';
  phone: string = '';
  maxCapacity: number | null = null;
  availableQuantity: number | null = null;
  status: boolean = true;
  userId: number | null = null
  isEditing: boolean = false;
  selectedWineryId: string | null = null;

  usersData: User[] = [];
  selectedUserId: number | null = null;
  wineriesData: Winery[] = [];
  wineryColumns: ListReusable[] = [
    { def: 'name', header: 'Nombre de winery' }
  ];

  currentPage = 0;
  pageSize = 8;
  totalWineries = 0;
  inputSearch: string = '';

  constructor(
    public WineriesService: WineryService,
    public userService: UsersService,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loadWineries();
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getData().subscribe((response: UserData) => {
      this.usersData = response.data.content;
      console.log(response);
    });
  }

  loadWineries(page: number = this.currentPage, size: number = this.pageSize): void {
    this.WineriesService.getData(page, size).subscribe((response: WineryData) => {
      this.wineriesData = response.data.content;
      this.totalWineries = response.data.totalElements;
      console.log(response);
    });
  }

  handlePageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadWineries();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadWineries(this.currentPage, this.pageSize);
  }

  createOrUpdateWinery(): void {
    this.isEditing && this.selectedWineryId ? this.updateWinery() : this.createWinery();
  }

  createWinery(): void {
    const wineryData: Winery = {
      id: 0,
      name: this.name,
      address: this.address,
      phone: this.phone,
      maxCapacity: this.maxCapacity ?? 0,
      availableQuantity: this.availableQuantity ?? 0,
      status: this.status,
    };
    console.log("Selected user ID:", this.selectedUserId);

    console.log(wineryData)
    this.blockUI.start(this.translate.instant('LOADING'));

    this.WineriesService.createWinery(wineryData).subscribe({
      next: () => {
        this.resetForm();
        this.loadWineries();
        this.snackBar.open(
          this.translate.instant('WINERY.CREATE_SUCCESS'),
          this.translate.instant('WINERY.CLOSE'),
          { duration: 5000 }
        );
        this.blockUI.stop();
      },
      error: (err) => {
        this.snackBar.open(
          this.translate.instant('WINERY.CREATE_ERROR'),
          this.translate.instant('WINERY.CLOSE'),
          { duration: 5000 }
        );
        this.handleError(err);
        this.blockUI.stop();
      }
    });
  }

  updateWinery(): void {
    const wineryData: Winery = {
      id: Number(this.selectedWineryId),
      name: this.name,
      address: this.address,
      phone: this.phone,
      maxCapacity: this.maxCapacity ?? 0,
      availableQuantity: this.availableQuantity ?? 0,
      status: this.status,
    };
    console.log("Selected user ID:", this.selectedUserId);

    console.log(wineryData)
    this.blockUI.start(this.translate.instant('LOADING'));

    this.WineriesService.updateWinery(Number(this.selectedWineryId), wineryData).subscribe({
      next: () => {
        this.resetForm();
        this.loadWineries();
        this.snackBar.open(
          this.translate.instant('WINERY.UPDATE_SUCCESS'),
          this.translate.instant('WINERY.CLOSE'),
          { duration: 5000 }
        );
        this.blockUI.stop();
      },
      error: (err) => {
        this.snackBar.open(
          this.translate.instant('WINERY.UPDATE_ERROR'),
          this.translate.instant('WINERY.CLOSE'),
          { duration: 5000 }
        );
        this.handleError(err);
        this.blockUI.stop();
      }
    });
  }

  clearSearch(): void {
    this.inputSearch = '';
    this.loadWineries();
  }

  searchWinery(): void {
    this.WineriesService.searchWinery(this.inputSearch).subscribe({
      next: (response) => {
        this.wineriesData = response.data as unknown as Winery[];
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

  handleError(error: any): void {
    let errorMessage = this.translate.instant('WINERY.CREATE_ERROR'); 
    if (error && error.error) {
      if (error.error.description) {
        errorMessage = error.error.description;
      } else if (error.error.detail) {
        errorMessage = error.error.detail; 
      } else {
        errorMessage = error.error.title || this.translate.instant('WYNERY.CREATE_ERROR');
      }
    }
    this.snackBar.open(
      errorMessage,
      this.translate.instant('WINERY.CLOSE'),
      { duration: 5000 }
    );
  }

  onItemSelected(item: any): void {
    if (item) {
      this.selectedWineryId = item.id;
      this.name = item.name;
      this.address = item.address;
      this.phone = item.phone;
      this.maxCapacity = item.maxCapacity;
      this.availableQuantity = item.availableQuantity;
      this.selectedUserId = item.userId;
      this.status = item.status;
      this.isEditing = true;
    } else {
      this.resetForm();
      this.isEditing = false;
    }
  }

  resetForm(): void {
    this.name = '';
    this.address = '';
    this.phone = '';
    this.availableQuantity = null;
    this.maxCapacity = null;
    this.selectedUserId = null;
    this.status = false;
    this.selectedWineryId = null;
    this.isEditing = false;
  }
}
