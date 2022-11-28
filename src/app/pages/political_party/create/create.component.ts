import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Political_party } from '../../../models/political_party.model';
import { politicalpartiesService } from '../../../services/politicalparty.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true; //true=create          false=update
  sendingAttemp: boolean = false;
  politicalparty_id: string = "";
  // related with form
  politicalparty: Political_party = {
    nombre: null,
    lema: null,
  }


  constructor(private tablesService: politicalpartiesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params.tableId) {
      // update
      this.creationMode = false;
      this.politicalparty_id = this.activatedRoute.snapshot.params.tableId;
      this.getTable(this.politicalparty_id);
    }// create
    else
      this.creationMode = true;
  }

  getTable(id: string): void {
    this.tablesService.getOne(id).subscribe(
      data => {
        this.politicalparty = data;
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
    if (this.politicalparty.lema == null || this.politicalparty.nombre == null )
      return true;
    else
      return false;
  }

  create() {
    if (this.validateMandatoryData()) {
      this.tablesService.create(this.politicalparty).subscribe(
        data => {
          Swal.fire({
            title: 'Creada',
            text: 'La mesa de votacion ha sido creada exitosamente.',
            icon: 'success'
          });
          this.router.navigate(["pages/partidospoliticos/listar"])
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
      delete this.politicalparty._id
      this.tablesService.edit(this.politicalparty_id, this.politicalparty).subscribe(
        
        data => {
          Swal.fire({
            title: 'Actualizado',
            text: 'La mesa de votacion ha sido actualizada exitosamente.',
            icon: 'success',
            timer: 5000,
          });
          this.router.navigate(["pages/partidospoliticos/listar"]);
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

