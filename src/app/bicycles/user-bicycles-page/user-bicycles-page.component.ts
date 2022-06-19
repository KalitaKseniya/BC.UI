import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BicycleForReadModel, ProblemForReadModel } from 'src/app/shared/models/models';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProblemsService } from 'src/app/shared/services/problems.service';
import { BicyclesService } from 'src/app/shared/services/bicycles.service';

@Component({
  selector: 'app-user-bicycles-page',
  templateUrl: './user-bicycles-page.component.html',
  styleUrls: ['./user-bicycles-page.component.scss']
})
export class UserBicyclesPageComponent implements OnInit {

  problems: ProblemForReadModel[] = [];
  bicycles: BicycleForReadModel[] = [];
  gSub: Subscription;
  public displayedColumns = ['model', 'serialNumber', 'update', 'delete'];

  constructor(
    private auth: AuthService,
    private cdr: ChangeDetectorRef,
    private bicyclesService: BicyclesService
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const userId = this.auth.userId;
    this.gSub = this.bicyclesService.getBicyclesForUser(userId).subscribe(
      (bicycles: BicycleForReadModel[]) => {
        this.bicycles = bicycles;
        this.cdr.detectChanges();
      },
      (error) => console.log('Error when fetching user bicycles', error)
    );

  }

  ngOnDestroy() {
    if (this.gSub) {
      this.gSub.unsubscribe();
    }
  }
}
