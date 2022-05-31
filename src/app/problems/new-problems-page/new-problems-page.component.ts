import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProblemForReadModel } from 'src/app/shared/models/models';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProblemsService } from 'src/app/shared/services/problems.service';
@Component({
  selector: 'app-new-problems-page',
  templateUrl: './new-problems-page.component.html',
  styleUrls: ['./new-problems-page.component.scss']
})
export class NewProblemsPageComponent implements OnInit {

  problems: ProblemForReadModel[] = [];
  gSub: Subscription;
  public displayedColumns = ['id', 'bicycle', 'address', 'dateCreated', 'stage', 'dateFinished', 'Accept problem', 'details', 'delete'
];

  constructor(
    private problemsService: ProblemsService,
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.gSub = this.problemsService.getNewProblemList().subscribe(
      (problems: ProblemForReadModel[]) => {
        console.log(problems)
        this.problems = problems;
        this.cdr.detectChanges();
      },
      (error) => console.log('Error when fetching new problems', error)
    );
  }

  ngOnDestroy() {
    if (this.gSub) {
      this.gSub.unsubscribe();
    }
  }

}
