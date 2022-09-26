import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './components/category/category.component';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriaModalComponent } from './components/modal/categoria-modal/categoria-modal.component';
import { CategoriaConfirmarModalComponent } from './components/modal/categoria-confirmar-modal/categoria-confirmar-modal.component';



@NgModule({
  declarations: [
    CategoryComponent,
    CategoriaModalComponent,
    CategoriaConfirmarModalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CategoryModule { }
