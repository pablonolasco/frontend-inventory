import { RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryModule } from '../category/category.module';
import { ProductoModule } from '../producto/producto.module';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {NgChartsModule} from 'ng2-charts';




@NgModule({
  declarations: [DashboardComponent,HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    CategoryModule,
    ProductoModule,
    MaterialModule,
    FlexLayoutModule,
    NgChartsModule
  ]
})
export class DashboardModule { }
