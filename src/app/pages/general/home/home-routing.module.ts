import { HomeComponent } from './home.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RoleGuard } from './../../../shared/guards/role.guard';

const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'users',
        loadChildren: () => import('../../admin/users/users.module').then(m => m.UsersModule),
        canActivate: [RoleGuard],
        data: { expectedRoles: ['ROLE_USERS', 'ROLE_ADMIN'] }
    },
    {
        path: 'profiles',
        loadChildren: () => import('../../admin/profile/profile.module').then(m => m.ProfileModule),
        canActivate: [RoleGuard],
        data: { expectedRoles: ['ROLE_PROFILE', 'ROLE_ADMIN'] }
    },
    {
        path: 'auditory',
        loadChildren: () => import('../../admin/auditory/auditory.module').then(m => m.AuditoryModule),
        canActivate: [RoleGuard],
        data: { expectedRoles: ['ROLE_AUDIT', 'ROLE_ADMIN'] }
    },
    {
        path: 'categories',
        loadChildren: () => import('../../inventory/category/category.module').then(m => m.CategoryModule),
        canActivate: [RoleGuard],
        data: { expectedRoles: ['ROLE_INVENTORY', 'ROLE_ADMIN'] }
    },
    {
        path: 'companies',
        loadChildren: () => import('../../inventory/company/company.module').then(m => m.CompanyModule),
    },
    {
        path: 'wineries',
        loadChildren: () => import('../../inventory/winery/winery.module').then(m => m.WineryModule),
        canActivate: [RoleGuard],
        data: { expectedRoles: ['ROLE_WINERY', 'ROLE_ADMIN'] }
    },
    {
        path: 'products',
        loadChildren: () => import('../../inventory/product/product.module').then(m => m.ProductModule),
        canActivate: [RoleGuard],
        data: { expectedRoles: ['ROLE_PRODUCT', 'ROLE_ADMIN'] }
    },
    {
        path: 'purchase',
        loadChildren: () => import('../../inventory/purchase/purchase.module').then(m => m.PurchaseModule),
        canActivate: [RoleGuard],
        data: { expectedRoles: ['ROLE_INVENTORY', 'ROLE_ADMIN'] }
    },
    {
        path: 'changePassword',
        loadChildren: () => import('../../security/change-password/change-password.module').then(m => m.ChangePasswordModule)
    },
    {
        path: 'notFound',
        loadChildren: () => import('../../general/not-found/not-found.module').then(m => m.NotFoundModule)
    },
    { path: '**', redirectTo: 'notFound' }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomeRoutingModule { }
