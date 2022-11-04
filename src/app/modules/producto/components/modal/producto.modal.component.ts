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
  selectFile:any;
  nombreImagen:string="";
  public imagePath:any='';
  imgURL: any='';
  public editar:boolean=false;
  constructor(private fb:FormBuilder, private productoService:ProductoService, private categoriaService:CategoryService, private snackBar: MatSnackBar,private dialogRef:MatDialogRef<ProductoModalComponent>,@Inject(MAT_DIALOG_DATA) public dataProducto: ProductoElements) {
    this.productoFormGroup=this.fb.group({
          nombre:['',Validators.required ],
          precio:['',Validators.required],
          cantidad:['',Validators.required],
          categoriaEntity:['',Validators.required],
          imagen:['',Validators.required]
        }
      );

      if ((dataProducto != null)) {
        this.encabezado="Editar Producto";
        this.editar=true;
        this.productoFormGroup=this.fb.group({
          nombre:[dataProducto.nombre,Validators.required ],
          precio:[dataProducto.precio,Validators.required],
          cantidad:[dataProducto.cantidad,Validators.required],
          categoriaEntity:[dataProducto.categoriaEntity.id,Validators.required],
          imagen:['']

        }

      )


      }
      console.log(this.imgURL);
      console.log(this.imagePath);

  }

  ngOnInit(): void {
    this.ListaCategorias=this.getCategorias();

  }



  //#region metodos
  onFileChanged(event:any){
    this.selectFile=event.target.files[0];
    console.log(this.selectFile)
    this.nombreImagen=event.target.files[0].name;
    let mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.abrirSnackBar("Solamente soporta imagenes","Error")
      return;
    }

    let reader = new FileReader();
    this.imagePath = event.target.files;
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      if (this.dataProducto != undefined) {
          this.editar=false;
      }

    }


  }

  guardar(){

      let data={
        nombre:this.productoFormGroup.get('nombre')?.value,
        precio:this.productoFormGroup.get('precio')?.value,
        cantidad:this.productoFormGroup.get('cantidad')?.value,
        categoriaEntity:this.productoFormGroup.get('categoriaEntity')?.value,
        imagen:(this.selectFile== undefined)?'':this.selectFile
      }
      const formData= new FormData();
      if (data.imagen!='') {
        formData.append('imagen',data.imagen, data.imagen.name);
      }
      formData.append('nombre',data.nombre);
      formData.append('precio',data.precio);
      formData.append('cantidad',data.cantidad);
      formData.append('idCategoria',data.categoriaEntity);

      if ((this.dataProducto != null)) {
        this.actualizarProducto(formData,this.dataProducto.id);
      } else {
        this.guardarProducto(formData);
      }

  }

  cerrarModal(){
    this.dialogRef.close(3)

  }

  abrirSnackBar(mensaje:string, accion:string): MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(mensaje,accion,{
      duration:4000
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

    guardarProducto(data:any){
      this.productoService.createProducto(data).subscribe((data:any)=>{
        this.dialogRef.close(1);
      },(error=>{
        this.dialogRef.close(2);

      }));
    }

    actualizarProducto(producto:any, id:number){
      this.productoService.actualizar(producto,id).subscribe((data:any)=>{
        this.dialogRef.close(1);
      },(error=>{
        this.dialogRef.close(2);
      }));
    }
  //#endregion
}
