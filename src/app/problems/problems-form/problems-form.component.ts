import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { FormStatus } from 'src/app/shared/enums';
import { PartModelForCreationOrUpdateDto, Manufacturer, Part, PartModel } from 'src/app/shared/interfaces';
import { BicycleForReadModel, ProblemAddressModel, ProblemBicycleModel, ProblemForCreateModel, ProblemPartModelModel } from 'src/app/shared/models/models';
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
  @Input() problemDto: ProblemForCreateModel;
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
        description: new FormControl(null),
        place: new FormControl(null, Validators.required),
      });
    }

    quantities() : FormArray {
      return this.partForm.get("quantities") as FormArray
    }

    getQuantity(i: number) {
      return this.quantities().controls[i];
    }

    newQuantity(): FormGroup {
      return this.fb.group({
        part: [null, Validators.required],
        partModel: '',
        amount: [1, [Validators.required, Validators.min(1)]]
      })
    }

    addQuantity() {
      this.quantities().push(this.newQuantity());
    }

    removeQuantity(i:number) {
      this.quantities().removeAt(i);
    }

    isPartModelEmpty(i: number): boolean {
      const partModel = this.quantities().controls[i].get('partModel').value;
      console.log(partModel);
      return partModel == null || partModel == undefined || partModel == '';
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
      return this.partModels.filter(x => x.part.id == partId);
    }

    submit() {
      if (this.form.invalid || this.partForm.invalid){
        console.log(this.form);
        console.log(this.partForm);
        return;
      }

      const chosenBicycleId = this.form.get('bicycle').value;
      const chosenBicycle: BicycleForReadModel = this.userBicycles.find(b => b.id == chosenBicycleId);
      const bicycle: ProblemBicycleModel = {
        id: chosenBicycle.id,
        model: chosenBicycle.model,
        serialNumber: chosenBicycle.serialNumber,
      };
      const userId = this.authService.userId;
      const userEmail = this.authService.userEmail;
      const address : ProblemAddressModel = {
        addressLine1: this.form.get('addressLine1').value,
        addressLine2: this.form.get('addressLine2').value,
        place: this.form.get('place').value
      };
      const parts: Array<ProblemPartModelModel> = [];

      for (var i = 0; i < this.quantities().length; i++){
          var quantity = this.getQuantity(i);
          const chosenPartId = quantity.get('part').value;
          const chosenPart: Part = this.parts.find(p => p.id == chosenPartId);

          const chosenPartModelId = quantity?.get('partModel')?.value;
          const chosenPartModel: PartModel = this.partModels?.find(pm => pm.id == chosenPartModelId);

          var problemPartModel: ProblemPartModelModel = {
            partId: chosenPart.id,
            partName: chosenPart.name,
            partModelId: chosenPartModel?.id,
            partModelName: chosenPartModel?.name,
            amount: quantity?.get('amount')?.value,
            pricePerDetail: chosenPartModel?.price,
          };
          parts.push(problemPartModel);
      }

      const updatedProblem : ProblemForCreateModel = {
        bicycle: bicycle,
        userId: userId,
        userEmail: userEmail,
        address: address,
        description: this.form.get('description').value,
        partModels: parts
      };

      console.log(updatedProblem);

      this.callbackFunction(updatedProblem);
    }

}
