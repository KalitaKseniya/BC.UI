import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormStatus } from 'src/app/shared/enums';
import { ProviderDto } from 'src/app/shared/interfaces';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-providers-form',
  templateUrl: './providers-form.component.html',
  styleUrls: ['./providers-form.component.scss']
})
export class ProvidersFormComponent implements OnInit {

  @Input() callbackFunction: (args: any) => void;
  @Input() providerDto: ProviderDto;
  @Input() formStatus: FormStatus;
  @Input() submitted: boolean;
  form: FormGroup;

  constructor(private utility: UtilityService) { }

  ngOnInit() : void {
    console.log('providerDto from form')
    console.log(this.providerDto)

    this.form = new FormGroup({
      name: new FormControl(this.providerDto.name, [Validators.required, Validators.maxLength(255)]),
      email: new FormControl(this.providerDto.email, [Validators.required, Validators.maxLength(64), Validators.email]),
      phone: new FormControl(this.providerDto.phone, [Validators.required, Validators.maxLength(255)]),//ToDo: add pattern?
      pricePerKg: new FormControl(this.providerDto.pricePerKg, [Validators.required, Validators.min(0)]),
      minWeightInKgToDeliver: new FormControl(this.providerDto.minWeightInKgToDeliver, [Validators.required, Validators.min(0)]),
    });

  }

  submit() {
    if (this.form.invalid){
      return;
    }
    this.submitted = true;
    const updatedProvider: ProviderDto = {
      name: this.form.get('name').value,
      email: this.form.get('email').value,
      phone: this.form.get('phone').value,
      minWeightInKgToDeliver: this.form.get('minWeightInKgToDeliver').value,
      pricePerKg: this.form.get('pricePerKg').value
    }

    this.callbackFunction(updatedProvider)
  }

}
