import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductoComponent } from './components/producto/producto.component';
import { ProductoModalComponent } from './components/modal/producto.modal.component';
import { ModalConfirmacionComponent } from './components/modal-confirmacion/modal-confirmacion.component';


@NgModule({
  declarations: [
    ProductoComponent,
    ProductoModalComponent,
    ModalConfirmacionComponent
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
