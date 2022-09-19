import { RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';



@NgModule({
  declarations: [DashboardComponent,HomeComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class DashboardModule { }
