import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
    private router: Router
  ) {}

  ngOnInit(): void {
  }

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
    if (!confirm(`Are you sure you want to delete delivery order ${deliveryOrder.id}?`)) {
      return;
    }
    this.dSub = this.deliveryOrderService.deleteDeliveryOrder(deliveryOrder.id).subscribe(
      () => {
        this.deliveryOrders = this.deliveryOrders.filter((u) => u.id !== deliveryOrder.id);
        this.alert.danger('Delivery order has been deleted');//ToDo K: fix, not showing
      },
      (error) => console.log('Error deleting delivery order', error)
    );
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
