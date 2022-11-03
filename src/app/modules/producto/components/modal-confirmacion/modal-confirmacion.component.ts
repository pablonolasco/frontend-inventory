import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductoService } from '../../../shared/services/producto.service';

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.css']
})
export class ModalConfirmacionComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<ModalConfirmacionComponent>, @Inject(MAT_DIALOG_DATA) public data:any, private productoService:ProductoService) { }

  ngOnInit(): void {
  }
  noDesactivarProducto(){
    this.dialogRef.close(3)
  }

  desactivarProducto(){
    if (!(this.data == null)) {
      let id=this.data.id;
      this.productoService.eliminarProducto(id).subscribe((data:any)=>{
        this.dialogRef.close(1)
      },(error=>{
        this.dialogRef.close(2)
      }))
    }else{
      this.dialogRef.close(2)
    }
  }

}
