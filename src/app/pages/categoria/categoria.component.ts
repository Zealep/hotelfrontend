import { Component, OnInit, ViewChild } from '@angular/core';
import { Categoria } from '../../models/categoria';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CategoriaService } from '../../services/categoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from '../../shared/models/confirm-dialog-model';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  lista: Categoria[] = [];
  displayedColumns:string[] = ['nombre','acciones'];
  dataSource!: MatTableDataSource<Categoria>;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private categoriaService: CategoriaService,private snackBar: MatSnackBar, public route: ActivatedRoute ,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.load();
   }
    applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }

   delete(x: Categoria) {
     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
       maxWidth: '600px',
       data: <ConfirmDialogModel>{
         title: 'Eliminar categoria',
         message: 'Deseas borrar la categoria?'
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
     this.categoriaService.list().subscribe(data => {
       let x = JSON.parse(JSON.stringify(data));
       this.dataSource = new MatTableDataSource(x);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
     });
   }

   private sendDeleteRequest(e: Categoria) {
     this.categoriaService.eliminar(e.idCategoria!)
     .subscribe(response => {
       this.load();
       this.snackBar.open('Categoria eliminado', 'Close', {
         duration: 3000
       });
     });
   }
  }
