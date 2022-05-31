import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProblemForReadModel } from 'src/app/shared/models/models';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProblemsService } from 'src/app/shared/services/problems.service';

@Component({
  selector: 'app-master-problems-page',
  templateUrl: './master-problems-page.component.html',
  styleUrls: ['./master-problems-page.component.scss']
})
export class MasterProblemsPageComponent implements OnInit, OnDestroy {

  problems: ProblemForReadModel[] = [];
  gSub: Subscription;
  public displayedColumns = ['id', 'bicycle', 'address', 'dateCreated', 'stage', 'dateFinished', 'details', 'delete'
];

  constructor(
    private problemsService: ProblemsService,
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const masterId = this.auth.userId;
    console.log(masterId)
    this.gSub = this.problemsService.getMasterProblemsList(masterId).subscribe(
      (problems: ProblemForReadModel[]) => {
        console.log(problems)
        this.problems = problems;
        this.cdr.detectChanges();
      },
      (error) => console.log('Error when fetching problems assigned to master', error)
    );
  }

  ngOnDestroy() {
    if (this.gSub) {
      this.gSub.unsubscribe();
    }
  }
}
