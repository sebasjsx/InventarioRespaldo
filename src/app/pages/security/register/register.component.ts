import { Component } from '@angular/core';
import { RegisterService } from './service/register.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRegister } from '../../admin/users/interface/users.module';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @BlockUI() blockUI!: NgBlockUI;
  name = '';
  surname = '';
  username = '';
  age: number | null = null;
  phone = '';
  email = '';
  errorMessage = '';


  newUser: UserRegister = {
    id: 0,
    email: '',
    name: '',
    surname: '',
    username: '',
    age: 0,
    phone: '',
    status: true,
    resource: []
  };

  constructor(
    private registerService: RegisterService, 
    private router: Router,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  onRegister(): void {
    if (this.isFormValid()) {
      const userData: UserRegister = {
        id: null, 
        name: this.name,
        surname: this.surname,
        username: this.username,
        age: this.age,
        phone: this.phone,
        email: this.email,
        status: true, 
        resource: []
      };
  
      this.blockUI.start(this.translate.instant('LOADING'));
  
      this.registerService.postUser(userData).subscribe({
        next: () => {
          this.resetForm();
          this.router.navigate(['/login']);
          this.snackBar.open(
            this.translate.instant('USER.CREATE_SUCCESS'),
            this.translate.instant('USER.CLOSE'),
            { duration: 5000 }

          );
          this.blockUI.stop();
        },
        error: (error) => {
          console.error('Error en el registro:', error);
          this.snackBar.open(
            this.translate.instant('USER.CREATE_ERROR'),
            this.translate.instant('USER.CLOSE'),
            { duration: 5000 }
          );
          this.handleError(error);
          this.blockUI.stop();
        }
      });
    } else {
      this.snackBar.open(
        this.translate.instant('USER.VALIDATION_ERROR'),
        this.translate.instant('USER.CLOSE'),
        { duration: 5000 }
      );
    }
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

  isFormValid(): boolean {
    return (
      this.name.trim().length > 0 &&
      this.surname.trim().length > 0 &&
      this.username.trim().length > 0 &&
      this.age !== null &&
      this.age >= 18 &&
      this.phone.trim().length > 0 &&
      this.email.trim().length > 0
    );
  }

  resetForm(): void {
    this.name = '';
    this.surname = '';
    this.username = '';
    this.age = null;
    this.phone = '';
    this.email = '';

    this.newUser = {
      id: 0,
      email: '',
      name: '',
      surname: '',
      username: '',
      age: 0,
      phone: '',
      status: true,
      resource: []
    };

    this.errorMessage = '';
  }
}