import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgbDateStruct, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { EEscolaridade } from 'src/app/enums/EEscolaridade';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { GetUsuariosRequest } from '../models/request/GetUsuarios.request';
import { NovoUsuarioComponent } from '../novo-usuario/novo-usuario.component';

@Component({
  selector: 'app-filtros-usuarios',
  templateUrl: './filtros-usuarios.component.html',
  styleUrls: ['./filtros-usuarios.component.css'],
})
export class FiltrosUsuariosComponent implements OnInit {
  @Output() filtroUsuario: EventEmitter<GetUsuariosRequest> =
    new EventEmitter<GetUsuariosRequest>();
  @ViewChild('novoUsuario') novoUsuario: NovoUsuarioComponent | undefined;
  @ViewChild('modalnovoUsuario') private modalComponent:
    | ModalComponent
    | undefined;

  public ngbModalOptionsNovoUsuario: NgbModalOptions = {
    centered: true,
    size: 'lg',
    backdrop: 'static',
    keyboard: false,
  };

  public nome: string | undefined;
  public sobrenome: string | undefined;
  public email: string | undefined;
  public dataNascimento: Date | undefined;
  public escolaridade: EEscolaridade | undefined;
  public getUsuariosRequest: GetUsuariosRequest | undefined;

  constructor() {}

  ngOnInit(): void {}

  dateSelectBirthday(ngbDateStruct: NgbDateStruct) {
    if (!ngbDateStruct) this.dataNascimento = undefined;
    else {
      let date = new Date(
        ngbDateStruct.year,
        ngbDateStruct.month - 1,
        ngbDateStruct.day,
        0,
        0,
        0
      );
      this.dataNascimento = date;
    }
  }

  pesquisar() {
    this.getUsuariosRequest = new GetUsuariosRequest(
      this.nome,
      this.sobrenome,
      this.email,
      this.dataNascimento?.toISOString(),
      this.escolaridade
    );

    this.filtroUsuario.emit(this.getUsuariosRequest);
  }

  cadastrarNovoUsuario() {
    this.modalComponent?.open();
  }

  salvarUsuario() {
    this.novoUsuario?.salvarNovoUsuario();
  }

  usuarioSalvo() {
    this.modalComponent?.close();
    this.pesquisar();
  }
}
