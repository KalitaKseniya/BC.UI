import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Provider } from 'src/app/shared/interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ProvidersService } from 'src/app/shared/services/providers.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-providers-page',
  templateUrl: './providers-page.component.html',
  styleUrls: ['./providers-page.component.scss']
})
export class ProvidersPageComponent implements OnInit, OnDestroy {

  providers: Provider[] = [];

  lSub: Subscription;
  dSub: Subscription;

  constructor(
    private providersService: ProvidersService,
    private alert: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.lSub = this.providersService.getAll().subscribe(
      (providers: Provider[]) => {
        this.providers = providers;
      },
      (error) => console.log('Error when fetching providers', error)
    );
  }

  deleteProvider(provider: Provider){
    if (!confirm(`Are you sure you want to delete ${provider.name}?`)) {
      return;
    }
    this.dSub = this.providersService.delete(provider.id).subscribe(
      () => {
        this.providers = this.providers.filter((u) => u.id !== provider.id);
        this.alert.danger('Provider has been deleted');
      },
      (error) => console.log('Error deleting provider', error)
    );
  }

  redirectToUpdate = (id: string) => {
    console.log('id=',id);
    let url: string = `admin/providers/${id}/edit`;
    this.router.navigate([url]);
  }

  ngOnDestroy() {
    if (this.lSub) {
      this.lSub.unsubscribe();
    }
  }

}
