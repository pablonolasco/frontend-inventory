import { CategoryElement } from './../../../../../interface/CategoryElement';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CategoriaModalComponent } from '../modal/categoria-modal/categoria-modal.component';
import { FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { CategoriaConfirmarModalComponent } from '../modal/categoria-confirmar-modal/categoria-confirmar-modal.component';
import { MatPaginator } from '@angular/material/paginator';
import { UtilService } from 'src/app/modules/shared/services/util.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  displayColumns:string[]=['id','nombre','descripcion','acciones'];
  dataSourceCategorias= new MatTableDataSource<CategoryElement>();
  isAdmin:any;
  @ViewChild(MatPaginator)
  paginador!:MatPaginator

  constructor(private categoriaService: CategoryService, public dialog: MatDialog, private snackBar: MatSnackBar,private utilService:UtilService) {
    this.isAdmin=utilService.isAdmin();

   }

  ngOnInit() {
    this.getCategorias();
  }

  //#region modal
  abrirModalCategoria(){
    const dialogRef = this.dialog.open(CategoriaModalComponent, {
      width: '450px',
    //  data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe((result:any) => {

      if (result == 1) {
        this.abrirSnackBar("Categoria Agregada","Exito");
        this.getCategorias();
      } else if(result == 2) {
        this.abrirSnackBar("Se produjo un error al guardar categoria","Error");
      }
    });
  }

  abrirSnackBar(mensaje:string, accion:string): MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(mensaje,accion,{
      duration:2000
    });
  }


  //#endregion

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
    this.dataSourceCategorias.paginator= this.paginador;
  }

  buscarCategoria(categoria:any){
    if (categoria.length == 0) {
      return this.getCategorias();
    }
    this.categoriaService.buscarCategoria(categoria).subscribe((resp:any)=>{
      this.categoriaRespuesta(resp);
    });

  }

  editarCategoria(categoria:CategoryElement){
    const dialogRef = this.dialog.open(CategoriaModalComponent, {
      width: '450px',
     data: {id:categoria.id,nombre: categoria.nombre, descripcion: categoria.descripcion},
    });

    dialogRef.afterClosed().subscribe((result:any) => {

      if (result == 1) {
        this.abrirSnackBar("Categoria Actualizada","Exito");
        this.getCategorias();
      } else if(result == 2) {
        this.abrirSnackBar("Se produjo un error al actualizar categoria","Error");
      }
    });

  }

  eliminarCategoria(id:any){
    const dialogRef = this.dialog.open(CategoriaConfirmarModalComponent, {
     // width: '450px',
     data: {id:id},
    });

    dialogRef.afterClosed().subscribe((result:any) => {

      if (result == 1) {
        this.abrirSnackBar("Categoria Desactivada","Exito");
        this.getCategorias();
      } else if(result == 2) {
        this.abrirSnackBar("Se produjo un error al desactivar categoria","Error");
      }
    });
  }







}
