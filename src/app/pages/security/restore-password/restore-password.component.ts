import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResetPasswordService } from './service/reset-password.service';
import { TranslateService } from '@ngx-translate/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  restorePasswordForm: FormGroup;
  email!: string; 

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private restorePasswordService: ResetPasswordService,
    private snackBar: MatSnackBar, 
    private translate: TranslateService,
    private router: Router
  ) {

    this.restorePasswordForm = this.fb.group({
      email: [{ value: '', disabled: true }, Validators.required], 
      verificationCode: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.email = localStorage.getItem('userEmail') || '';

    if (this.email) {
    this.restorePasswordForm.patchValue({ email: this.email });
    } else {
    this.snackBar.open('No se encontró el email', 'Cerrar', { duration: 5000 });
    }
  }

  onSubmit(): void {
    this.blockUI.start(this.translate.instant('LOADING'));
    if (this.restorePasswordForm.valid) {
        const email = this.email; 
        const token = this.restorePasswordForm.value.verificationCode; 
        const newPassword = this.restorePasswordForm.value.newPassword; 

        this.restorePasswordService.updatePassword(email, token, newPassword).subscribe({
            next: (response: string) => {
                console.log('Contraseña actualizada:', response);
                this.router.navigate(['/login']);
                this.snackBar.open(
                this.translate.instant('RESTORE_PASSWORD.PASSWORD_SUCCES'), 
                this.translate.instant('RESTORE_PASSWORD.CLOSE'), 
                { duration: 5000 });
                this.blockUI.stop();
            },
            error: error => {
                console.error('Error:', error);
                this.snackBar.open(
                  this.translate.instant('RESTORE_PASSWORD.PASSWORD_ERROR'), 
                  this.translate.instant('RESTORE_PASSWORD.CLOSE'), 
                  { duration: 5000 });
                this.blockUI.stop();
            }
        });
    }
  }
}