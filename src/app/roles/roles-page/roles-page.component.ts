import { AlertService } from './../../shared/services/alert.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Role, User } from 'src/app/shared/interfaces';
import { RolesService } from 'src/app/shared/services/roles.service';

@Component({
  selector: 'app-roles-page',
  templateUrl: './roles-page.component.html',
  styleUrls: ['./roles-page.component.scss'],
})
export class RolesPageComponent implements OnInit, OnDestroy {
  roles: Role[] = [];
  rolesWithUsers: Map<string, User[]> = new Map<string, User[]>();

  gSub: Subscription;
  dSub: Subscription;
  lSub: Subscription;

  constructor(
    private rolesService: RolesService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.lSub = this.rolesService.getRoles().subscribe(
      (roles: Role[]) => {
        this.roles = roles;
        roles.forEach(r =>
          this.loadUsersForRoles(r.name)
          )
      },
      (error) => console.log('Error when fetching roles', error)
    );
  }

  loadUsersForRoles(roleName: string){
    this.gSub = this.rolesService.getUsersForRole(roleName).subscribe(
      (users: User[]) => {
        this.rolesWithUsers[roleName] = users;
      },
      (error) => console.log('Error when fetching users for role ${roleName}', error)
    );
  }

  ngOnDestroy() {
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
    if (this.gSub) {
      this.gSub.unsubscribe();
    }
    if (this.lSub) {
      this.lSub.unsubscribe();
    }
  }
}
