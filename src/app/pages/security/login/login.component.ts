import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './service/login.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @BlockUI() blockUI!: NgBlockUI;
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private translate: TranslateService,
    private snackBar: MatSnackBar
  ) { }

  login(): void {
    this.blockUI.start(this.translate.instant('LOADING')); // bloquear ui
  
    this.loginService.login(this.email, this.password).subscribe({
      next: response => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
        this.snackBar.open(this.translate.instant('LOGIN.LOGIN_SUCCESS'), this.translate.instant('LOGIN.CLOSE'), {
          duration: 5000,
        });
        this.blockUI.stop(); // desbloquear la ui
      },
      error: error => {
        this.errorMessage = this.translate.instant('LOGIN.CREDENTIALS_INCORRECT');
        this.snackBar.open(this.errorMessage, this.translate.instant('LOGIN.CLOSE'), {
          duration: 5000,
        });
        this.blockUI.stop(); // desbloquear la ui
      }
    });
  }
}
