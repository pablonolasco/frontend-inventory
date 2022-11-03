import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  constructor(private http: HttpClient) { }

  getProductos(){
    const servicio= `${base_url}/productos`
    return this.http.get(servicio);
  }

  createProducto(producto:any){
    const servicio=`${base_url}/producto`
    return this.http.post(servicio,producto);
  }

  actualizar(producto:any, id:number){
    const servicio=`${base_url}/producto/${id}`
    return this.http.put(servicio,producto);
  }

  eliminarProducto(id:number){
    const servicio=`${base_url}/producto/${id}`;
    return this.http.delete(servicio)
  }
}
