import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoDocumento } from '../../models/tipo-documento';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TipoDocumentoService } from '../../services/tipo-documento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from '../../shared/models/confirm-dialog-model';

@Component({
  selector: 'app-tipo-documento',
  templateUrl: './tipo-documento.component.html',
  styleUrls: ['./tipo-documento.component.css']
})
export class TipoDocumentoComponent implements OnInit {

  lista: TipoDocumento[] = [];
  displayedColumns:string[] = ['nombre','acciones'];
  dataSource!: MatTableDataSource<TipoDocumento>;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private tipoDocumentoService: TipoDocumentoService,private snackBar: MatSnackBar, public route: ActivatedRoute ,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.load();
   }
    applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }

   delete(x: TipoDocumento) {
     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
       maxWidth: '600px',
       data: <ConfirmDialogModel>{
         title: 'Eliminar tipo de documento',
         message: 'Deseas borrar el tipo de documento?'
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
     this.tipoDocumentoService.list().subscribe(data => {
       let x = JSON.parse(JSON.stringify(data));
       this.dataSource = new MatTableDataSource(x);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
     });
   }

   private sendDeleteRequest(e: TipoDocumento) {
     this.tipoDocumentoService.eliminar(e.idTipoDocumento!)
     .subscribe(response => {
       this.load();
       this.snackBar.open('Tipo de documento eliminado', 'Close', {
         duration: 3000
       });
     });
   }
  }

