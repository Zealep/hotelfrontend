import { EgresoService } from './../../services/egreso.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Egreso } from '../../models/egreso';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from '../../shared/models/confirm-dialog-model';

@Component({
  selector: 'app-egreso',
  templateUrl: './egreso.component.html',
  styleUrls: ['./egreso.component.css']
})
export class EgresoComponent implements OnInit {
  lista: Egreso[] = [];
  displayedColumns:string[] = ['fecha', 'descripcion','monto','acciones'];
  dataSource!: MatTableDataSource<Egreso>;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private egresoService: EgresoService,private snackBar: MatSnackBar, public route: ActivatedRoute ,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadEgresos();
   }
    applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }

   delete(egreso: Egreso) {
     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
       maxWidth: '600px',
       data: <ConfirmDialogModel>{
         title: 'Eliminar egreso',
         message: 'Deseas borrar el egreso?'
       }
     });

     dialogRef.afterClosed()
       .subscribe(result => {
         if(result) {
           this.sendDeleteRequest(egreso);
         }
       });
   }

   private loadEgresos(){
     this.egresoService.list().subscribe(data => {
       let egresos = JSON.parse(JSON.stringify(data));
       this.dataSource = new MatTableDataSource(egresos);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
     });
   }

   private sendDeleteRequest(e: Egreso) {
     this.egresoService.eliminar(e.idEgreso!)
     .subscribe(response => {
       this.loadEgresos();
       this.snackBar.open('Egreso eliminado', 'Close', {
         duration: 3000
       });
     });
   }
  }
