import { KeycloakService } from 'keycloak-angular';
import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  mobileQuery: MediaQueryList;
  nombre:any;
  menuNav=[
    {name:"Home", route:"home", icon:"home"},
    {name:"Categorias", route:"categoria", icon:"category"},
    {name:"Productos", route:"producto", icon:"production_quantity_limits"}
];

  constructor(media: MediaMatcher, private keycloakService:KeycloakService) {
    // obtiene todas la media querys de 600 px
    this.mobileQuery=media.matchMedia('(max-width: 600px)');
   }

   shouldRun= true;

  ngOnInit(): void {
    this.nombre=this.keycloakService.getUsername();
  }

  cerrarSesion(){
    this.keycloakService.logout();
  }

}
