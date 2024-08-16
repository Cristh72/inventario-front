import { Producto } from './../producto';
import { Component } from '@angular/core';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.css'
})
export class AgregarProductoComponent {
  producto : Producto = new Producto();
  
  constructor(private productoService : ProductoService,
    private enrutador : Router){};

  onSubmit(){
    this.guardarProducto();
  }

  guardarProducto(){
    this.productoService.agregarProducto(this.producto).subscribe(
      {
        next: (datos) => {
          this.irListaProductos();
        },
        error: (error: any) => {
            console.log(error)
        },
      }
    );
  }

  irListaProductos(){
    this.enrutador.navigate(['/productos']);
  }
}
