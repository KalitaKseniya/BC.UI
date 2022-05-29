import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormStatus } from 'src/app/shared/enums';
import { PartModelForCreationOrUpdateDto } from 'src/app/shared/interfaces';
import { ProblemForCreateOrUpdateModel } from 'src/app/shared/models/problems/problemForCreateOrUpdateModel';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PartModelsService } from 'src/app/shared/services/partModels.service';

@Component({
  selector: 'app-problem-create-page',
  templateUrl: './problem-create-page.component.html',
  styleUrls: ['./problem-create-page.component.scss']
})
export class ProblemCreatePageComponent implements OnInit {

  problemDto: ProblemForCreateOrUpdateModel;
  formStatusCreate: FormStatus;
  submitted: boolean = false;

  constructor(
    private partModelsService: PartModelsService,
    private router: Router,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.formStatusCreate = FormStatus.Create;
    this.problemDto = {
      description: null,
      bicycle: null,
      address: null,
      place: null,
      parts: null,
      userEmail: null
    }
  }

  createCallback = (createdPartModel: PartModelForCreationOrUpdateDto): void => {
    console.log('create callback')
    console.log(createdPartModel)

    this.partModelsService.createPartModel(createdPartModel).subscribe(
      () => {
        this.submitted = false;
        this.router.navigate(['admin', 'part-models']);
        this.alert.success('Part model has been created');
      },
      (error) => {
        console.error('Error when creating ', error);
        this.submitted = false;
      }
    );
  }
}
