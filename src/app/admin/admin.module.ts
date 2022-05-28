import { DeliveryOrderDetailsComponent } from './../delivery-orders/delivery-order-details/delivery-order-details.component';
import { DeliveryOrderCheckoutPageComponent } from './../delivery-orders/delivery-order-checkout-page/delivery-order-checkout-page.component';
import { DeliveryOrderProviderCreatePageComponent } from './../delivery-orders/delivery-order-provider-create-page/delivery-order-provider-create-page.component';
import { DeliveryOrderUpdatePageComponent } from './../delivery-orders/delivery-order-update-page/delivery-order-update-page.component';
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
import { ImageInputComponent } from '../shared/components/image-input/image-input.component';
import { PartModelsFormComponent } from '../part-models/part-models-form/part-models-form.component';
import { ProvidersPageComponent } from '../providers/providers-page/providers-page.component';
import { ProvidersCreatePageComponent } from '../providers/providers-create-page/providers-create-page.component';
import { ProvidersEditComponent } from '../providers/providers-edit/providers-edit.component';
import { ProvidersFormComponent } from '../providers/providers-form/providers-form.component';
import { DeliveryOrdersComponent } from '../delivery-orders/delivery-orders/delivery-orders.component';
import { DeliveryOrderCreatePageComponent } from '../delivery-orders/delivery-order-create-page/delivery-order-create-page.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CreateProblemPageComponent } from '../problems/create-problem-page/create-problem-page.component';

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
    ImageInputComponent,
    PartModelsFormComponent,
    ProvidersPageComponent,
    ProvidersEditComponent,
    ProvidersFormComponent,
    ProvidersCreatePageComponent,
    DeliveryOrdersComponent,
    DeliveryOrderCreatePageComponent,
    DeliveryOrderUpdatePageComponent,
    DeliveryOrderProviderCreatePageComponent,
    DeliveryOrderCheckoutPageComponent,
    DeliveryOrderDetailsComponent,
    CreateProblemPageComponent
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
