import { Component } from '@angular/core';
import { ListReusable } from 'src/app/shared/interfaces/table-column';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Company, CompanyData } from './interface/company.module';
import { CompanyService } from './service/company.service';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent {
  @BlockUI() blockUI!: NgBlockUI;
  selectedStatus: boolean = true;
  name: string = '';
  description: string = '';
  phone: string = '';
  address: string = '';
  status: boolean = false;
  isEditing: boolean = false;
  inputSearch: string = '';
  selectedCompanyId: string | null = null;
  currentPage = 0;
  pageSize = 8;
  totalCompanies = 0;
  companyData: Company[] = [];
  companyColumns: ListReusable[] = [
    { def: 'name', header: 'Nombre de compañia' },
    { def: 'phone', header: 'Telefono de compañia'}
  ];

  constructor(
    public companyService: CompanyService,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadCompany();
  }

  loadCompany(page: number = this.currentPage, size: number = this.pageSize): void {
    this.companyService.getData(page, size).subscribe((response: CompanyData) => {
      this.companyData = response.data.content;
      this.totalCompanies = response.data.totalElements;
      console.log(response);
    });
  }

  handlePageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCompany();
  }
  
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCompany(this.currentPage, this.pageSize);
  }

  createOrUpdateCompany(): void {
    this.isEditing && this.selectedCompanyId ? this.updateCompany() : this.createCompany();
  }

  createCompany(): void {
    const companyData: Company = {
      companyId: 0,
      name: this.name,
      description: this.description,
      address: this.address,
      phone: this.phone,
      status: this.status,
    };

    this.blockUI.start(this.translate.instant('LOADING'));

    this.companyService.createCompany(companyData).subscribe({
      next: () => {
        this.resetForm();
        this.loadCompany();
        this.snackBar.open(
          this.translate.instant('COMPANY.CREATE_SUCCESS'),
          this.translate.instant('COMPANY.CLOSE'),
          { duration: 5000 }
        );
        this.blockUI.stop();
      },
      error: (error) => {
        this.snackBar.open(
          this.translate.instant('COMPANY.CREATE_ERROR'),
          this.translate.instant('COMPANY.CLOSE'),
          { duration: 5000 }
        );
        this.handleError(error)
        this.blockUI.stop();
      }
    });
  }

  updateCompany(): void {
    const companyData: Company = {
      companyId: Number(this.selectedCompanyId),
      name: this.name,
      description: this.description,
      address: this.address,
      phone: this.phone,
      status: this.status,
    };
    this.blockUI.start(this.translate.instant('LOADING'));

    this.companyService.updateCompany(Number(this.selectedCompanyId), companyData).subscribe({
      next: () => {
        this.resetForm();
        this.loadCompany();
        this.snackBar.open(
          this.translate.instant('COMPANY.UPDATE_SUCCESS'),
          this.translate.instant('COMPANY.CLOSE'),
          { duration: 5000 }
        );
        this.blockUI.stop();
      },
      error: (error) => {
        this.snackBar.open(
          this.translate.instant('COMPANY.UPDATE_ERROR'),
          this.translate.instant('COMPANY.CLOSE'),
          { duration: 5000 }
        );
        this.blockUI.stop();
        this.handleError(error)
      }
    });
  }

  searchCompany(): void {
    this.companyService.search(this.inputSearch).subscribe({
      next: (response) => {
        this.companyData = response.data as unknown as Company[];
        console.log(response);
      },
      error: (err) => {
        console.error('Error:', err);
        this.snackBar.open(
          this.translate.instant('COMPANY.SEARCH_ERROR'),
          this.translate.instant('COMPANY.CLOSE'),
          { duration: 5000 }
        );
      }
    });
    
  }

  handleError(error: any): void {
    let errorMessage = this.translate.instant('COMPANY.CREATE_ERROR'); 
    if (error && error.error) {
      if (error.error.description) {
        errorMessage = error.error.description;
      } else if (error.error.detail) {
        errorMessage = error.error.detail; 
      } else {
        errorMessage = error.error.title || this.translate.instant('COMPANY.CREATE_ERROR');
      }
    }
    this.snackBar.open(
      errorMessage,
      this.translate.instant('COMPANY.CLOSE'),
      { duration: 5000 }
    );
  }

  clearSearch(): void {
    this.inputSearch = '';
    this.loadCompany();
  }

  onItemSelected(item: any): void {
    if (item) {
      this.selectedCompanyId = item.companyId;
      this.name = item.name;
      this.description = item.description;
      this.address = item.address;
      this.phone = item.phone; 
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
    this.address = '';
    this.phone = '';
    this.status = false;
    this.selectedCompanyId = null;
    this.isEditing = false;
  }
}
