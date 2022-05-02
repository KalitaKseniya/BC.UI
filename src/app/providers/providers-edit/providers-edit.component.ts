import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormStatus } from 'src/app/shared/enums';
import { Provider, ProviderDto } from 'src/app/shared/interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ProvidersService } from 'src/app/shared/services/providers.service';

@Component({
  selector: 'app-providers-edit',
  templateUrl: './providers-edit.component.html',
  styleUrls: ['./providers-edit.component.scss']
})
export class ProvidersEditComponent implements OnInit {

  provider: Provider;
  loading = false;
  providerDto: ProviderDto;
  formStatusUpdate: FormStatus;
  submitted: boolean = false;

  constructor(private providersService: ProvidersService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private alert: AlertService
  ){}

  ngOnInit(): void {
    this.loading = true;
    this.formStatusUpdate = FormStatus.Update;

    let id = this.activeRoute.snapshot.params["id"]
    console.log('id=',id)
    this.providersService.getById(id)
      .subscribe(
        (provider: Provider) => {
          this.provider = provider;
          this.providerDto = {
            name: provider.name,
            email: provider.email,
            phone: provider.phone
          };
          this.loading = false;
        },
        (error) => {
          console.error(error);
        }
      );

  }

  updateCallback = (updatedProvider: ProviderDto): void => {
    console.log('update callback')
    console.log(this.providerDto)

    this.providersService.update(this.provider.id, updatedProvider).subscribe(
      () => {
        this.submitted = false;
        this.router.navigate(['admin', 'providers']);
        this.alert.success('Provider has been updated');
      },
      (error) => {
        console.log('Error when updating ', error);
        this.submitted = false;
      }
    );
  }

}
