import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductoComponent } from './components/producto/producto.component';
import { ProductoModalComponent } from './components/modal/producto.modal.component';


@NgModule({
  declarations: [
    ProductoComponent,
    ProductoModalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductoModule { }
