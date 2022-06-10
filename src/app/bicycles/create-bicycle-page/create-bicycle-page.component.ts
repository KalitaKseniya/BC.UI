import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormStatus } from 'src/app/shared/enums';
import { PartDto } from 'src/app/shared/interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BicyclesService } from 'src/app/shared/services/bicycles.service';
import { PartsService } from 'src/app/shared/services/parts.service';
import { BicycleForCreateOrUpdateModel } from '../../shared/models/bicycleForCreateOrUpdateModel';

@Component({
  selector: 'app-create-bicycle-page',
  templateUrl: './create-bicycle-page.component.html',
  styleUrls: ['./create-bicycle-page.component.scss']
})
export class CreateBicyclePageComponent implements OnInit {

  bicycleDto: BicycleForCreateOrUpdateModel;
  formStatusCreate: FormStatus;
  submitted: boolean = false;

  constructor(private bicyclesService: BicyclesService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private alert: AlertService,
              private auth: AuthService
  ){}

  ngOnInit(): void {
    this.formStatusCreate = FormStatus.Create;
    this.bicycleDto = {
      serialNumber: null,
      model: null,
      userId: null,
      userName: null
    }
  }

  createCallback = (createdBicycle: BicycleForCreateOrUpdateModel): void => {
    console.log('create callback')
    console.log(this.bicycleDto)

    this.bicyclesService.createBicycle(this.bicycleDto).subscribe(
      () => {
        this.submitted = false;
        if (this.auth.isAdmin()){
          this.router.navigate(['admin', 'bicycles']);
        } else {
          this.router.navigate(['admin', 'user-bicycles']);
        }
        this.alert.success('Bicycle has been created');
      },
      (error) => {
        console.log(this.bicycleDto)
        console.error('Error when creating ', error);
        this.submitted = false;
      }
    );
  }

}
