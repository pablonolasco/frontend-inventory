import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductoService } from 'src/app/modules/shared/services/producto.service';
import { ProductoElements } from 'src/interface/ProductoElement';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  displayColumns:string[]=['id','nombre','precio'];
  dataSourceProductos= new MatTableDataSource<ProductoElements>();
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
      console.log('first')
      this.productoRespuesta(data);
    },(error=>{
      console.log("productos",error);

    }));

  }

  productoRespuesta(data:any){
    const productos:ProductoElements[]=[];
    debugger
    if (data.metadata[0].codigo=="200") {
        let listasProductos=data.productoResponse.productos;

        listasProductos.forEach((element:ProductoElements) => {
          element.categoriaEntity=element.categoriaEntity.nombre;
          element.picture='data:image/jpeg;base64'+element.picture;
          productos.push(element);
        });
        console.log('productos '+productos)

        this.dataSourceProductos=new MatTableDataSource<ProductoElements>(productos);
        this.dataSourceProductos.paginator=this.paginador;
    }
  }
  buscarProducto(producto:any){

  }
  editarProducto(producto:any){

  }

  eliminarProducto(id:number){

  }
  //#endregion

}
