import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const childRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent }
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  export: [RouterModule]
})


export class RouterChildModule {}
