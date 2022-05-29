import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { FormStatus } from 'src/app/shared/enums';
import { PartModelForCreationOrUpdateDto, Manufacturer, Part, PartModel } from 'src/app/shared/interfaces';
import { BicycleForReadModel } from 'src/app/shared/models/models';
import { ProblemForCreateOrUpdateModel } from 'src/app/shared/models/problems/problemForCreateOrUpdateModel';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BicyclesService } from 'src/app/shared/services/bicycles.service';
import { ManufacturersService } from 'src/app/shared/services/manufacturers.service';
import { PartModelsService } from 'src/app/shared/services/partModels.service';
import { PartsService } from 'src/app/shared/services/parts.service';

@Component({
  selector: 'app-problems-form',
  templateUrl: './problems-form.component.html',
  styleUrls: ['./problems-form.component.scss']
})
export class ProblemsFormComponent implements OnInit {

  @Input() callbackFunction: (args: any) => void;
  @Input() problemDto: ProblemForCreateOrUpdateModel;
  @Input() formStatus: FormStatus;
  @Input() submitted: boolean;
  form: FormGroup;
  parts: Part[] = [];
  userBicycles: BicycleForReadModel[] = [];
  partModels: PartModel[] = [];
  loading = false;
  partForm: FormGroup;

  constructor(
    private partsService: PartsService,
    private partModelsService: PartModelsService,
    private bicyclesService: BicyclesService,
    private authService: AuthService,
    private fb:FormBuilder
    )
    {
      this.partForm = this.fb.group({
        name: '',
        quantities: this.fb.array([]) ,
      });
     }

     ngOnInit(): void {
      this.loading = true;

      this.loadParts();
      this.loadPartModels();
      this.loadBicycles();

      this.form = new FormGroup({
        bicycle: new FormControl(null, Validators.required),
        addressLine1: new FormControl(null, Validators.required),
        addressLine2: new FormControl(null),
        description: new FormControl(null, Validators.required),
        place: new FormControl(null, Validators.required),
      });
    }

    quantities() : FormArray {
      return this.partForm.get("quantities") as FormArray
    }

    newQuantity(): FormGroup {
      return this.fb.group({
        part: '',
        partModel: '',
      })
    }

    addQuantity() {
      this.quantities().push(this.newQuantity());
    }

    removeQuantity(i:number) {
      this.quantities().removeAt(i);
    }


    loadParts() {
      this.partsService.getAll()
        .subscribe((parts: Part[]) => {
          this.parts = parts;
        },
          (error) => {
            console.error('Error when loading part models ', error);
            this.submitted = false;
          });
    }

    loadBicycles() {
      const userId = this.authService.userId;
      this.bicyclesService.getBicyclesForUser(userId)
        .subscribe((bicycles: BicycleForReadModel[]) => {
          this.userBicycles = bicycles;
        },
          (error) => {
            console.error('Error when loading bicycles ', error);
            this.submitted = false;
          });
    }

    loadPartModels() {
      this.partModelsService.getPartModels()
        .subscribe(
          (partModels: PartModel[]) => {
            this.partModels = partModels;
          },
          (error) => {
            console.error('Error when loading part models ', error);
            this.submitted = false;
          }
        );
    }

    getPartModels(i: number) {
      const partId = this.quantities().controls[i].get('part').value;
      if (partId) {
        return this.partModels.filter(x => x.part.id == partId);
      }
      return this.partModels;
    }

    submit() {
      if (this.form.invalid){
        console.log(this.form)
        return;
      }
      this.submitted = true;

      // ToDo: fix this
      // const manufacturerId = this.form.get('manufacturer').value;
      // const partId = this.form.get('part').value;

      // const updatedPartModel: ProblemForCreateOrUpdateModel = {
      //   name: this.form.get('name').value,
      //   price: this.form.get('price').value,
      //   availableQuantity: this.form.get('availableQuantity').value,
      //   manufacturerId: manufacturerId,
      //   partId: partId,
      //   imageUrl: this.imageBase64,
      //   weightInKg: this.form.get('weightInKg').value,
      //   purchasePrice: this.form.get('purchasePrice').value
      // };

      //this.callbackFunction(updatedPartModel);
    }

}
