import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormStatus } from 'src/app/shared/enums';
import { Manufacturer, Part, PartModelForCreationOrUpdateDto } from 'src/app/shared/interfaces';
import { ManufacturersService } from 'src/app/shared/services/manufacturers.service';
import { PartsService } from 'src/app/shared/services/parts.service';

@Component({
  selector: 'app-part-models-form',
  templateUrl: './part-models-form.component.html',
  styleUrls: ['./part-models-form.component.scss']
})
export class PartModelsFormComponent implements OnInit {
  @Input() callbackFunction: (args: any) => void;
  @Input() partModelDto: PartModelForCreationOrUpdateDto;
  @Input() formStatus: FormStatus;
  @Input() submitted: boolean;
  form: FormGroup;
  manufacturers: Manufacturer[] = [];
  parts: Part[] = [];
  loading = false;
  imageBase64: string;
  imageUrl: string;

  constructor(
    private manufacturersService: ManufacturersService,
    private partsService: PartsService) { }

  ngOnInit(): void {
    this.loading = true;

    this.loadParts();
    this.loadManufacturers();

    this.imageUrl = this.partModelDto.imageUrl;

    this.form = new FormGroup({
      name: new FormControl(this.partModelDto.name, Validators.required),
      price: new FormControl(this.partModelDto.price, [Validators.required, Validators.min(0)]),//ToDo: add number check
      availableQuantity: new FormControl(this.partModelDto.availableQuantity, [Validators.required, Validators.min(0)]),//ToDo: add number check
      manufacturer: new FormControl(this.partModelDto.manufacturerId, Validators.required),
      part: new FormControl(this.partModelDto.partId, Validators.required),
    });
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

  submit() {
    if (this.form.invalid){
      console.log(this.form)
      return;
    }
    this.submitted = true;

    const manufacturerId = this.form.get('manufacturer').value;
    const partId = this.form.get('part').value;

    const updatedPartModel: PartModelForCreationOrUpdateDto = {
      name: this.form.get('name').value,
      price: this.form.get('price').value,
      availableQuantity: this.form.get('availableQuantity').value,
      manufacturerId: manufacturerId,
      partId: partId,
      imageUrl: this.imageBase64
    };

    this.callbackFunction(updatedPartModel);
  }

    onSelectedImage = (imageBase64: string): void => {
      this.imageBase64 = imageBase64;
      this.imageUrl = null;
  }
}
