import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    HttpClientModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [],
})
export class SharedModule {}
