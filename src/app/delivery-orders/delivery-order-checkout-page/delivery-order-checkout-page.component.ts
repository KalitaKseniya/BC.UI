import { AlertService } from './../../shared/services/alert.service';
import { DeliveryOrderCalculationService } from './../../shared/services/delivery-order-calculation.service';
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
  totalDifferentItems: number;
  totalWeight: number;
  totalPrice: number;
  deliveryPrice: number;
  partModelsPrice: number;
  submitted: boolean;

  constructor(private router: Router,
    private deliveryOrdersService: DeliveryOrdersService,
    private calculationService: DeliveryOrderCalculationService,
    private alert: AlertService
    ) {
    this.provider = router.getCurrentNavigation().extras.state.provider;
    this.partModels = router.getCurrentNavigation().extras.state.partModels;
   }

  ngOnInit(): void {
    this.submitted = false;
    this.totalDifferentItems = this.partModels.length;
    this.totalWeight = this.calculationService.calculateTotalWeight(this.partModels);
    this.totalPrice = this.calculationService.calculateTotalPrice(this.provider, this.partModels);
    this.deliveryPrice = this.calculationService.calculateDeliveryPrice(this.provider, this.partModels);
    this.partModelsPrice = this.calculationService.calculatePartModelsPrice(this.partModels);
  }

  confirmOrder(){
    this.submitted = true;
    var partModelsForCreation: Array<DeliveryOrderPartModelForCreateOrUpdateModel> = [];
    this.partModels.forEach(pm => {
      var partModelDto: DeliveryOrderPartModelForCreateOrUpdateModel = {
        partModelId: pm.id,
        quantity: pm.quantity,
      };
      partModelsForCreation.push(partModelDto);
    })
    var deliveryOrderForCreateModel: DeliveryOrderForCreateModel = {
      providerId: this.provider.id,
      partModels: partModelsForCreation
    };
    this.deliveryOrdersService.createDeliveryOrder(deliveryOrderForCreateModel).subscribe(
      () => {
        this.submitted = false;
        this.router.navigate(['admin', 'delivery-orders']);
        this.alert.success('Delivery order has been created');
      },
      (error) => {
        console.error('Error when creating ', error);
        this.submitted = false;
      }
    );
  }

  financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }
}
