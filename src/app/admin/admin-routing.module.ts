import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPageComponent } from '../account-page/account-page.component';
import { DeliveryOrderCheckoutPageComponent } from '../delivery-orders/delivery-order-checkout-page/delivery-order-checkout-page.component';
import { DeliveryOrderCreatePageComponent } from '../delivery-orders/delivery-order-create-page/delivery-order-create-page.component';
import { DeliveryOrderDetailsComponent } from '../delivery-orders/delivery-order-details/delivery-order-details.component';
import { DeliveryOrdersComponent } from '../delivery-orders/delivery-orders/delivery-orders.component';
import { ForbiddenPageComponent } from '../forbidden-page/forbidden-page.component';
import { PartModelDetailsComponent } from '../part-models/part-model-details/part-model-details.component';
import { PartModelsCreatePageComponent } from '../part-models/part-models-create-page/part-models-create-page.component';
import { PartModelsEditPageComponent } from '../part-models/part-models-edit-page/part-models-edit-page.component';
import { PartModelsPageComponent } from '../part-models/part-models-page/part-models-page.component';
import { PartsCreatePageComponent } from '../parts/parts-create-page/parts-create-page.component';
import { PartsEditorComponent } from '../parts/parts-editor/parts-editor.component';
import { PartsPageComponent } from '../parts/parts-page/parts-page.component';
import { MasterProblemsPageComponent } from '../problems/master-problems-page/master-problems-page.component';
import { NewProblemsPageComponent } from '../problems/new-problems-page/new-problems-page.component';
import { ProblemCreatePageComponent } from '../problems/problem-create-page/problem-create-page.component';
import { UserProblemsDetailsPageComponent } from '../problems/user-problems-details-page/user-problems-details-page.component';
import { UserProblemsPageComponent } from '../problems/user-problems-page/user-problems-page.component';
import { ProvidersCreatePageComponent } from '../providers/providers-create-page/providers-create-page.component';
import { ProvidersEditComponent } from '../providers/providers-edit/providers-edit.component';
import { ProvidersPageComponent } from '../providers/providers-page/providers-page.component';
import { RolesPageComponent } from '../roles/roles-page/roles-page.component';
import { AdminGuard } from '../shared/guards/admin.guard';
import { AuthGuard } from '../shared/guards/auth.guard';
import { MasterGuard } from '../shared/guards/master.guard';
import { UserGuard } from '../shared/guards/user.guard';
import { UserChangePasswordComponent } from '../users/user-change-password/user-change-password.component';
import { UserCreatePageComponent } from '../users/user-create-page/user-create-page.component';
import { UserEditPageComponent } from '../users/user-edit-page/user-edit-page/user-edit-page.component';
import { UsersPageComponent } from '../users/users-page/users-page.component';
import { MasterOrAdminGuard } from '../shared/guards/master-or-admin.guard';
import { UserBicyclesPageComponent } from '../bicycles/user-bicycles-page/user-bicycles-page.component';
import { CreateBicyclePageComponent } from '../bicycles/create-bicycle-page/create-bicycle-page.component';
import { BicyclesPageComponent } from '../bicycles/bicycles-page/bicycles-page.component';
import { BicycleEditPageComponent } from '../bicycles/bicycle-edit-page/bicycle-edit-page.component';

const routes: Routes = [
  {
    path: '',
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
        canActivate: [AuthGuard],
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
        canActivate: [AuthGuard, MasterOrAdminGuard],
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
        path: 'user-problems',
        children:[
          {
            path: '',
            canActivate: [AuthGuard, UserGuard],
            component: UserProblemsPageComponent,
          },
          {
            path: 'create',
            canActivate: [AuthGuard, UserGuard],
            component: ProblemCreatePageComponent,
          },
          {
            path: ":id/details",
            canActivate: [AuthGuard],
            component: UserProblemsDetailsPageComponent,
          },
        ]
      },
      {
        path: 'master-problems',
        canActivate: [AuthGuard, MasterGuard],
        children:[
          {
            path: '',
            component: MasterProblemsPageComponent,
          },
          {
            path: 'new',
            component: NewProblemsPageComponent,
          },
        ]
      },
      {
        path: 'user-bicycles',
        canActivate: [AuthGuard, UserGuard],
        children:[
          {
            path: '',
            component: UserBicyclesPageComponent,
          },
          {
            path: ":id/edit",
            component: BicycleEditPageComponent
          },
          {
            path: 'create',
            component: CreateBicyclePageComponent,
          },
        ]
      },
      {
        path: 'bicycles',
        canActivate: [AdminGuard],
        children:[
          {
            path: '',
            component: BicyclesPageComponent,
          },
          {
            path: ":id/edit",
            component: BicycleEditPageComponent
          },
          {
            path: 'create',
            component: CreateBicyclePageComponent,
          },
        ]
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
  providers: [AuthGuard, AdminGuard, UserGuard, MasterGuard, MasterOrAdminGuard],
})
export class AdminRoutingModule {}
