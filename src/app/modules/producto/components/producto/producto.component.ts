import { ModalConfirmacionComponent } from './../modal-confirmacion/modal-confirmacion.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductoService } from 'src/app/modules/shared/services/producto.service';
import { ProductoElements } from 'src/interface/ProductoElement';
import { MatDialog } from '@angular/material/dialog';
import { ProductoModalComponent } from '../modal/producto.modal.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  displayColumns:string[]=['id','nombre','precio','cantidad','categoriaEntity','imagen','acciones'];
  dataSourceProductos= new MatTableDataSource<ProductoElements>();
  @ViewChild(MatPaginator)
  paginador!:MatPaginator
  constructor(private productoService: ProductoService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getProductos();
  }

  //#region modal
  abrirModalProducto(){
    const dialogRef = this.dialog.open(ProductoModalComponent, {
      width: '450px',
    //  data: {name: this.name, animal: this.animal},
    });
    dialogRef.afterClosed().subscribe((result:any) => {

      if (result == 1) {
        this.abrirSnackBar("Producto Agregado","Exito");
        this.getProductos();
      } else if(result == 2) {
        this.abrirSnackBar("Se produjo un error al guardar el producto","Error");
      }
    });
  }

  abrilModalEliminar(id:number){
    const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
      width: '450px',
      data: {id: id},
    });
    dialogRef.afterClosed().subscribe((result:any) => {

      if (result == 1) {
        this.abrirSnackBar("Producto Eliminado","Exito");
        this.getProductos();
      } else if(result == 2) {
        this.abrirSnackBar("Se produjo un error al eliminar el producto","Error");
      }
    });

  }

  abrirSnackBar(mensaje:string, accion:string): MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(mensaje,accion,{
      duration:2000
    });
  }
  //#endregion

  //#region metodos

  getProductos(){
    let productos=this.productoService.getProductos().subscribe((data:any)=>{
      this.productoRespuesta(data);
    },(error=>{
      this.abrirSnackBar("Se produjo un error al consultar los productos","Error");
    }));

  }

  productoRespuesta(data:any){
    const productos:ProductoElements[]=[];
    //debugger
    if (data.metadata[0].codigo=="200") {
        let listasProductos=data.productoResponse.productos;

        listasProductos.forEach((element:ProductoElements) => {
          element.categoriaEntity=element.categoriaEntity.nombre;
          element.imagen='data:image/jpeg;base64,'+element.imagen;
          productos.push(element);
        });

        this.dataSourceProductos=new MatTableDataSource<ProductoElements>(productos);
        this.dataSourceProductos.paginator=this.paginador;
    }
  }
  buscarProducto(producto:any){

  }
  editarProducto(producto:any){

  }

  //#endregion

}
