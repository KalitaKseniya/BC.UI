import { AuthGuard } from './shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
    {
      path: '',
      component: LoginPageComponent,
      pathMatch: 'full',
    },
    {
      path: 'register',
      component: RegistrationPageComponent,
      pathMatch: 'full',
    },
    {
      path: 'admin',
      loadChildren: () =>
        import('src/app/admin/admin.module').then((m) => m.AdminModule),
    },]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
