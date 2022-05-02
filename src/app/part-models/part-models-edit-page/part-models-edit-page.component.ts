import { PartModel, PartModelForCreationOrUpdateDto } from './../../shared/interfaces';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PartModelsService } from 'src/app/shared/services/partModels.service';
import { FormStatus } from 'src/app/shared/enums';

@Component({
  selector: 'app-part-models-edit-page',
  templateUrl: './part-models-edit-page.component.html',
  styleUrls: ['./part-models-edit-page.component.scss']
})
export class PartModelsEditPageComponent implements OnInit {
  partModelDto: PartModelForCreationOrUpdateDto;
  partModel: PartModel;
  formStatusUpdate: FormStatus;
  submitted: boolean = false;
  loading: boolean = false;

  constructor(
    private partModelsService: PartModelsService,
    private router: Router,
    private alert: AlertService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.formStatusUpdate = FormStatus.Update;

    let id = this.activeRoute.snapshot.params["id"]

    this.partModelsService.getPartModelById(id)
    .subscribe((partModel: PartModel) => {
      this.partModel = partModel
      this.partModelDto = {
        name: partModel.name,
        availableQuantity: partModel.availableQuantity,
        price: partModel.price,
        manufacturerId: partModel.manufacturer.id,
        imageUrl: partModel.imageUrl,
        partId: partModel.part.id,
      };
      this.loading = false;
    })
  }

  updateCallback = (updatedPartModel: PartModelForCreationOrUpdateDto): void => {
    console.log('update callback')
    console.log(updatedPartModel)

    this.partModelsService.updatePartModel(this.partModel.id, updatedPartModel).subscribe(
      () => {
        this.submitted = false;
        this.router.navigate(['admin', 'part-models']);
        this.alert.success('Part model has been updated');
      },
      (error) => {
        console.log('Error when updating ', error);
        this.submitted = false;
      }
    );
  }
}
