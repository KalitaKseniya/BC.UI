import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Manufacturer, ManufacturerDto, Part, PartDto, PartModelForCreationOrUpdateDto } from 'src/app/shared/interfaces';
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
  imageBase64: string;

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
    if (this.form.invalid) {
      console.log(this.form)
      return;
    }
    this.submitted = true;
    const manufacturerId = this.form.get('manufacturer').value;
    const partId= this.form.get('part').value;

    const partModel: PartModelForCreationOrUpdateDto = {
      name: this.form.get('name').value,
      price: this.form.get('price').value,
      availableQuantity: this.form.get('availableQuantity').value,
      manufacturerId: manufacturerId,
      partId: partId,
      imageUrl: this.imageBase64
    };

    console.log(partModel);
    this.partModelsService.createPartModel(partModel).subscribe(
      () => {
        this.submitted = false;
        this.form.reset();
        this.router.navigate(['admin', 'part-models']);
        this.alert.success('Part model has been created');
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
  
  uploadImage(){//ToDo: move to anther component
    const file = (<HTMLInputElement>document.querySelector('input[type=file]')).files[0]
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageBase64 = e.target.result.split('base64,')[1];
      console.log(this.imageBase64)

    };
    reader.readAsDataURL(file)
  }
 }

