import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryElement } from '../../../../interface/CategoryElement';

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
   // debugger
    return this.http.post(servicio,categoria);

  }

  putCategoria(categoria:CategoryElement){
    const servicio = `${base_url}/categoria/${categoria.id}`;
    return this.http.put(servicio,categoria);
  }

  deleteCategoria(id:any){
    const service= `${base_url}/categoria/${id}`;
    return this.http.delete(service);

  }

  buscarCategoria(id:any){
    const servicio=`${base_url}/categoria/${id}`;
    return this.http.get(servicio);
  }

  descargarExcel(){
    const service=`${base_url}/categoria/export/documento-excel`
    return this.http.get(service,{
      responseType: 'blob'
    });
  }
}
