import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Part } from 'src/app/shared/interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PartsService } from 'src/app/shared/services/parts.service';

@Component({
  selector: 'app-parts-page',
  templateUrl: './parts-page.component.html',
  styleUrls: ['./parts-page.component.scss']
})
export class PartsPageComponent implements OnInit, OnDestroy {

  parts: Part[] = [];

  lSub: Subscription;
  dSub: Subscription;

  constructor(
    private partsService: PartsService,
    private alert: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.lSub = this.partsService.getAll().subscribe(
      (parts: Part[]) => {
        this.parts = parts;
      },
      (error) => console.log('Error when fetching parts', error)
    );
  }

  deletePart(part: Part){
    if (!confirm(`Are you sure you want to delete ${part.name}?`)) {
      return;
    }
    this.dSub = this.partsService.delete(part.id).subscribe(
      () => {
        this.parts = this.parts.filter((u) => u.id !== part.id);
        this.alert.danger('Part has been deleted');
      },
      (error) => console.log('Error deleting part model', error)
    );
  }

  redirectToUpdate = (id: string) => {
    console.log('id=',id);
    let url: string = `admin/parts/edit/${id}`;
    this.router.navigate([url]);
  }

  ngOnDestroy() {
    if (this.lSub) {
      this.lSub.unsubscribe();
    }
  }
}
