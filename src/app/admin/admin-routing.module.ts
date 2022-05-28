import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPageComponent } from '../account-page/account-page.component';
import { DeliveryOrderCheckoutPageComponent } from '../delivery-orders/delivery-order-checkout-page/delivery-order-checkout-page.component';
import { DeliveryOrderCreatePageComponent } from '../delivery-orders/delivery-order-create-page/delivery-order-create-page.component';
import { DeliveryOrderDetailsComponent } from '../delivery-orders/delivery-order-details/delivery-order-details.component';
import { DeliveryOrderUpdatePageComponent } from '../delivery-orders/delivery-order-update-page/delivery-order-update-page.component';
import { DeliveryOrdersComponent } from '../delivery-orders/delivery-orders/delivery-orders.component';
import { ForbiddenPageComponent } from '../forbidden-page/forbidden-page.component';
import { PartModelDetailsComponent } from '../part-models/part-model-details/part-model-details.component';
import { PartModelsCreatePageComponent } from '../part-models/part-models-create-page/part-models-create-page.component';
import { PartModelsEditPageComponent } from '../part-models/part-models-edit-page/part-models-edit-page.component';
import { PartModelsPageComponent } from '../part-models/part-models-page/part-models-page.component';
import { PartsCreatePageComponent } from '../parts/parts-create-page/parts-create-page.component';
import { PartsEditorComponent } from '../parts/parts-editor/parts-editor.component';
import { PartsPageComponent } from '../parts/parts-page/parts-page.component';
import { CreateProblemPageComponent } from '../problems/create-problem-page/create-problem-page.component';
import { ProvidersCreatePageComponent } from '../providers/providers-create-page/providers-create-page.component';
import { ProvidersEditComponent } from '../providers/providers-edit/providers-edit.component';
import { ProvidersPageComponent } from '../providers/providers-page/providers-page.component';
import { RolesPageComponent } from '../roles/roles-page/roles-page.component';
import { AdminGuard } from '../shared/admin.guard';
import { AuthGuard } from '../shared/auth.guard';
import { AdminLayoutComponent } from '../shared/components/admin-layout/admin-layout.component';
import { UserChangePasswordComponent } from '../users/user-change-password/user-change-password.component';
import { UserCreatePageComponent } from '../users/user-create-page/user-create-page.component';
import { UserEditPageComponent } from '../users/user-edit-page/user-edit-page/user-edit-page.component';
import { UsersPageComponent } from '../users/users-page/users-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      {
        path: 'user/create',
        component: UserCreatePageComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
      {
        path: 'users',
        component: UsersPageComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
      {
        path: 'user/:id/edit',
        component: UserEditPageComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
      {
        path: 'user/:id/change-password',
        component: UserChangePasswordComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
      {
        path: 'roles',
        component: RolesPageComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard, AdminGuard],
      },

      {
        path: 'part-models',
        canActivate: [AuthGuard, AdminGuard],
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
        canActivate: [AuthGuard, AdminGuard],
      },
      {
        path: 'part-model/:id/details',
        component: PartModelDetailsComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
      {
        path: 'parts',
        canActivate: [AuthGuard, AdminGuard],
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
        path: 'providers',
        canActivate: [AuthGuard, AdminGuard],
        children:[
          {
            path: '',
            component: ProvidersPageComponent,
          },
          {
            path: 'create',
            component: ProvidersCreatePageComponent,
          },
          {
            path: ":id/edit",
            component: ProvidersEditComponent
          },
        ]
      },
      {
        path: 'delivery-orders',
        canActivate: [AuthGuard, AdminGuard],
        children:[
          {
            path: '',
            component: DeliveryOrdersComponent,
          },
          {
            path: 'create',
            component: DeliveryOrderCreatePageComponent,
          },
          {
            path: 'checkout',
            component: DeliveryOrderCheckoutPageComponent,
          },
          {
            path: ":id/edit",
            component: DeliveryOrderUpdatePageComponent
          },
          {
            path: ":id/details",
            component: DeliveryOrderDetailsComponent
          },
        ]
      },
      {
        path: 'account',
        component: AccountPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'problems/create',
        component: CreateProblemPageComponent,
        canActivate: [AuthGuard],
      },
    ]
  },
  {
    path: 'forbidden',
    component: ForbiddenPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AdminGuard],
})
export class AdminRoutingModule {}
