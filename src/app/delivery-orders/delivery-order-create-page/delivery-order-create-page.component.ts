import { DeliveryOrderCalculationService } from './../../shared/services/delivery-order-calculation.service';
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
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-delivery-order-create-page',
  templateUrl: './delivery-order-create-page.component.html',
  styleUrls: ['./delivery-order-create-page.component.scss']
})
export class DeliveryOrderCreatePageComponent implements OnInit, OnDestroy {

  partModels: DeliveryOrderPartModelForDisplay[] = [];
  totalPrice = 0;
  totalDifferentItems: number = 0;
  totalWeight: number = 0;
  deliveryPrice: number = 0;
  partModelsPrice: number = 0;
  isWeightAllowed: boolean = false;
  gSub: Subscription;
  dSub: Subscription;
  chosenProvider: Provider;
  public displayedColumns = ['isChecked','image', 'name', 'quantity', 'price', 'manufacturerName', 'partName', 'weight' ]
  public dataSource = new MatTableDataSource<DeliveryOrderPartModelForDisplay>();
  readonly defaultQuantity = 0;
  readonly defaultChecked = false;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private partModelsService: PartModelsService,
    private alert: AlertService,
    private router: Router,
    private calculationService: DeliveryOrderCalculationService,
    private dialog: MatDialog,
    private translate: TranslateService
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
            imageUrl: x.imageUrl,
            weightInKg: x.weightInKg
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
    this.recalculateSummaries();
  }

  isAllCheckBoxChecked(){
    return this.partModels.every(x => x.isChecked);
  }

  confirmOrder() {
    const messageFromTranslate = this.translate.instant('confirmDialogs.deliveryOrderCreate.message');
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: this.translate.instant('confirmDialogs.deliveryOrderCreate.title'),
        message: messageFromTranslate + `${this.financial(this.totalPrice)}$?`
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        const checkoutData = this.getDataForCheckout();
        if (!checkoutData.partModels || checkoutData.partModels.length == 0){
          alert('You can not order 0 part models!');
          return;
        }
        const url: string = 'admin/delivery-orders/checkout';
        this.router.navigate([url], {state: checkoutData});
      }
    });
  }

  changeQuantity(partModel: DeliveryOrderPartModelForDisplay){
    if (partModel.isChecked) {
      partModel.quantity = 1;
    } else {
      partModel.quantity = 0;
    }
  }

  recalculateSummaries(){
    console.log('recalulatin')
    var checked = this.partModels.filter(x => x.isChecked);

    this.totalDifferentItems = checked.length;
    this.totalWeight = this.calculationService.calculateTotalWeight(checked);
    this.totalPrice = this.calculationService.calculateTotalPrice(this.chosenProvider, checked);
    this.deliveryPrice = this.calculationService.calculateDeliveryPrice(this.chosenProvider, checked);
    this.partModelsPrice = this.calculationService.calculatePartModelsPrice(checked);
    this.isWeightAllowed = this.calculationService.isWeightAllowed(this.chosenProvider, checked);
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
  financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }
}
