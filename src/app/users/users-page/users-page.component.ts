import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { User } from 'src/app/shared/interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
})
export class UsersPageComponent implements OnInit, OnDestroy {
  users: User[] = [];
  gSub: Subscription;
  dSub: Subscription;

  constructor(
    private usersService: UsersService,
    private alert: AlertService,
    private dialog: MatDialog,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.gSub = this.usersService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (error) => console.log('Error when fetching users', error)
    );
  }

  deleteUser(user: User) {
    const messageFromTranslate = this.translate.instant('confirmDialogs.userDelete.message');

    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title:  this.translate.instant('confirmDialogs.userDelete.title'),
        message: messageFromTranslate + ` ${user.firstName} ${user.secondName}?`
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        this.dSub = this.usersService.deleteUser(user.id).subscribe(
          () => {
            this.users = this.users.filter((u) => u.id !== user.id);
            this.alert.danger('User has been deleted');//ToDo K: fix, not showing
          },
          (error) => console.log('Error deleting user', error)
        );
      }
    });
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
