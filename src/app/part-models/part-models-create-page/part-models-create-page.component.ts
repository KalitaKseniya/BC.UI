import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Manufacturer, ManufacturerDto, Part, PartDto, PartModelForCreationDto } from 'src/app/shared/interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ManufacturersService } from 'src/app/shared/services/manufacturers.service';
import { PartModelsService } from 'src/app/shared/services/partModels.service';
import { PartsService } from 'src/app/shared/services/parts.service';

@Component({
  selector: 'app-part-models-create-page',
  templateUrl: './part-models-create-page.component.html',
  styleUrls: ['./part-models-create-page.component.scss']
})
export class PartModelsCreatePageComponent implements OnInit {

  submitted = false;
  form: FormGroup;
  manufacturers: Manufacturer[] = [];
  parts: Part[] = [];
  loading = false;

  constructor(
    private partModelsService: PartModelsService,
    private router: Router,
    private manufacturersService: ManufacturersService,
    private partsService: PartsService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.loadParts();
    this.loadManufacturers();
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),//ToDo: add number check
      availableQuantity: new FormControl(null, Validators.required),//ToDo: add number check
      manufacturer: new FormControl(this.manufacturers[0], Validators.required),
      part: new FormControl(this.parts[0], Validators.required),
    });

  }

  submit() {
    console.log(this.form)
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const manufacturer: ManufacturerDto = {
      name: this.form.get('manufacturer').value,
    };
    const part: PartDto = {
      name: this.form.get('part').value,
    };
    const partModel: PartModelForCreationDto = {
      name: this.form.get('name').value,
      price: this.form.get('price').value,
      availableQuantity: this.form.get('availableQuantity').value,
      manufacturer: manufacturer,
      part: part,
    };

    console.log(partModel);
    this.partModelsService.createPartModel(partModel).subscribe(
      () => {
        this.submitted = false;
        this.form.reset();
        this.router.navigate(['admin', 'users']);
        this.alert.success('User has been created');
      },
      (error) => {
        console.log('Error when creating ', error);
        this.submitted = false;
      }
    );
  }

  loadParts() {
    this.partsService.getAll()
    .subscribe((parts: Part[]) => {
      this.parts = parts
    });
  }
  loadManufacturers() {
    this.manufacturersService.getAll()
    .subscribe((manufacturers: Manufacturer[]) => {
      this.manufacturers = manufacturers
    });
  }
}
