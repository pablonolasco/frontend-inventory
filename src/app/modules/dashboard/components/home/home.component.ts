import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Chart } from 'chart.js';
import { ProductoElements } from 'src/interface/ProductoElement';
import { ProductoService } from '../../../shared/services/producto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  charBar:any;
  charDoughnut:any;
  constructor(private productoService:ProductoService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getProductos();

  }

  abrirSnackBar(mensaje:string, accion:string): MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(mensaje,accion,{
      duration:2000
    });
  }

  getProductos(){
    let productos=this.productoService.getProductos().subscribe((data:any)=>{
      this.productoRespuesta(data);
    },(error=>{
      this.abrirSnackBar("Se produjo un error al consultar los productos","Error");
    }));

  }

  productoRespuesta(data:any){
    const productos:string[]=[];
    const cantidadProducto: number []=[];
    //debugger
    if (data.metadata[0].codigo=="200") {
        let listasProductos=data.productoResponse.productos;

        listasProductos.forEach((element:ProductoElements) => {
          productos.push(element.nombre);
          cantidadProducto.push(element.cantidad);
        });

       this.charBar = new Chart('canvas-bar',{
        type: 'bar',
        data:{
            labels: productos,
            datasets:[
              {label:'Productos',data:cantidadProducto},

            ],

          },
        });

        this.charDoughnut = new Chart('canvas-doughnut',{
          type: 'doughnut',
          data:{
              labels: productos,
              datasets:[
                {label:'Productos',data:cantidadProducto},

              ],

            },
          });

    }
  }


}
