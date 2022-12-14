import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidate } from '../../../models/candidate.model';
import { Political_party } from '../../../models/political_party.model';
import { CandidatesService } from '../../../services/candidates.service';
import { politicalpartiesService } from '../../../services/politicalparty.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true;
  sendingAttemp: boolean = false;
  candidateId: string = "";
  political_partys: Political_party[];
  candidate: Candidate = {
    nombre: "",
    apellido: "",
    cedula: null,
    political_party: {
      _id: null,
    }
  }

  constructor(private candidatesService: CandidatesService,
    private politicalpartiesService: politicalpartiesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPoliticalparties();
    if (this.activatedRoute.snapshot.params.userId) {
      this.creationMode = false;
      this.candidateId = this.activatedRoute.snapshot.params.candidateId;
      this.getUser(this.candidateId);
    }
    else
      this.creationMode = true;
  }

  getPoliticalparties(): void {
    this.politicalpartiesService.list().subscribe(
      data => {
        this.political_partys = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getUser(id: string): void {
    this.candidatesService.getOne(id).subscribe(
      data => {
        this.candidate = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  validateMandatoryData(): boolean {
    this.sendingAttemp = true;
    if (this.candidate.nombre == "" || this.candidate.apellido == "" || this.candidate.cedula == null || this.candidate.political_party._id == null)
      return true;
    else
      return false;
  }

  create() {
    if (this.validateMandatoryData()) {
      this.candidatesService.create(this.candidate).subscribe(
        data => {
          Swal.fire({
            title: 'Creado',
            text: 'El candidato se ha creado correctamente.',
            icon: 'success',
          });
          this.router.navigate(["pages/candidato/listar"]);
        },
        error => {
          console.log(error);
          Swal.fire({
            title: 'Falla en el servidor',
            text: 'El candidato no ha podido ser creado. Intente de nuevo mas tarde.',
            icon: 'error',
            timer: 5000
          })
        }
      )
    }
    else {
      Swal.fire({
        title: 'Campos obligatorios',
        text: 'Por favor diligencie todos los campos obligatorios.',
        icon: 'warning',
        timer: 5000
      })
    }
  }

  edit(): void {
    if (this.validateMandatoryData()) {
      delete this.candidate._id
      let political_party_: Political_party = {
        _id: this.candidate.political_party._id,
      }
      this.candidate.political_party = political_party_;
      this.politicalpartiesService.edit(this.candidateId, this.candidate).subscribe(
        data => {
          Swal.fire(
            'Actualizado',
            'El usuario ha sido correctamente actualizado.',
            'success'
          );
          this.router.navigate(["pages/candidatos/listar"]);
        },
        error => {
          console.log(error);
        }
      )
    }
    else {
      Swal.fire({
        title: 'Campos obligatorios',
        text: 'Por favor diligencie todos los campos obligatorios.',
        icon: 'warning',
        timer: 5000
      })
    }
  }
}
