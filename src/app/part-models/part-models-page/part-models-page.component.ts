import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Part, PartModel } from 'src/app/shared/interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PartModelsService } from 'src/app/shared/services/partModels.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-part-models-page',
  templateUrl: './part-models-page.component.html',
  styleUrls: ['./part-models-page.component.scss']
})
export class PartModelsPageComponent implements OnInit, OnDestroy {
  partModels: PartModel[] = [];
  gSub: Subscription;
  dSub: Subscription;
  public displayedColumns = ['image', 'name', 'availableQuantity', 'price', 'purchasePrice', 'weightInKg', 'manufacturerName', 'partName', 'update', 'delete'
];
  public dataSource = new MatTableDataSource<PartModel>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private partModelsService: PartModelsService,
    private alert: AlertService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.gSub = this.partModelsService.getPartModels().subscribe(
      (partModels: PartModel[]) => {
        this.partModels = partModels;
        this.dataSource.data = partModels;
        console.log(partModels)
      },
      (error) => console.log('Error when fetching part models', error)
    );
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  redirectToDelete(partModel: PartModel) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm remove Part Model',
        message: `Are you sure you want to delete ${partModel.name}?`
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        this.dSub = this.partModelsService.deletePartModel(partModel.id).subscribe(
          () => {
            this.partModels = this.partModels.filter((u) => u.id !== partModel.id);
            this.dataSource.data = this.partModels;
            this.alert.danger('Part Model has been deleted');
          },
          (error) => console.log('Error deleting part model', error)
        );
      }
    });
  }

  public redirectToUpdate = (id: string) => {
    let url: string = `admin/part-models/${id}/edit`;
    this.router.navigate([url]);
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  financial(x) {
    return Number.parseFloat(x).toFixed(2);
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
