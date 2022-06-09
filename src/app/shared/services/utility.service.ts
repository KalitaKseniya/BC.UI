import { Injectable } from '@angular/core';
import { FormStatus } from '../enums';

@Injectable({ providedIn: 'root' })
export class UtilityService {

  public isCreate(formStatus: FormStatus): boolean {
    return formStatus === FormStatus.Create;
  }
}
