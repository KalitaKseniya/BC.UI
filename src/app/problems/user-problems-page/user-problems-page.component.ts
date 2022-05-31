import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProblemForReadModel } from 'src/app/shared/models/models';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProblemsService } from 'src/app/shared/services/problems.service';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-user-problems-page',
  templateUrl: './user-problems-page.component.html',
  styleUrls: ['./user-problems-page.component.scss']
})
export class UserProblemsPageComponent implements OnInit, OnDestroy {

  problems: ProblemForReadModel[] = [];
  gSub: Subscription;
  dSub: Subscription;
  public displayedColumns = ['id', 'bicycle', 'address', 'dateCreated', 'stage', 'dateFinished', 'details', 'delete'
];
  public dataSource = new MatTableDataSource<ProblemForReadModel>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private problemsService: ProblemsService,
    private auth: AuthService,
    private alert: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const userId = this.auth.userId;
    this.gSub = this.problemsService.getUserProblemsList(userId).subscribe(
      (problems: ProblemForReadModel[]) => {
        this.problems = problems;
        this.dataSource.data = problems;
        console.log(problems)
      },
      (error) => console.log('Error when fetching user problems', error)
    );
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  redirectToDelete(problem: ProblemForReadModel) {
    if (!confirm(`Are you sure you want to delete problem ${problem.id}?`)) {
      return;
    }
    this.dSub = this.problemsService.deleteProblem(problem.id).subscribe(
      () => {
        this.problems = this.problems.filter((u) => u.id !== problem.id);
        this.alert.danger('Problem has been deleted');
      },
      (error) => console.log('Error deleting problem', error)
    );
  }

  public redirectToDetails = (id: string) => {
    let url: string = `admin/user-problems/${id}/details`;
    this.router.navigate([url]);
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
