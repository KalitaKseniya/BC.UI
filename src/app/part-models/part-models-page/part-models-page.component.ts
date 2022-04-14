import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Part, PartModel } from 'src/app/shared/interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PartModelsService } from 'src/app/shared/services/partModels.service';

@Component({
  selector: 'app-part-models-page',
  templateUrl: './part-models-page.component.html',
  styleUrls: ['./part-models-page.component.scss']
})
export class PartModelsPageComponent implements OnInit, OnDestroy {
  partModels: PartModel[] = [];
  gSub: Subscription;
  dSub: Subscription;

  constructor(
    private partModelsService: PartModelsService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.gSub = this.partModelsService.getPartModels().subscribe(
      (partModels: PartModel[]) => {
        this.partModels = partModels;
        console.log(partModels)
      },
      (error) => console.log('Error when fetching part models', error)
    );
  }

  deletePartModel(partModel: PartModel) {
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

  ngOnDestroy() {
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
    if (this.gSub) {
      this.gSub.unsubscribe();
    }
  }
}
