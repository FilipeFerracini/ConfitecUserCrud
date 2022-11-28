import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DateInputComponent } from 'src/app/shared/date-input/date-input.component';
import { InsertUsuarioRequest } from '../models/request/InsertUsuario.request';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css'],
})
export class NovoUsuarioComponent implements OnInit {
  @ViewChild('datePicker') datePicker: DateInputComponent | undefined;
  @Output() usuarioSalvo = new EventEmitter();
  public usuarioForm: FormGroup;

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
      this.usuarioForm.patchValue({ dataNascimento: date });
    }
  }

  salvarNovoUsuario() {
    const insertUsuarioRequest: InsertUsuarioRequest =
      new InsertUsuarioRequest();
    insertUsuarioRequest.nome = this.nome?.value;
    insertUsuarioRequest.sobrenome = this.sobrenome?.value;
    insertUsuarioRequest.email = this.email?.value;
    insertUsuarioRequest.dataNascimento = this.dataNascimento?.value;
    insertUsuarioRequest.escolaridade = this.escolaridade?.value;

    this.usuariosService
      .insertUsuario(insertUsuarioRequest)
      .subscribe((subs) => {
        this.resetForm();
        this.showMessageSuccess('Usuário salvo com sucesso!');
        this.usuarioSalvo.emit();
      });
  }

  resetForm(){
    this.datePicker?.clearData();
    this.usuarioForm.reset();
  }

  showMessageSuccess(message: string) {
    this.toastr.success(message, '', { positionClass: 'toast-bottom-right' });
  }
}
