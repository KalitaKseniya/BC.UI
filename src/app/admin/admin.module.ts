import { DeliveryOrderDetailsComponent } from './../delivery-orders/delivery-order-details/delivery-order-details.component';
import { DeliveryOrderCheckoutPageComponent } from './../delivery-orders/delivery-order-checkout-page/delivery-order-checkout-page.component';
import { DeliveryOrderProviderCreatePageComponent } from './../delivery-orders/delivery-order-provider-create-page/delivery-order-provider-create-page.component';
import { PartModelDetailsComponent } from './../part-models/part-model-details/part-model-details.component';
import { AccountPageComponent } from './../account-page/account-page.component';
import { ForbiddenPageComponent } from './../forbidden-page/forbidden-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { ImageInputComponent } from '../shared/components/image-input/image-input.component';
import { PartModelsFormComponent } from '../part-models/part-models-form/part-models-form.component';
import { ProvidersPageComponent } from '../providers/providers-page/providers-page.component';
import { ProvidersCreatePageComponent } from '../providers/providers-create-page/providers-create-page.component';
import { ProvidersEditComponent } from '../providers/providers-edit/providers-edit.component';
import { ProvidersFormComponent } from '../providers/providers-form/providers-form.component';
import { DeliveryOrdersComponent } from '../delivery-orders/delivery-orders/delivery-orders.component';
import { DeliveryOrderCreatePageComponent } from '../delivery-orders/delivery-order-create-page/delivery-order-create-page.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ProblemCreatePageComponent } from '../problems/problem-create-page/problem-create-page.component';
import { ProblemsFormComponent } from '../problems/problems-form/problems-form.component';
import { UserProblemsPageComponent } from '../problems/user-problems-page/user-problems-page.component';
import { UserProblemsDetailsPageComponent } from '../problems/user-problems-details-page/user-problems-details-page.component';
import { CreateBicycleDialogComponent } from '../problems/create-bicycle-dialog/create-bicycle-dialog.component';
import { MasterProblemsPageComponent } from '../problems/master-problems-page/master-problems-page.component';
import { ProblemsTableComponent } from '../problems/problems-table/problems-table.component';
import { NewProblemsPageComponent } from '../problems/new-problems-page/new-problems-page.component';
import { BicyclesPageComponent } from '../bicycles/bicycles-page/bicycles-page.component';
import { BicyclesTableComponent } from '../bicycles/bicycles-table/bicycles-table.component';
import { UserBicyclesPageComponent } from '../bicycles/user-bicycles-page/user-bicycles-page.component';
import { CreateBicyclePageComponent } from '../bicycles/create-bicycle-page/create-bicycle-page.component';
import { BicycleFormComponent } from '../bicycles/bicycle-form/bicycle-form.component';
import { BicycleEditPageComponent } from '../bicycles/bicycle-edit-page/bicycle-edit-page.component';

@NgModule({
  declarations: [
    UserEditPageComponent,
    UserCreatePageComponent,
    UsersPageComponent,
    UserChangePasswordComponent,
    RolesPageComponent,
    ForbiddenPageComponent,
    AccountPageComponent,
    PartModelsPageComponent,
    PartModelsEditPageComponent,
    PartModelsCreatePageComponent,
    PartModelDetailsComponent,
    PartsEditorComponent,
    PartsPageComponent,
    PartsFormComponent,
    PartsCreatePageComponent,
    ImageInputComponent,
    PartModelsFormComponent,
    ProvidersPageComponent,
    ProvidersEditComponent,
    ProvidersFormComponent,
    ProvidersCreatePageComponent,
    DeliveryOrdersComponent,
    DeliveryOrderCreatePageComponent,
    DeliveryOrderProviderCreatePageComponent,
    DeliveryOrderCheckoutPageComponent,
    DeliveryOrderDetailsComponent,
    ProblemCreatePageComponent,
    ProblemsFormComponent,
    UserProblemsPageComponent,
    UserProblemsDetailsPageComponent,
    CreateBicycleDialogComponent,
    MasterProblemsPageComponent,
    ProblemsTableComponent,
    NewProblemsPageComponent,
    BicyclesPageComponent,
    BicyclesTableComponent,
    UserBicyclesPageComponent,
    BicycleFormComponent,
    CreateBicyclePageComponent,
    BicycleEditPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot(),
    AdminRoutingModule,
  ],
})
export class AdminModule {}
