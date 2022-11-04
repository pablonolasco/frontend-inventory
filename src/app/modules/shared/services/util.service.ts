import { KeycloakService } from 'keycloak-angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private keycloakService:KeycloakService) { }

  getRoles(){
    return this.keycloakService.getUserRoles();
  }

  isAdmin(){
    let roles=this.getRoles().filter(rol=> rol=='admin');
    if (roles.length>0) {
      return true;
    }else{
      return false;
    }
  }
}
