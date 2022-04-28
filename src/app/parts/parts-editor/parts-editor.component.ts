import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormStatus } from 'src/app/shared/enums';
import { Part, PartDto } from 'src/app/shared/interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PartsService } from 'src/app/shared/services/parts.service';

@Component({
  selector: 'app-parts-editor',
  templateUrl: './parts-editor.component.html',
  styleUrls: ['./parts-editor.component.scss']
})
export class PartsEditorComponent implements OnInit {
  part: Part;
  loading = false;
  partDto: PartDto;
  formStatusUpdate: FormStatus;
  submitted: boolean = false;

  constructor(private partsService: PartsService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private alert: AlertService
  ){}

  ngOnInit(): void {
    this.loading = true;
    this.formStatusUpdate = FormStatus.Update;

    let id = this.activeRoute.snapshot.params["id"]
    console.log('id',id)
    this.partsService.getById(id)
      .subscribe(
        (part: Part) => {
          this.part = part;
          this.partDto = {
            name: part.name
          };
          this.loading = false;
        },
        (error) => {
          console.error(error);
        }
      );

  }

  updateCallback = (args: any): void => {
    console.log('update callback')
    console.log(this.partDto.name)

    this.partsService.update(this.part.id, this.partDto).subscribe(
      () => {
        this.submitted = false;
        this.router.navigate(['admin', 'parts']);
        this.alert.success('Part has been updated');
      },
      (error) => {
        console.log('Error when updating ', error);
        this.submitted = false;
      }
    );
  }

}
