import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormStatus } from 'src/app/shared/enums';
import { PartDto } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-parts-form',
  templateUrl: './parts-form.component.html',
  styleUrls: ['./parts-form.component.scss']
})
export class PartsFormComponent implements OnInit {
  @Input() callbackFunction: (args: any) => void;
  @Input() partDto: PartDto;
  @Input() formStatus: FormStatus;
  @Input() submitted: boolean;
  form: FormGroup;

  constructor() { }

  ngOnInit(): void {
    console.log('partDto from form')
    console.log(this.partDto)
    let nameControl = null;
    if (this.formStatus == FormStatus.Create){

    } else if (this.formStatus == FormStatus.Update){
      nameControl = this.partDto.name;
    } else {
      throw new Error('Not implemented')
    }
    this.form = new FormGroup({
      name: new FormControl(nameControl, Validators.required),
    });
  }

  submit() {
    if (this.form.invalid){
      return;
    }
    this.submitted = true;
    if (this.partDto){
      this.partDto.name = this.form.get('name').value;
    } else {
      throw new Error('not impl')
    }

    console.log('from form')
    console.log(this.partDto)
    this.callbackFunction(null)
  }
}
