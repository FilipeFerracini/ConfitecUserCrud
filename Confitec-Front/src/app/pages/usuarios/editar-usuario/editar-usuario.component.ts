import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DateInputComponent } from 'src/app/shared/date-input/date-input.component';
import { UpdateUsuarioRequest } from '../models/request/UpdateUsuario.request';
import { UsuarioModel } from '../models/usuario.model';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
})
export class EditarUsuarioComponent implements OnInit {
  @ViewChild('datePicker') datePicker: DateInputComponent | undefined;
  @Output() usuarioSalvo = new EventEmitter();
  public usuarioForm: FormGroup;
  public idUsuario: number | undefined;

  constructor(
    private usuariosService: UsuariosService,
    private toastr: ToastrService
  ) {
    this.usuarioForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      sobrenome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      dataNascimento: new FormControl('', [Validators.required]),
      escolaridade: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  get nome() {
    return this.usuarioForm.get('nome');
  }
  get sobrenome() {
    return this.usuarioForm.get('sobrenome');
  }
  get email() {
    return this.usuarioForm.get('email');
  }
  get dataNascimento() {
    return this.usuarioForm.get('dataNascimento');
  }
  get escolaridade() {
    return this.usuarioForm.get('escolaridade');
  }

  teste() {
    alert('ei');
  }

  preencherCampos(usuario: UsuarioModel) {
    this.idUsuario = usuario.id;
    this.usuarioForm.patchValue({
      nome: usuario.nome,
      sobrenome: usuario.sobrenome,
      email: usuario.email,
      escolaridade: usuario.escolaridade,
      dataNascimento: usuario.dataNascimento,
    });

    var date = new Date(usuario.dataNascimento!.toString());
    var dia = date.getDate();
    var mes = date.getMonth() + 1;
    var ano = date.getFullYear();
    var ngbDate = new NgbDate(ano, mes, dia);
    this.datePicker!.model = ngbDate;
  }

  dateSelectBirthday(ngbDateStruct: NgbDateStruct) {
    if (!ngbDateStruct)
      this.usuarioForm.patchValue({ dataNascimento: undefined });
    else {
      let date = new Date(
        ngbDateStruct.year,
        ngbDateStruct.month - 1,
        ngbDateStruct.day,
        13,
        0,
        0,
        0
      );
      this.usuarioForm.patchValue({ dataNascimento: date.toISOString() });
    }
  }

  editarUsuario() {
    if (
      this.idUsuario == undefined ||
      this.nome?.value == '' ||
      this.sobrenome?.value == '' ||
      this.email?.value == '' ||
      this.dataNascimento?.value == '' ||
      this.escolaridade?.value == ''
    )
      this.showMessageError('Todos os campos são obrigatórios!');
    else {
      const updateUsuarioRequest: UpdateUsuarioRequest =
        new UpdateUsuarioRequest();
      updateUsuarioRequest.id = this.idUsuario;
      updateUsuarioRequest.nome = this.nome?.value;
      updateUsuarioRequest.sobrenome = this.sobrenome?.value;
      updateUsuarioRequest.email = this.email?.value;
      updateUsuarioRequest.dataNascimento = this.dataNascimento?.value;
      updateUsuarioRequest.escolaridade = this.escolaridade?.value;

      this.usuariosService
        .updateUsuario(updateUsuarioRequest)
        .subscribe((subs) => {
          this.resetForm();
          this.showMessageSuccess('Usuário salvo com sucesso!');
          this.usuarioSalvo.emit();
        });
    }
  }

  resetForm() {
    this.datePicker?.clearData();
    this.usuarioForm.reset();
  }

  showMessageSuccess(message: string) {
    this.toastr.success(message, '', { positionClass: 'toast-bottom-right' });
  }

  showMessageError(message: string) {
    this.toastr.error(message, '', { positionClass: 'toast-bottom-right' });
  }
}
