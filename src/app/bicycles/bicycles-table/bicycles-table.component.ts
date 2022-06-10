import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { BicycleForReadModel, ProblemForReadModel, ProblemProgressForUpdateModel } from 'src/app/shared/models/models';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BicyclesService } from 'src/app/shared/services/bicycles.service';
import { ProblemsService } from 'src/app/shared/services/problems.service';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-bicycles-table',
  templateUrl: './bicycles-table.component.html',
  styleUrls: ['./bicycles-table.component.scss']
})
export class BicyclesTableComponent implements OnInit, OnDestroy {

  @Input() displayedColumns: string[];
  @Input() bicycles: BicycleForReadModel[];
  dSub: Subscription;
  public dataSource = new MatTableDataSource<BicycleForReadModel>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private bicyclessService: BicyclesService,
    private auth: AuthService,
    private alert: AlertService,
    private router: Router,
    private dialog: MatDialog,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.data = this.bicycles;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public redirectToUpdate = (id: string) => {
    
    let url: string = (this.auth.isAdmin())? `admin/bicycles/${id}/edit` : `admin/user-bicycles/${id}/edit`;
    this.router.navigate([url]);
  }

  redirectToDelete(bicycle: BicycleForReadModel) {
    const messageFromTranslate = this.translate.instant('confirmDialogs.bicycleDelete.message');

    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: this.translate.instant('confirmDialogs.bicycleDelete.title'),
        message: messageFromTranslate + ` ${bicycle.id}?`
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        this.dSub = this.bicyclessService.deleteBicycle(bicycle.id).subscribe(
          () => {
            this.bicycles = this.bicycles.filter((u) => u.id !== bicycle.id);
            this.dataSource.data = this.bicycles;
            this.alert.danger('Bicycle has been deleted');
          },
          (error) => console.log('Error deleting bicycle', error)
        );
      }
    });
  }

  ngOnDestroy() {
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }

}
