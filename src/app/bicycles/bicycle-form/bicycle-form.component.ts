import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormStatus } from 'src/app/shared/enums';
import { PartDto, User } from 'src/app/shared/interfaces';
import { BicycleForCreateOrUpdateModel } from 'src/app/shared/models/bicycleForCreateOrUpdateModel';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RolesService } from 'src/app/shared/services/roles.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-bicycle-form',
  templateUrl: './bicycle-form.component.html',
  styleUrls: ['./bicycle-form.component.scss']
})
export class BicycleFormComponent implements OnInit {

  @Input() callbackFunction: (args: any) => void;
  @Input() bicycleDto: BicycleForCreateOrUpdateModel;
  @Input() formStatus: FormStatus;
  @Input() submitted: boolean;
  users: User[] = [];
  form: FormGroup;

  constructor(private utility: UtilityService,
     private auth: AuthService,
     private rolesService: RolesService) { }

  ngOnInit(): void {
    console.log('from form')
    console.log(this.bicycleDto)
    let modelControl = null;
    let serialNumberModelControl = null;
    let userControl = null;
    if (this.formStatus == FormStatus.Update){
      modelControl = this.bicycleDto.model;
      serialNumberModelControl = this.bicycleDto.serialNumber;
      userControl = this.bicycleDto.userId;
    } else {
      throw new Error('Not implemented')
    }
    this.form = new FormGroup({
      model: new FormControl(modelControl, Validators.required),
      serialNumber: new FormControl(serialNumberModelControl, Validators.required)
    });

    if (this.auth.isAdmin()) {
      this.rolesService.getUsersForRole('User').subscribe(users => {
        this.users = users;
        if (this.formStatus == FormStatus.Update) {
          userControl = this.users.find(user => user.id.toLowerCase() == this.bicycleDto.userId.toLowerCase()).id;
        }
        this.form.addControl('user', new FormControl(userControl, Validators.required));
        console.log(users);
      })
    }
  }

  submit() {
    if (this.form.invalid){
      return;
    }
    this.submitted = true;
    if (this.bicycleDto){
      this.bicycleDto.model = this.form.get('model').value;
      this.bicycleDto.serialNumber = this.form.get('serialNumber').value;

      if (this.auth.isAdmin()) {
        const userId = this.form.get('user').value;
        const user = this.users.find(u => u.id == userId);
        this.bicycleDto.userId = user.id;
        this.bicycleDto.userName = user.userName;
      }
    } else {
      throw new Error('not impl')
    }

    console.log('from form')
    console.log(this.bicycleDto)
    this.callbackFunction(this.bicycleDto)
  }

}
