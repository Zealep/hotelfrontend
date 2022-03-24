import { Component, OnInit, ViewChild } from '@angular/core';
import { Nivel } from '../../models/nivel';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NivelService } from '../../services/nivel.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from '../../shared/models/confirm-dialog-model';

@Component({
  selector: 'app-nivel',
  templateUrl: './nivel.component.html',
  styleUrls: ['./nivel.component.css']
})
export class NivelComponent implements OnInit {

  lista: Nivel[] = [];
  displayedColumns:string[] = ['nombre','acciones'];
  dataSource!: MatTableDataSource<Nivel>;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private nivelService: NivelService,private snackBar: MatSnackBar, public route: ActivatedRoute ,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.load();
   }
    applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }

   delete(x: Nivel) {
     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
       maxWidth: '600px',
       data: <ConfirmDialogModel>{
         title: 'Eliminar nivel',
         message: 'Deseas borrar el nivel?'
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
     this.nivelService.list().subscribe(data => {
       let x = JSON.parse(JSON.stringify(data));
       this.dataSource = new MatTableDataSource(x);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
     });
   }

   private sendDeleteRequest(e: Nivel) {
     this.nivelService.eliminar(e.idNivel!)
     .subscribe(response => {
       this.load();
       this.snackBar.open('Nivel eliminado', 'Close', {
         duration: 3000
       });
     });
   }
  }
