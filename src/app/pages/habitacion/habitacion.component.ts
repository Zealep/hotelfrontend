import { Component, OnInit, ViewChild } from '@angular/core';
import { Habitacion } from '../../models/habitacion';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HabitacionService } from '../../services/habitacion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from '../../shared/models/confirm-dialog-model';

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.css']
})
export class HabitacionComponent implements OnInit {

  lista: Habitacion[] = [];
  displayedColumns:string[] = ['nombre','nivel','categoria','detalle','precio','acciones'];
  dataSource!: MatTableDataSource<Habitacion>;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private habitacionService: HabitacionService,private snackBar: MatSnackBar, public route: ActivatedRoute ,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.load();
   }
    applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }

   delete(x: Habitacion) {
     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
       maxWidth: '600px',
       data: <ConfirmDialogModel>{
         title: 'Eliminar habitacion',
         message: 'Deseas borrar la habitacion?'
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
     this.habitacionService.list().subscribe(data => {
       let x = JSON.parse(JSON.stringify(data));
       this.dataSource = new MatTableDataSource(x);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
     });
   }

   private sendDeleteRequest(e: Habitacion) {
     this.habitacionService.eliminar(e.idHabitacion!)
     .subscribe(response => {
       this.load();
       this.snackBar.open('Habitacion eliminado', 'Close', {
         duration: 3000
       });
     });
   }

  }

