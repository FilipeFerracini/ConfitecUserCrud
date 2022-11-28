import { Component, OnInit } from '@angular/core';
import { GetUsuariosRequest } from './models/request/GetUsuarios.request';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  public filtrosUsuario: GetUsuariosRequest = new GetUsuariosRequest(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
  );
  constructor() {}

  ngOnInit(): void {}

  pesquisarUsuarios(filtrosUsuario: GetUsuariosRequest) {
    this.filtrosUsuario = filtrosUsuario;
  }
}
