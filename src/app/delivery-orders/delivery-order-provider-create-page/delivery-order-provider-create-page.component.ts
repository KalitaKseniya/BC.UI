import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Provider } from 'src/app/shared/interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ProvidersService } from 'src/app/shared/services/providers.service';


@Component({
  selector: 'app-delivery-order-provider-create-page',
  templateUrl: './delivery-order-provider-create-page.component.html',
  styleUrls: ['./delivery-order-provider-create-page.component.scss']
})
export class DeliveryOrderProviderCreatePageComponent implements OnInit, OnDestroy {

  providers: Provider[] = [];
  @Output() providerSelectedEvent = new EventEmitter<Provider>();
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

  chooseProvider(provider: Provider){
    console.log('emitted', provider);
    this.providerSelectedEvent.emit(provider);
  }

  ngOnDestroy() {
    if (this.lSub) {
      this.lSub.unsubscribe();
    }
  }

}
