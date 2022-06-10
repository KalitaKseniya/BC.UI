import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BicycleForReadModel, ProblemForReadModel } from 'src/app/shared/models/models';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BicyclesService } from 'src/app/shared/services/bicycles.service';

@Component({
  selector: 'app-bicycles-page',
  templateUrl: './bicycles-page.component.html',
  styleUrls: ['./bicycles-page.component.scss']
})
export class BicyclesPageComponent implements OnInit, OnDestroy {

  bicycles: BicycleForReadModel[] = [];
  gSub: Subscription;
  public displayedColumns = ['id', 'model', 'serialNumber', 'userId', 'userName', 'update','delete'];

  constructor(
    private bicyclesService: BicyclesService,
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.gSub = this.bicyclesService.getBicycleList().subscribe(
      (bicycles: BicycleForReadModel[]) => {
        console.log(bicycles)
        this.bicycles = bicycles;
        this.cdr.detectChanges();
      },
      (error) => console.log('Error when fetching bicycles ', error)
    );
  }

  ngOnDestroy() {
    if (this.gSub) {
      this.gSub.unsubscribe();
    }
  }

}
