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

  displayComuns:string[]=[''];
  dataSourceProductos= new MatTableDataSource<ProductoComponent>();
  @ViewChild(MatPaginator)
  paginador!:MatPaginator
  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
  }

  //#region modal
  abrirModalProducto(){

  }
  //#endregion

  //#region metodos



  buscarProducto(producto:any){

  }
  editarProducto(producto:any){

  }

  eliminarProducto(id:number){

  }
  //#endregion

}
