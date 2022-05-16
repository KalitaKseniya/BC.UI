import { CheckoutData } from './../../shared/models/checkoutData';
import { Provider } from './../../shared/interfaces';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { PartModel } from 'src/app/shared/interfaces';
import { DeliveryOrderPartModelForDisplay } from 'src/app/shared/models/part-models/deliveryOrderPartModelForDisplay';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PartModelsService } from 'src/app/shared/services/partModels.service';

@Component({
  selector: 'app-delivery-order-create-page',
  templateUrl: './delivery-order-create-page.component.html',
  styleUrls: ['./delivery-order-create-page.component.scss']
})
export class DeliveryOrderCreatePageComponent implements OnInit, OnDestroy {

  partModels: DeliveryOrderPartModelForDisplay[] = [];
  totalPrice = 0;
  gSub: Subscription;
  dSub: Subscription;
  chosenProvider: Provider;
  public displayedColumns = ['isChecked','image', 'name', 'quantity', 'price', 'manufacturerName', 'partName' ]
  public dataSource = new MatTableDataSource<DeliveryOrderPartModelForDisplay>();
  readonly defaultQuantity = 0;
  readonly defaultChecked = false;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private partModelsService: PartModelsService,
    private alert: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }
//ToDo: add filtering
  ngAfterViewInit(): void {
    this.gSub = this.partModelsService.getPartModels().subscribe(
      (partModels: PartModel[]) => {
        console.log(partModels)
        partModels.forEach(x => {
          const partModel: DeliveryOrderPartModelForDisplay = {
            id: x.id,
            name: x.name,
            part: x.part,
            manufacturer: x.manufacturer,
            purchasePrice: x.purchasePrice,
            quantity: this.defaultQuantity,
            isChecked: this.defaultChecked,
            imageUrl: x.imageUrl
          };
          this.partModels.push(partModel);
        });
        this.dataSource.data = this.partModels;
      },
      (error) => console.log('Error when fetching part models', error)
    );
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  checkAllCheckBox(ev: any) {
    this.partModels.forEach(x => {
      x.isChecked = ev.target.checked;
      this.changeQuantity(x);
    });
    this.recalculateTotalPrice();
  }

  isAllCheckBoxChecked(){
    return this.partModels.every(x => x.isChecked);
  }

  confirmOrder() {
    if (!confirm(`Are you sure you want to make order for provider with  ${this.totalPrice}$?`)) {
      return;
    }
    const checkoutData = this.getDataForCheckout();
    if (!checkoutData.partModels || checkoutData.partModels.length == 0){
      alert('You can not order 0 part models!');
      return;
    } 
    const url: string = 'admin/delivery-orders/checkout';
    this.router.navigate([url], {state: checkoutData});
  }

  changeQuantity(partModel: DeliveryOrderPartModelForDisplay){
    if (partModel.isChecked) {
      partModel.quantity = 1;
    } else {
      partModel.quantity = 0;
    }
  }

  recalculateTotalPrice(){
    console.log('recalulatin')
    this.totalPrice = 0;
    this.partModels.forEach(x => {
      if (x.isChecked){
        this.totalPrice += x.purchasePrice * x.quantity
      }
    })
    this.totalPrice = Math.round(this.totalPrice * 100) / 100;
    console.log('total price', this.totalPrice)
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  setProvider(provider: Provider){
    console.log('setting provider with name ', provider.name)
    this.chosenProvider = provider;
  }

  getDataForCheckout(){
    const checkoutData: CheckoutData = {
      provider: this.chosenProvider,
      partModels: this.partModels.filter(pm => pm.isChecked == true)
    };
    return checkoutData;
  }

  ngOnDestroy() {
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
    if (this.gSub) {
      this.gSub.unsubscribe();
    }
  }

}
