import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormStatus } from 'src/app/shared/enums';
import { PartDto } from 'src/app/shared/interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PartsService } from 'src/app/shared/services/parts.service';

@Component({
  selector: 'app-parts-create-page',
  templateUrl: './parts-create-page.component.html',
  styleUrls: ['./parts-create-page.component.scss']
})
export class PartsCreatePageComponent implements OnInit {
  partDto: PartDto;
  formStatusCreate: FormStatus;
  submitted: boolean = false;

  constructor(private partsService: PartsService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private alert: AlertService
  ){}

  ngOnInit(): void {
    this.formStatusCreate = FormStatus.Create;
    this.partDto = {
      name: null
    }
  }

  createCallback = (args: any): void => {
    console.log('create callback')
    console.log(this.partDto)

    this.partsService.create(this.partDto).subscribe(
      () => {
        this.submitted = false;
        this.router.navigate(['admin', 'parts']);
        this.alert.success('Part has been created');
      },
      (error) => {
        console.error('Error when creating ', error);
        this.submitted = false;
      }
    );
  }

}
