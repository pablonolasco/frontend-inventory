import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductoService } from '../../../shared/services/producto.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductoElements } from '../../../../../interface/ProductoElement';
import { CategoryService } from '../../../shared/services/category.service';
import { CategoryElement } from '../../../../../interface/CategoryElement';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal',
  templateUrl: './producto.modal.component.html',
  styleUrls: ['./producto.modal.component.css']
})
export class ProductoModalComponent implements OnInit {

  public encabezado:string='Agregar Producto';
  public productoFormGroup:FormGroup;
  public ListaCategorias:any[]=[];
  constructor(private fb:FormBuilder, private productoService:ProductoService, private categoriaService:CategoryService, private snackBar: MatSnackBar,private dialogRef:MatDialogRef<ProductoModalComponent>,@Inject(MAT_DIALOG_DATA) public dataProducto: ProductoElements) {
    this.productoFormGroup=this.fb.group({
          nombre:['',Validators.required ],
          precio:['',Validators.required],
          cantidad:['',Validators.required],
          categoriaEntity:['',Validators.required],
          imagen:['',Validators.required]
        }
      );
  }

  ngOnInit(): void {
    this.ListaCategorias=this.getCategorias();
    console.log(this.ListaCategorias)
  }



  //#region metodos
  onFileChanged(event:any){

  }

  guardarCategoria(){

  }

  cerrarModal(){
    this.dialogRef.close(3)
  }

  abrirSnackBar(mensaje:string, accion:string): MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(mensaje,accion,{
      duration:2000
    });
  }


  //#endregion

  //#region peticiones
    getCategorias(){
      const categorias=this.categoriaService.getCategorias();
      const listarCategorias:CategoryElement[]=[];
      categorias.subscribe((data:any)=>{
          if (data.metadata[0].codigo="200") {
            let respuesta=data.categoriaResponse.categoriaEntities;
            respuesta.forEach((element:CategoryElement) => {
              listarCategorias.push(element);
            });
          }
      },(error=>{
        this.abrirSnackBar("Se produjo un error al listar las categorias","Error");
      }));

      return listarCategorias;
    }
  //#endregion
}
