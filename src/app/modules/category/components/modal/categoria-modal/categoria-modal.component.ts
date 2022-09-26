import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../../shared/services/category.service';
import { CategoryElement } from '../../../../../../interface/CategoryElement';

@Component({
  selector: 'app-categoria-modal',
  templateUrl: './categoria-modal.component.html',
  styleUrls: ['./categoria-modal.component.css']
})
export class CategoriaModalComponent implements OnInit {

  public categoryFormGroup: FormGroup;
  encabezado:string ="Alta de categoria";

  constructor(private fb: FormBuilder, private serviceCategory:CategoryService, private dialogRef:MatDialogRef<CategoriaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dataCategoriaPadre: CategoryElement) {

    this.categoryFormGroup=this.fb.group({
      nombre:['',Validators.required ],
      descripcion:['',Validators.required]
    });


    if (!(dataCategoriaPadre==null)) {
      this.encabezado="Editar categoria";
      this.setFormulario(dataCategoriaPadre);
    }

   }

  setFormulario(data:CategoryElement) {
    this.categoryFormGroup=this.fb.group({
      nombre:[data.nombre,Validators.required ],
      descripcion:[data.descripcion,Validators.required]
    });
  }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.dialogRef.close(3);
  }

  guardarCategoria(){

    debugger
    if (!(this.dataCategoriaPadre == null)) {
      let data:CategoryElement={
        id:this.dataCategoriaPadre.id,
        nombre:this.categoryFormGroup.get('nombre')?.value,
        descripcion: this.categoryFormGroup.get('descripcion')?.value
      };
      this.serviceCategory.putCategoria(data).subscribe((data:any)=>{
        this.dialogRef.close(1);

      },(error)=>{
        this.dialogRef.close(2);
      });
    } else {

        let data={
        nombre:this.categoryFormGroup.get('nombre')?.value,
        descripcion: this.categoryFormGroup.get('descripcion')?.value

        };

        this.serviceCategory.postCategoria(data).subscribe((data:any)=>{
              this.dialogRef.close(1);
            },(error)=>{
              this.dialogRef.close(2);
        })

    }







  }
}
