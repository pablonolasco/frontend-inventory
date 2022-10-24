import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductoService } from 'src/app/modules/shared/services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  displayComuns:string[]=['id','nombre','precio'];
  dataSourceProductos= new MatTableDataSource<ProductoComponent>();
  @ViewChild(MatPaginator)
  paginador!:MatPaginator
  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.getProductos();
  }

  //#region modal
  abrirModalProducto(){

  }
  //#endregion

  //#region metodos

  getProductos(){
    let productos=this.productoService.getProductos().subscribe((data:any)=>{
      console.log("productos",data)
    },(error=>{
      console.log("productos",error);

    }));
    console.log(productos);
  }

  buscarProducto(producto:any){

  }
  editarProducto(producto:any){

  }

  eliminarProducto(id:number){

  }
  //#endregion

}
