import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ProblemForReadModel, ProblemProgressForUpdateModel } from 'src/app/shared/models/models';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProblemsService } from 'src/app/shared/services/problems.service';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-problems-table',
  templateUrl: './problems-table.component.html',
  styleUrls: ['./problems-table.component.scss']
})
export class ProblemsTableComponent implements OnInit, OnDestroy {

  @Input() displayedColumns: string[];
  @Input() problems: ProblemForReadModel[];
  dSub: Subscription;
  public dataSource = new MatTableDataSource<ProblemForReadModel>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private problemsService: ProblemsService,
    private authService: AuthService,
    private alert: AlertService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.data = this.problems;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  redirectToDelete(problem: ProblemForReadModel) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm remove Problem',
        message: `Are you sure you want to DELETE problem ${problem.id}?`
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        this.dSub = this.problemsService.deleteProblem(problem.id).subscribe(
          () => {
            this.problems = this.problems.filter((u) => u.id !== problem.id);
            this.dataSource.data = this.problems;
            this.alert.danger('Problem has been deleted');
          },
          (error) => console.log('Error deleting problem', error)
        );
      }
    });
  }

  redirectToAccept(problem: ProblemForReadModel) {
    if (!this.authService.isMaster()) {
      console.error('Forbidden.')
      return;
    }
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Accept Problem',
        message: `Are you sure you want to ACCEPT problem ${problem.id}?`
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        const problemProgressModel: ProblemProgressForUpdateModel = {
          masterId: this.authService.userId,
          masterEmail: this.authService.userEmail,
          stage: 'InProgress'// ToDo: replace to enum?
        };

        this.dSub = this.problemsService.updateProblemProgress(problem.id, problemProgressModel).subscribe(
          () => {
            this.alert.success('Problem has been accepted');
          },
          (error) => console.log('Error accepting problem', error)
        );
      }
    });
  }

  public redirectToDetails = (id: string) => {
    let url: string = `admin/user-problems/${id}/details`;
    this.router.navigate([url]);
  }

  ngOnDestroy() {
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }
}
