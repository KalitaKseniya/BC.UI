import { DeliveryOrderForCreateModel } from './../../shared/models/deliveryOrderForCreateModel';
import { DeliveryOrdersService } from './../../shared/services/delivery-orders.service';
import { DeliveryOrderPartModelForDisplay } from './../../shared/models/part-models/deliveryOrderPartModelForDisplay';
import { CheckoutData } from './../../shared/models/checkoutData';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Provider } from 'src/app/shared/interfaces';
import { DeliveryOrderPartModelForCreateOrUpdateModel } from 'src/app/shared/models/deliveryOrderPartModelForCreateOrUpdateModel';

@Component({
  selector: 'app-delivery-order-checkout-page',
  templateUrl: './delivery-order-checkout-page.component.html',
  styleUrls: ['./delivery-order-checkout-page.component.scss']
})
export class DeliveryOrderCheckoutPageComponent implements OnInit {

  provider: Provider;
  partModels: DeliveryOrderPartModelForDisplay [];

  constructor(router: Router,
    deliveryOrdersService: DeliveryOrdersService) {
    this.provider = router.getCurrentNavigation().extras.state.provider;
    this.partModels = router.getCurrentNavigation().extras.state.partModels;
   }

  ngOnInit(): void {
  }

  confirmOrder(){
    var partModelsForCreation: Array<DeliveryOrderPartModelForCreateOrUpdateModel> = [];
    this.partModels.forEach(pm => {
      var partModelDto: DeliveryOrderPartModelForCreateOrUpdateModel = {
        partModelId: pm.id,
        quantity: pm.quantity,
        purchasePrice: pm.purchasePrice
      }
    })
    var deliveryOrderForCreateModel: DeliveryOrderForCreateModel = {
      providerId: this.provider.id,
      partModels: partModelsForCreation
    };
//    this.deliveryOrdersService.createDeliveryOrder()
  }
}
