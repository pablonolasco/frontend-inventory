import { CategoryElement } from './../../../../../interface/CategoryElement';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  displayColumns:string[]=['id','nombre','descripcion','acciones'];
  dataSourceCategorias= new MatTableDataSource<CategoryElement>();

  constructor(private categoriaService: CategoryService) { }

  ngOnInit() {
    this.getCategorias();
  }

  getCategorias(){
    const respuesta=this.categoriaService.getCategorias().subscribe((data: any)=>{
      console.log("respuesta ",data)
      this.categoriaRespuesta(data);
    },(error=>{
      console.log("error ",error);
    }));
  }

  categoriaRespuesta(resp:any){
    const categorias: CategoryElement[]=[];
    if (resp.metadata[0].codigo=="200") {
      let listaCategoria=resp.categoriaResponse.categoriaEntities;
      listaCategoria.forEach((element: CategoryElement) => {
        categorias.push(element);
      });
    }
    this.dataSourceCategorias= new MatTableDataSource<CategoryElement>(categorias);
  }

}
