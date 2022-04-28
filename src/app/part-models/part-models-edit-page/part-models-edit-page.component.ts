import { PartModel } from './../../shared/interfaces';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Manufacturer, Part, PartModelForCreationOrUpdateDto } from 'src/app/shared/interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ManufacturersService } from 'src/app/shared/services/manufacturers.service';
import { PartModelsService } from 'src/app/shared/services/partModels.service';
import { PartsService } from 'src/app/shared/services/parts.service';

@Component({
  selector: 'app-part-models-edit-page',
  templateUrl: './part-models-edit-page.component.html',
  styleUrls: ['./part-models-edit-page.component.scss']
})
export class PartModelsEditPageComponent implements OnInit {

  submitted = false;
  form: FormGroup;
  manufacturers: Manufacturer[] = [];
  parts: Part[] = [];
  partModel: PartModel;
  loading = false;
  imageBase64: string;

  constructor(
    private partModelsService: PartModelsService,
    private router: Router,
    private manufacturersService: ManufacturersService,
    private partsService: PartsService,
    private alert: AlertService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {//ToDo: move logic of ediat/add to one component PartModelForm 
    this.loading = true;

    this.loadParts();
    this.loadManufacturers();
   
    
    this.route.params.pipe(switchMap((params: Params) => {
      return this.partModelsService.getPartModelById(params['id'])
    })).
    subscribe((partModel: PartModel) => {
      this.partModel = partModel
      this.form = new FormGroup({
        name: new FormControl(partModel.name, Validators.required),
        price: new FormControl(partModel.price, [Validators.required, Validators.min(0)]),//ToDo: add number check
        availableQuantity: new FormControl(partModel.availableQuantity, [Validators.required, Validators.min(0)]),//ToDo: add number check
        manufacturer: new FormControl(partModel.manufacturer.id, Validators.required),
        part: new FormControl(partModel.part.id, Validators.required),
      })
    })
  }


  submit() {
    if (this.form.invalid) {
      console.log(this.form)
      return;
    }
    this.submitted = true;
    const manufacturerId = this.form.get('manufacturer').value;
    const partId = this.form.get('part').value;

    const partModel: PartModelForCreationOrUpdateDto = {
      name: this.form.get('name').value,
      price: this.form.get('price').value,
      availableQuantity: this.form.get('availableQuantity').value,
      manufacturerId: manufacturerId,
      partId: partId,
      imageUrl: this.imageBase64
    };

    console.log(partModel);
    this.partModelsService.updatePartModel(this.partModel.id, partModel).subscribe(
      () => {
        this.submitted = false;
        this.form.reset();
        this.router.navigate(['admin', 'part-models']);
        this.alert.success('Part model has been updated');
      },
      (error) => {
        console.log('Error when updating ', error);
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
