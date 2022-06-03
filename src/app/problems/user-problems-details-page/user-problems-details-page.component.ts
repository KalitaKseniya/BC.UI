import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DeliveryOrderStage } from 'src/app/shared/enums';
import { DeliveryOrderForStageUpdateModel } from 'src/app/shared/models/deliveryOrderForStageUpdateModel';
import { ProblemForReadModel } from 'src/app/shared/models/models';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DeliveryOrdersService } from 'src/app/shared/services/delivery-orders.service';
import { ProblemsService } from 'src/app/shared/services/problems.service';

@Component({
  selector: 'app-user-problems-details-page',
  templateUrl: './user-problems-details-page.component.html',
  styleUrls: ['./user-problems-details-page.component.scss']
})
export class UserProblemsDetailsPageComponent implements OnInit {

  submitted = false;
  form: FormGroup;
  problem: ProblemForReadModel;
  loading = false;

  constructor(
    private problemsService: ProblemsService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertService,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          const id = params['id'];
          return this.problemsService.getProblem(id);
        })
      )
      .subscribe((problem: ProblemForReadModel) => {
        console.log(problem)
        this.problem = problem;

        this.form = new FormGroup({
          id: new FormControl(problem.id, Validators.required),
          dateCreated: new FormControl(problem.dateCreated),
          dateFinished: new FormControl(problem.dateFinished),
          addressLine1: new FormControl(problem.address.addressLine1),
          addressLine2: new FormControl(problem.address.addressLine2),
          place: new FormControl(problem.address.place),
          bicycleModel: new FormControl(problem.bicycle.model),
          bicycleSerialNumber: new FormControl(problem.bicycle.serialNumber),
          description: new FormControl(problem.description),
          stage: new FormControl(problem.stage, Validators.required),
          master: new FormControl(problem.masterEmail, Validators.required),
        });
      });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    let newStage = this.form.get('stage').value;
    let updateStageModel: DeliveryOrderForStageUpdateModel = {
      stage: newStage
    };
    // this.problemsService.updateStageDeliveryOrder(this.problem.id, updateStageModel)
    //   .subscribe(
    //     () => {
    //       this.submitted = false;
    //       this.form.reset();
    //       this.router.navigate(['admin', 'delivery-orders']);
    //       this.alert.success('Delivery order stage has been updated to ' + newStage);
    //     },
    //     (error) => {
    //       console.log('Error when updating ', error);
    //       this.submitted = false;
    //     }
    //   );
  }

  financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

}
