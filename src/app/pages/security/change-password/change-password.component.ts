import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { changePasswordService } from './service/changePassword.service';
import { ChangePassword } from './interface/changePassword.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  @BlockUI() blockUI!: NgBlockUI;
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  passwordsTwins: boolean = true;
  passwordValid: boolean = true;

  constructor(
    private changePasswordService: changePasswordService,
    private translate: TranslateService,
    private snackBar: MatSnackBar
  ) { }

  //validar que la contraseña tenga 8 caracteres minimos 1 numero y 1 caracter especial
  validatePassword() {
    let passwordCondition = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    this.passwordValid = passwordCondition.test(this.newPassword);
  }

  checkPasswords() {
    if (this.newPassword && this.confirmPassword) {
      this.passwordsTwins = this.newPassword === this.confirmPassword;
    }
    this.validatePassword();
  }

  changePassword() {
    if (this.passwordsTwins && this.passwordValid) {
      const changePasswordData: ChangePassword = {
        currentPassword: this.oldPassword,
        newPassword: this.newPassword,
        confirmationPassword: this.confirmPassword
      };

      this.blockUI.start(this.translate.instant('LOADING'));

      this.changePasswordService.changePassword(changePasswordData).subscribe({
        next: (response: string) => {
          console.log('Response:', response);
          this.snackBar.open(this.translate.instant('CHANGE_PASSWORD.PASSWORD_CHANGED_SUCCESS'), this.translate.instant('LOGIN.CLOSE'), {
            duration: 5000,
          });
          this.blockUI.stop();
        },
        error: (error: any) => {
          console.error('Error', error);
          this.snackBar.open(this.translate.instant('CHANGE_PASSWORD.CHANGE_PASSWORD_ERROR'), this.translate.instant('LOGIN.CLOSE'), {
            duration: 5000,
          });
          this.blockUI.stop();
        }
      });
    }
  }

}
