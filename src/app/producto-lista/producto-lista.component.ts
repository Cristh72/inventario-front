import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto-lista.component.html',
})
export class ProductoListaComponent {

  productos: Producto[];

  constructor(private productoServicio : ProductoService,
    private enrutador : Router
  ){}

  ngOnInit(){
    this.obtenerProductos()
    //Cargamos los productos
  }

  private obtenerProductos(){
    //Consumir los datos del observable (suscribirnos)
    this.productoServicio.obtenerProductosLista().subscribe(
      (datos => {
        this.productos = datos;
      })
    )
  }

  editarProducto(id : number){
    this.enrutador.navigate(['editar-producto', id])
  }

  eliminarProducto(id:number){
    this.productoServicio.eliminarProducto(id).subscribe(
        {
          next: (datos) => this.obtenerProductos(),
          error : (errores) => console.log(errores)
        }
    )
  }
}
