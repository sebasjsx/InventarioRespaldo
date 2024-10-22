import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./pages/security/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'forgetPassword',
        loadChildren: () => import('./pages/security/forget-password/forget-password.module').then(m => m.ForgetPasswordModule)
    },
    {
        path: 'changePassword',
        loadChildren: () => import('./pages/security/change-password/change-password.module').then(m => m.ChangePasswordModule)
    },
    {
        path: 'restorePassword',
        loadChildren: () => import('./pages/security/restore-password/restore-password.module').then(m => m.RestorePasswordModule)
    },
    {
        path: 'register',
        loadChildren: () => import('./pages/security/register/register.module').then(m => m.RegisterModule)
    },
    {
        path: 'notFound',
        loadChildren: () => import('./pages/general/not-found/not-found.module').then(m => m.NotFoundModule)
    },
    {
        path: 'unauthorized',
        loadChildren: () => import('./pages//general/unauthorized/unauthorized.module').then(m => m.UnauthorizedModule)
    },
    {
        path: 'home',
        loadChildren: () => import('./pages/general/home/home.module').then(m => m.HomeModule)
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'notFound' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
