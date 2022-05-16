import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormStatus } from 'src/app/shared/enums';
import { ProviderDto } from 'src/app/shared/interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ProvidersService } from 'src/app/shared/services/providers.service';

@Component({
  selector: 'app-providers-create-page',
  templateUrl: './providers-create-page.component.html',
  styleUrls: ['./providers-create-page.component.scss']
})
export class ProvidersCreatePageComponent implements OnInit {

  providerDto: ProviderDto;
  formStatusCreate: FormStatus;
  submitted: boolean = false;

  constructor(private providersService: ProvidersService,
              private router: Router,
              private alert: AlertService
  ){}

  ngOnInit(): void {
    this.formStatusCreate = FormStatus.Create;
    this.providerDto = {
      name: null,
      email: null,
      phone: null,
      pricePerKg: 0,
      minWeightInKgToDeliver: 0
    }
  }

  createCallback = (newProvider: ProviderDto): void => {
    console.log('create callback')
    console.log(newProvider)

    this.providersService.create(newProvider).subscribe(
      () => {
        this.submitted = false;
        this.router.navigate(['admin', 'providers']);
        this.alert.success('Provider has been created');
      },
      (error) => {
        console.error('Error when creating ', error);
        this.submitted = false;
      }
    );
  }
}
