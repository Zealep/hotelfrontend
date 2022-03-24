import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from '../../models/producto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductoService } from '../../services/producto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from '../../shared/models/confirm-dialog-model';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  lista: Producto[] = [];
  displayedColumns:string[] = ['nombre','marca','detalle','precioVenta','acciones'];
  dataSource!: MatTableDataSource<Producto>;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private productoService: ProductoService,private snackBar: MatSnackBar, public route: ActivatedRoute ,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.load();
   }
    applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }

   delete(x: Producto) {
     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
       maxWidth: '600px',
       data: <ConfirmDialogModel>{
         title: 'Eliminar producto',
         message: 'Deseas borrar el producto?'
       }
     });

     dialogRef.afterClosed()
       .subscribe(result => {
         if(result) {
           this.sendDeleteRequest(x);
         }
       });
   }

   private load(){
     this.productoService.list().subscribe(data => {
       let x = JSON.parse(JSON.stringify(data));
       this.dataSource = new MatTableDataSource(x);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
     });
   }

   private sendDeleteRequest(e: Producto) {
     this.productoService.eliminar(e.idProducto!)
     .subscribe(response => {
       this.load();
       this.snackBar.open('Producto eliminado', 'Close', {
         duration: 3000
       });
     });
   }
  }
