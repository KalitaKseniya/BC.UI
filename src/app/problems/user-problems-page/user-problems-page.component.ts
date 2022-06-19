import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProblemForReadModel } from 'src/app/shared/models/models';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProblemsService } from 'src/app/shared/services/problems.service';

@Component({
  selector: 'app-user-problems-page',
  templateUrl: './user-problems-page.component.html',
  styleUrls: ['./user-problems-page.component.scss']
})
export class UserProblemsPageComponent implements OnInit, OnDestroy {

  problems: ProblemForReadModel[] = [];
  gSub: Subscription;
  public displayedColumns = ['bicycle', 'address', 'masterEmail', 'dateCreated', 'stage', 'dateFinished', 'details'
];

  constructor(
    private problemsService: ProblemsService,
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const userId = this.auth.userId;
    this.gSub = this.problemsService.getUserProblemsList(userId).subscribe(
      (problems: ProblemForReadModel[]) => {
        this.problems = problems;
        this.cdr.detectChanges();
      },
      (error) => console.log('Error when fetching user problems', error)
    );
  }

  ngOnDestroy() {
    if (this.gSub) {
      this.gSub.unsubscribe();
    }
  }
}
