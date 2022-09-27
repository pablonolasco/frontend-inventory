import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../../../../shared/services/category.service';

@Component({
  selector: 'app-categoria-confirmar-modal',
  templateUrl: './categoria-confirmar-modal.component.html',
  styleUrls: ['./categoria-confirmar-modal.component.css']
})
export class CategoriaConfirmarModalComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<CategoriaConfirmarModalComponent>, @Inject(MAT_DIALOG_DATA) public data:any, private serviceCategoria: CategoryService) { }

  ngOnInit(): void {
  }

  noDesactivarCategoria(){

    this.dialogRef.close(3);
  }

  desactivarCategoria(){
    
    if (!(this.data==null)) {
      let idCategoria:any=this.data.id;
      this.serviceCategoria.deleteCategoria(this.data.id).subscribe((data:any)=>{
        this.dialogRef.close(1);
      },(error)=>{
        this.dialogRef.close(2);
      });
    } else {
      this.dialogRef.close(2);
    }


  }
}
