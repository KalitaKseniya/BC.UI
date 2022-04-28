import { PartModelDetailsComponent } from './../part-models/part-model-details/part-model-details.component';
import { AccountPageComponent } from './../account-page/account-page.component';
import { AlertComponent } from './../shared/components/alert/alert.component';
import { ForbiddenPageComponent } from './../forbidden-page/forbidden-page.component';
import { AuthGuard } from './../shared/auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AdminLayoutComponent } from '../shared/components/admin-layout/admin-layout.component';
import { UserCreatePageComponent } from '../users/user-create-page/user-create-page.component';
import { UsersPageComponent } from '../users/users-page/users-page.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UserEditPageComponent } from '../users/user-edit-page/user-edit-page/user-edit-page.component';
import { UserChangePasswordComponent } from '../users/user-change-password/user-change-password.component';
import { RolesPageComponent } from '../roles/roles-page/roles-page.component';
import { PartModelsPageComponent } from '../part-models/part-models-page/part-models-page.component';
import { PartModelsEditPageComponent } from '../part-models/part-models-edit-page/part-models-edit-page.component';
import { PartModelsCreatePageComponent } from '../part-models/part-models-create-page/part-models-create-page.component';
import { PartsEditorComponent } from '../parts/parts-editor/parts-editor.component';
import { PartsPageComponent } from '../parts/parts-page/parts-page.component';
import { PartsFormComponent } from '../parts/parts-form/parts-form.component';
import { PartsCreatePageComponent } from '../parts/parts-create-page/parts-create-page.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    UserEditPageComponent,
    UserCreatePageComponent,
    UsersPageComponent,
    UserChangePasswordComponent,
    RolesPageComponent,
    ForbiddenPageComponent,
    AlertComponent,
    AccountPageComponent,
    PartModelsPageComponent,
    PartModelsEditPageComponent,
    PartModelsCreatePageComponent,
    PartModelDetailsComponent,
    PartsEditorComponent,
    PartsPageComponent,
    PartsFormComponent,
    PartsCreatePageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminLayoutComponent,
        children: [
          { path: '', redirectTo: '/', pathMatch: 'full' },
          {
            path: 'user/create',
            component: UserCreatePageComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'users',
            component: UsersPageComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'user/:id/edit',
            component: UserEditPageComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'user/:id/change-password',
            component: UserChangePasswordComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'roles',
            component: RolesPageComponent,
            pathMatch: 'full',
            canActivate: [AuthGuard],
          },
          {
            path: 'forbidden',
            component: ForbiddenPageComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'part-models',
            canActivate: [AuthGuard],
            children:[
              {
                path: '',
                component: PartModelsPageComponent,
              },
              {
                path: 'create',
                component: PartModelsCreatePageComponent,
              },
            ]
          },
          {
            path: 'part-models/:id/edit',
            component: PartModelsEditPageComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'part-model/:id/details',
            component: PartModelDetailsComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'parts',
            canActivate: [AuthGuard],
            children:[
              {
                path: '',
                component: PartsPageComponent,
              },
              {
                path: 'create',
                component: PartsCreatePageComponent,
              },
              {
                path: "edit/:id",
                component: PartsEditorComponent
              },
            ]
          },
          {
            path: 'account',
            component: AccountPageComponent,
            canActivate: [AuthGuard],
          },
        ],
      },
    ]),
    NgMultiSelectDropDownModule.forRoot(),
  ],
  exports: [RouterModule],
})
export class AdminModule {}
