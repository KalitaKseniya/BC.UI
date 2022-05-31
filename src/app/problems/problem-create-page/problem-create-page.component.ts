import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormStatus } from 'src/app/shared/enums';
import { ProblemForCreateModel } from 'src/app/shared/models/models';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ProblemsService } from 'src/app/shared/services/problems.service';

@Component({
  selector: 'app-problem-create-page',
  templateUrl: './problem-create-page.component.html',
  styleUrls: ['./problem-create-page.component.scss']
})
export class ProblemCreatePageComponent implements OnInit {

  problemDto: ProblemForCreateModel;
  formStatusCreate: FormStatus;
  submitted: boolean = false;

  constructor(
    private problemsService: ProblemsService,
    private router: Router,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.formStatusCreate = FormStatus.Create;
    this.problemDto = {
      description: null,
      bicycle: null,
      address: null,
      parts: null,
      userEmail: null
    }
  }

  createCallback = (createdProblem: ProblemForCreateModel): void => {
    console.log('create callback')
    console.log(createdProblem)

    this.problemsService.createProblem(createdProblem).subscribe(
      () => {
        this.submitted = false;
        this.alert.success('Problem has been created');
        this.router.navigate(['admin', 'problems']); //ToDo : change
      },
      (error) => {
        console.error('Error when creating ', error);
        this.submitted = false;
      }
    );
  }
}
