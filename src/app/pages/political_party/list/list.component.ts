import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Table } from '../../../models/table.model';
import { TablesService } from '../../../services/tables.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  columnNames: string[] = ['cedula', 'numero_mesa','opciones']
  tables: Table[];

  constructor(private tablesService: TablesService,
              private router: Router) { }

  ngOnInit(): void {
    this.list();
  }

  /**
   * 
   */
  list(): void{
    this.tablesService.list().subscribe(
      data => {
        this.tables = data;
      },
      error => {
        Swal.fire({
          title: 'Error en el proceso',
          text: 'En este momento estamos presentado inconvenientes. Por favor, intentelo mas tarde.',
          icon: 'warning',
          timer: 5000,
        });
      }
    );
  }

  /**
   * 
   */
  create(): void{
    this.router.navigate(["pages/mesas/crear"]);
  }

  /**
   * 
   * @param id 
   */
  edit(id: string): void{
    this.router.navigate(["pages/mesas/actualizar/"+id]);
  }


  delete(id: string){
    Swal.fire({
      title: 'Eliminar Mesa de Votacion',
      text: '¿Está seguro que desea eliminar a la mesa?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#D33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar',
      confirmButtonColor: '#3085D6',
    }).then((result) => {
      if(result.isConfirmed){
        this.tablesService.delete(id).subscribe(
          data => {
            Swal.fire({
              title: '¡Eliminado!',
              text: 'La mesa ha sido eliminada exitosamente',
              icon: 'success',
            });
            this.ngOnInit();
          },
          error => {
            Swal.fire({
              title: 'Error en el proceso',
              text: 'En este momento estamos presentado inconvenientes. Por favor, intentelo mas tarde.',
              icon: 'warning',
              timer: 5000,
            });
          }
        )
      }
    })
  }
}
