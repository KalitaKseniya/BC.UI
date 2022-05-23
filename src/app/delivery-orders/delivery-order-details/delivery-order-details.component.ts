import { DeliveryOrderForStageUpdateModel } from './../../shared/models/deliveryOrderForStageUpdateModel';
import { DeliveryOrderStage } from './../../shared/models/deliveryOrderStage';
import { DeliveryOrderForReadModel } from './../../shared/models/deliveryOrderForReadModel';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { switchMap } from 'rxjs/operators';
import { DeliveryOrdersService } from 'src/app/shared/services/delivery-orders.service';

@Component({
  selector: 'app-delivery-order-details',
  templateUrl: './delivery-order-details.component.html',
  styleUrls: ['./delivery-order-details.component.scss']
})
export class DeliveryOrderDetailsComponent implements OnInit {

  submitted = false;
  form: FormGroup;
  deliveryOrder: DeliveryOrderForReadModel;
  loading = false;
  stages: string[];

  constructor(
    private deliveryOrdersService: DeliveryOrdersService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.deliveryOrdersService.getDeliveryOrder(params['id']);
        })
      )
      .subscribe((deliveryOrder: DeliveryOrderForReadModel) => {
        console.log(deliveryOrder)
        this.deliveryOrder = deliveryOrder;
        
        this.initStages();
        
        this.form = new FormGroup({
          id: new FormControl(deliveryOrder.id, Validators.required),
          dateCreated: new FormControl(deliveryOrder.dateCreated),
          dateFinished: new FormControl(deliveryOrder.dateFinished),
          totalPrice: new FormControl(deliveryOrder.totalPrice),
          providerName: new FormControl(deliveryOrder.provider.name),
          stage: new FormControl(deliveryOrder.stage, Validators.required),
        });
      });
  }

  initStages() {
    this.stages = Object.keys(DeliveryOrderStage)
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    
    let newStage = this.form.get('stage').value;
    let updateStageModel: DeliveryOrderForStageUpdateModel = {
      stage: newStage
    };
    this.deliveryOrdersService.updateStageDeliveryOrder(this.deliveryOrder.id, updateStageModel)
      .subscribe(
        () => {
          this.submitted = false;
          this.form.reset();
          this.router.navigate(['admin', 'delivery-orders']);
          this.alert.success('Delivery order stage has been updated to ' + newStage);
        },
        (error) => {
          console.log('Error when updating ', error);
          this.submitted = false;
        }
      );
  }

  financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

}
