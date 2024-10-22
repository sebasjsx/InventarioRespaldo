import { Component } from '@angular/core';
import { RestorePasswordService } from './service/restore-password.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  recoverPasswordForm: FormGroup;
  @BlockUI() blockUI!: NgBlockUI;
  constructor(
    private fb: FormBuilder,
    private restorePasswordService: RestorePasswordService,
    private snackBar: MatSnackBar, 
    private router: Router,
    private translate: TranslateService
  ) {
    this.recoverPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    this.blockUI.start(this.translate.instant('LOADING'));
    if (this.recoverPasswordForm.valid) {
      const email = this.recoverPasswordForm.value.email;
      localStorage.setItem('userEmail', email);
      this.restorePasswordService.recoverPassword(email).subscribe({
        next: (response: string) => {
          console.log('Recover password:', response);
          this.router.navigate(['/restorePassword']); 
          this.snackBar.open(this.translate.instant('FORGET_PASSWORD.CONFIRM_SUCCES'), this.translate.instant('FORGET_PASSWORD.CONFIRM_BUTTON'), {
            duration: 5000,
          });
          this.blockUI.stop();
        },
        error: error => {
          console.error('Error:', error);
          this.snackBar.open(this.translate.instant('FORGET_PASSWORD.CONFIRM_ERROR'), this.translate.instant('FORGET_PASSWORD.CONFIRM_BUTTON'), {
            duration: 5000,
          });
          this.blockUI.stop();
        }
      });
    }
  }
}
