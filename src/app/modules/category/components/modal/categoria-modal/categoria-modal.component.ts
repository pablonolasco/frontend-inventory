import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../../shared/services/category.service';

@Component({
  selector: 'app-categoria-modal',
  templateUrl: './categoria-modal.component.html',
  styleUrls: ['./categoria-modal.component.css']
})
export class CategoriaModalComponent implements OnInit {

  public categoryFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private serviceCategory:CategoryService, private dialogRef:MatDialogRef<CategoriaModalComponent>) {
    this.categoryFormGroup=this.fb.group({
      nombre:['',Validators.required ],
      descripcion:['',Validators.required]
    });
   }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.dialogRef.close(3);
  }

  guardarCategoria(){
    let data={
      nombre:this.categoryFormGroup.get('nombre')?.value,
      descripcion: this.categoryFormGroup.get('descripcion')?.value

    };


    this.serviceCategory.postCategoria(data).subscribe((data:any)=>{
      debugger
      this.dialogRef.close(1);
    },(error)=>{
      this.dialogRef.close(2);
    })
  }
}
