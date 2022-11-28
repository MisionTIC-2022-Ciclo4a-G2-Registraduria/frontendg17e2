import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Table } from '../../../models/table.model';
import { TablesService } from '../../../services/tables.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true; //true=create          false=update
  sendingAttemp: boolean = false;
  tableId: string = "";
  // related with form
  table: Table = {
    table_id: null,
    cedula: null,
    numero_mesa: null,
  }


  constructor(private tablesService: TablesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params.tableId) {
      // update
      this.creationMode = false;
      this.tableId = this.activatedRoute.snapshot.params.tableId;
      this.getTable(this.tableId);
    }// create
    else
      this.creationMode = true;
  }

  getTable(id: string): void {
    this.tablesService.getOne(id).subscribe(
      data => {
        this.table = data;
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


  validateMandatoryData(): boolean {
    this.sendingAttemp = true;
    if (this.table.table_id == null || this.table.cedula == null || this.table.numero_mesa == null)
      return true;
    else
      return false;
  }

  create() {
    if (this.validateMandatoryData()) {
      this.tablesService.create(this.table).subscribe(
        data => {
          Swal.fire({
            title: 'Creada',
            text: 'La mesa de votacion ha sido creada exitosamente.',
            icon: 'success'
          });
          this.router.navigate(["pages/mesas/listar"])
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
    else {
      Swal.fire({
        title: 'Campos obligatorios',
        text: 'Por favor diligencie todos los campos obligatorios',
        icon: 'warning',
        timer: 5000,
      });
    }
  }

  edit(){
    if (this.validateMandatoryData()) {
      delete this.table._id
      this.tablesService.edit(this.tableId, this.table).subscribe(
        
        data => {
          Swal.fire({
            title: 'Actualizado',
            text: 'La mesa de votacion ha sido actualizada exitosamente.',
            icon: 'success',
            timer: 5000,
          });
          this.router.navigate(["pages/mesas/listar"]);
        },
        error => {
          Swal.fire({
            title: 'Error en el proceso',
            text: 'En este momento estamos presentando inconvenientes. Por favor, intente de nuevo más tarde.',
            icon: 'error',
            timer: 5000,
          });

        }
      );
    }
    else {
      Swal.fire({
        title: 'Campos obligatorios',
        text: 'Por favor diligencie todos los campos obligatorios',
        icon: 'warning',
        timer: 5000,
      });
    }
  }
}

