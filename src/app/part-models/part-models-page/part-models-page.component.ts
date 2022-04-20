import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Part, PartModel } from 'src/app/shared/interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PartModelsService } from 'src/app/shared/services/partModels.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-part-models-page',
  templateUrl: './part-models-page.component.html',
  styleUrls: ['./part-models-page.component.scss']
})
export class PartModelsPageComponent implements OnInit, OnDestroy {
  partModels: PartModel[] = [];
  gSub: Subscription;
  dSub: Subscription;
  public displayedColumns = ['name', 'availableQuantity', 'price', 'manufacturerName', 'partName','details', 'update', 'delete'
];
  public dataSource = new MatTableDataSource<PartModel>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private partModelsService: PartModelsService,
    private alert: AlertService
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

  }

  redirectToDelete(partModel: PartModel) {
    if (!confirm(`Are you sure you want to delete ${partModel.name}?`)) {
      return;
    }
    this.dSub = this.partModelsService.deletePartModel(partModel.id).subscribe(
      () => {
        this.partModels = this.partModels.filter((u) => u.id !== partModel.id);
        this.alert.danger('PartModel has NOT been deleted');//ToDo K: fix, not showing
      },
      (error) => console.log('Error deleting part model', error)
    );
  }

  public redirectToDetails = (id: string) => {
    //ToDO: implement
    throw new Error('Method not implemented.');
  }
  public redirectToUpdate = (id: string) => {
    // ToDo:impelement
    throw new Error('Method not implemented.');
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
