import { Component, OnInit } from '@angular/core';
import { UsersService } from './service/users.service';
import { ListReusable } from 'src/app/shared/interfaces/table-column';
import { ProfilesService } from '../profile/service/profiles.service';
import { ProfileData, Profile } from '../profile/interface/profile.model';
import { User, UserData } from './interface/users.module';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  usersData: User[] = [];
  email: string = '';
  name: string = '';
  surname: string = '';
  username: string = '';
  age: number | null = null;
  status: boolean = true;
  phone: string = '';
  userColumns: ListReusable[] = [
    { def: 'name', header: 'Nombre' },
    { def: 'correo', header: 'email' }
  ];
  buttonLabel: string = 'Guardar';
  successMessage: string | null = null;
  errorMessage: string | null = null;
  profilesData: Profile[] = [];
  selectedProfileId: number | null = null;
  selectedUserId: string | null = null;
  isEditing = false;
  currentPage = 0;
  pageSize = 8;
  totalUsers = 0;
  profileId: number | null = null
  inputSearch: string = '';

  constructor(
    public userService: UsersService,
    public profilesService: ProfilesService,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadProfiles();
  }

  loadUsers(page: number = this.currentPage, size: number = this.pageSize): void {
    this.userService.getData(page, size).subscribe((response: UserData) => {
      this.usersData = response.data.content;
      this.totalUsers = response.data.totalElements;
      console.log(response);
    });
  }

  handlePageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProfiles();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsers(this.currentPage, this.pageSize);
  }

  loadProfiles(): void {
    this.profilesService.getData().subscribe((response: ProfileData) => {
      this.profilesData = response.data.content;
    });
  }

  createOrUpdateUser(): void {
    this.isEditing ? this.updateUser() : this.createUser();
  }

  createUser(): void {
    const userData: User = {
      id: 0,
      name: this.name,
      surname: this.surname,
      username: this.username,
      email: this.email,
      phone: this.phone,
      age: this.age ?? 0,
      profileId: this.selectedProfileId ?? 0,
      status: this.status,
    };
  
    this.blockUI.start(this.translate.instant('LOADING'));
  
    this.userService.createUser(userData).subscribe({
      next: () => {
        this.resetForm();
        this.loadUsers();
        this.snackBar.open(
          this.translate.instant('USER.CREATE_SUCCESS'),
          this.translate.instant('USER.CLOSE'),
          { duration: 5000 }
        );
        this.blockUI.stop();
      },
      error: (error) => {
        this.handleError(error);
        this.blockUI.stop();
      }
    });
  }

  updateUser(): void {
    const userData: User = {
      id: Number(this.selectedUserId),
      name: this.name,
      surname: this.surname,
      username: this.username,
      email: this.email,
      phone: this.phone,
      age: this.age ?? 0,
      profileId: this.selectedProfileId ?? 0,
      status: this.status
    };
  
    this.blockUI.start(this.translate.instant('LOADING'));
  
    this.userService.updateUser(Number(this.selectedUserId), userData).subscribe({
      next: () => {
        this.resetForm();
        this.loadUsers();
        this.snackBar.open(
          this.translate.instant('USER.UPDATE_SUCCESS'),
          this.translate.instant('USER.CLOSE'),
          { duration: 5000 }
        );
        this.blockUI.stop();
      },
      error: (error) => {
        this.handleError(error);
        this.blockUI.stop();
      }
    });
  }

  handleError(error: any): void {
    let errorMessage = this.translate.instant('USER.CREATE_ERROR'); 
    if (error && error.error) {
      if (error.error.description) {
        errorMessage = error.error.description;
      } else if (error.error.detail) {
        errorMessage = error.error.detail; 
      } else {
        errorMessage = error.error.title || this.translate.instant('USER.CREATE_ERROR');
      }
    }
    this.snackBar.open(
      errorMessage,
      this.translate.instant('USER.CLOSE'),
      { duration: 5000 }
    );
  }

  clearSearch(): void {
    this.inputSearch = '';
    this.loadUsers();
  }

  searchUsers(): void {
    this.userService.searchUsers(this.inputSearch).subscribe({
      next: (response) => {
        this.usersData = response.data as unknown as User[];
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

  onUserSelected(item: any): void {
    if (item) {
      this.selectedUserId = item.id;
      this.name = item.name;
      this.surname = item.surname;
      this.username = item.username;
      this.email = item.email;
      this.phone = item.phone;
      this.age = item.age;
      this.selectedProfileId = item.profileId;
      this.status = item.status;
      this.isEditing = true;
    } else {
      this.resetForm();
      this.isEditing = false;
    }
  }

  resetForm(): void {
    this.name = '';
    this.email = '';
    this.surname = '';
    this.username = '';
    this.phone = '';
    this.age = null;
    this.profileId = null;
    this.status = false;
    this.selectedUserId = null;
    this.isEditing = false;
  }

}