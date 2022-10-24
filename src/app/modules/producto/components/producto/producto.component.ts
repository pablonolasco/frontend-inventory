import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/modules/shared/services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
  }

}
