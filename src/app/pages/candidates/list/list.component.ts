import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidate } from '../../../models/candidate.model';
import { CandidatesService } from '../../../services/candidates.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  columnNames: string[] = ['Nombre', 'Apellido', 'Cedula', 'Partido politico', 'Opciones']
  candidates: Candidate[];

  constructor(private CandidatesService: CandidatesService,
              private router: Router) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void{
    this.CandidatesService.list().subscribe(
      data => {
        this.candidates = data;
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

  create(): void{
    this.router.navigate(["pages/candidatos/crear"]);
  }

  edit(id: string): void{
    this.router.navigate(["pages/candidatos/actualizar/"+id]);
  }

  delete(id: string){
    Swal.fire({
      title: 'Eliminar Candidato',
      text: '¿Está seguro que desea eliminar al candidato?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#D33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar',
      confirmButtonColor: '#3085D6',
    }).then((result) => {
      if(result.isConfirmed){
        this.CandidatesService.delete(id).subscribe(
          data => {
            Swal.fire({
              title: '¡Eliminado!',
              text: 'El candidato ha sido eliminado correctamente.',
              icon: 'success'
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