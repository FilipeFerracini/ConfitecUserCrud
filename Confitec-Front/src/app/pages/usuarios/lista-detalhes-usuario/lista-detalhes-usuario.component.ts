import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalConfirmComponent } from 'src/app/shared/modal/modal-confirm/modal-confirm.component';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { EditarUsuarioComponent } from '../editar-usuario/editar-usuario.component';
import { GetUsuariosRequest } from '../models/request/GetUsuarios.request';
import { UpdateUsuarioRequest } from '../models/request/UpdateUsuario.request';
import { GetUsuariosResponse } from '../models/response/GetUsuarios.response';
import { UsuarioModel } from '../models/usuario.model';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-lista-detalhes-usuario',
  templateUrl: './lista-detalhes-usuario.component.html',
  styleUrls: ['./lista-detalhes-usuario.component.css'],
})
export class ListaDetalhesUsuarioComponent implements OnInit {
  @Input() filtrosUsuario: GetUsuariosRequest | undefined;

  @ViewChild('editarUsuarioModal') editarUsuarioModal: EditarUsuarioComponent | undefined;
  @ViewChild('modalDelete', { static: false }) modalDelete:
    | ModalConfirmComponent
    | undefined;
  @ViewChild('modal') private modalComponent:
    | ModalComponent
    | undefined;

  public ngbModalOptionsNovoUsuario: NgbModalOptions = {
    centered: true,
    size: 'lg',
    backdrop: 'static',
    keyboard: false,
  };

  public listaUsuarios: GetUsuariosResponse = new GetUsuariosResponse();
  public usuarioDelete: UsuarioModel | undefined;
  public usuarioUpdate: UsuarioModel | undefined;

  constructor(
    private toastr: ToastrService,
    private usuariosService: UsuariosService
  ) {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (
      !(
        simpleChanges.filtrosUsuario.currentValue === null ||
        simpleChanges.filtrosUsuario.currentValue === undefined
      )
    )
      this.filtrar();
  }

  ngOnInit(): void {}

  filtrar() {
    this.usuariosService.getUsuarios(this.filtrosUsuario!).subscribe((subs) => {
      this.listaUsuarios = subs.data!;
    });
  }

  confirmarDeletarUsuario(usuario: UsuarioModel) {
    this.usuarioDelete = usuario;
    this.modalDelete?.setTitle('Atenção');
    this.modalDelete?.setMessage(
      `Deseja prosseguir com a deleção do Usuário ${usuario.nome}?`
    );
    this.modalDelete?.openModal();
  }

  deletarUsuario(e: any) {
    this.usuariosService
      .deleteUsuario(this.usuarioDelete!.id!)
      .subscribe((subs) => {
        this.showMessageSuccess('Dados Atualizados com Sucesso.');
        this.filtrar();
        this.modalDelete?.closeModal();
      });
  }

  cancelarModal(e: any) {
    this.modalDelete?.closeModal();
  }

  openModalEditarUsuario(usuario: UsuarioModel) {
    this.modalComponent?.open();
    this.editarUsuarioModal?.preencherCampos(usuario);
  }

  editaUsuario() {
    this.editarUsuarioModal?.editarUsuario();
  }

  usuarioEditado() {
    this.modalComponent?.close();
    this.filtrar();
  }

  showMessageSuccess(message: string) {
    this.toastr.success(message, '', { positionClass: 'toast-bottom-right' });
  }
}
