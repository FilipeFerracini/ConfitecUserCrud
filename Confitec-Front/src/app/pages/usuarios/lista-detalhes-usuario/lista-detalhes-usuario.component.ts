import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModalConfirmComponent } from 'src/app/shared/modal/modal-confirm/modal-confirm.component';
import { GetUsuariosRequest } from '../models/request/GetUsuarios.request';
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

  @ViewChild('modalDelete', { static: false })
  modalDelete: ModalConfirmComponent | undefined;

  public listaUsuarios: UsuarioModel[] = [];
  public usuarioDelete: UsuarioModel | undefined;

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
      this.listaUsuarios = subs.data!.usuarios;
    });
    console.log(this.listaUsuarios);
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

  editarUsuario(usuario: UsuarioModel) {}

  showMessageSuccess(message: string) {
    this.toastr.success(message, '', { positionClass: 'toast-bottom-right' });
  }
}
