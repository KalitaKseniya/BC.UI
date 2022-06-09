import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { DeliveryOrder } from '../../shared/interfaces';
import { DeliveryOrderForReadModel } from '../../shared/models/deliveryOrderForReadModel';
import { AlertService } from '../../shared/services/alert.service';
import { DeliveryOrdersService } from '../../shared/services/delivery-orders.service';

@Component({
  selector: 'app-delivery-orders',
  templateUrl: './delivery-orders.component.html',
  styleUrls: ['./delivery-orders.component.scss']
})
export class DeliveryOrdersComponent implements OnInit, OnDestroy {

  deliveryOrders: DeliveryOrderForReadModel[] = [];
  gSub: Subscription;
  dSub: Subscription;
  public displayedColumns = ['id', 'dateCreated', 'stage', 'providerName', 'totalPrice', 'details', 'delete'
];
  public dataSource = new MatTableDataSource<DeliveryOrderForReadModel>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private deliveryOrderService: DeliveryOrdersService,
    private alert: AlertService,
    private router: Router,
    private dialog: MatDialog,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.gSub = this.deliveryOrderService.getDeliveryOrdersList().subscribe(
      (deliveryOrders: DeliveryOrderForReadModel[]) => {
        this.deliveryOrders = deliveryOrders;
        this.dataSource.data = deliveryOrders;
        console.log(deliveryOrders)
      },
      (error) => console.log('Error when fetching delivery orders', error)
    );
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  redirectToDelete(deliveryOrder: DeliveryOrder) {
    const messageFromTranslate = this.translate.instant('confirmDialogs.deliveryOrderDelete.message');

    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: this.translate.instant('confirmDialogs.deliveryOrderDelete.title'),
        message: messageFromTranslate + ` ${deliveryOrder.id}?`
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        this.dSub = this.deliveryOrderService.deleteDeliveryOrder(deliveryOrder.id).subscribe(
          () => {
            this.deliveryOrders = this.deliveryOrders.filter((u) => u.id !== deliveryOrder.id);
            this.dataSource.data = this.deliveryOrders;
            this.alert.danger('Delivery order has been deleted');
          },
          (error) => console.log('Error deleting delivery order', error)
        );
      }
    });
  }

  public redirectToDetails = (id: string) => {
    let url: string = `admin/delivery-orders/${id}/details`;
    this.router.navigate([url]);
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
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
