import { PartModel, PartModelForCreationOrUpdateDto } from './../../shared/interfaces';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PartModelsService } from 'src/app/shared/services/partModels.service';
import { FormStatus } from 'src/app/shared/enums';
import { BicycleForCreateOrUpdateModel } from '../../shared/models/bicycleForCreateOrUpdateModel';
import { BicyclesService } from 'src/app/shared/services/bicycles.service';
import { BicycleForReadModel } from 'src/app/shared/models/models';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-bicycle-edit-page',
  templateUrl: './bicycle-edit-page.component.html',
  styleUrls: ['./bicycle-edit-page.component.scss']
})
export class BicycleEditPageComponent implements OnInit {

  bicycleDto: BicycleForCreateOrUpdateModel;
  bicycle: BicycleForReadModel;
  formStatusUpdate: FormStatus;
  submitted: boolean = false;
  loading: boolean = false;

  constructor(
    private bicyclesService: BicyclesService,
    private router: Router,
    private alert: AlertService,
    private activeRoute: ActivatedRoute,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.formStatusUpdate = FormStatus.Update;

    let id = this.activeRoute.snapshot.params["id"]

    this.bicyclesService.getBicycle(id)
    .subscribe((bicycle: BicycleForReadModel) => {
      this.bicycle = bicycle
      this.bicycleDto = {
        model: bicycle.model,
        serialNumber: bicycle.serialNumber,
        userId: bicycle.userId,
        userName: bicycle.userName
      };
      this.loading = false;
    })
  }

  updateCallback = (updatedBicycle: BicycleForCreateOrUpdateModel): void => {
    console.log('update callback')
    console.log(updatedBicycle)

    this.bicyclesService.updateBicycle(this.bicycle.id, updatedBicycle).subscribe(
      () => {
        this.submitted = false;
        if (this.auth.isAdmin()){
          this.router.navigate(['admin', 'bicycles']);
        } else {
          this.router.navigate(['admin', 'user-bicycles']);
        }
        this.alert.success('Bicycle has been updated');
      },
      (error) => {
        console.log('Error when updating ', error);
        this.submitted = false;
      }
    );
  }

}
