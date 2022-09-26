import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategorias(){
    const servicio=`${base_url}/categorias`;
    return this.http.get(servicio);
  }

  postCategoria(categoria: any){
    const servicio= `${base_url}/categoria`;
    console.log(servicio)
    debugger
    return this.http.post(servicio,categoria);

  }
}
