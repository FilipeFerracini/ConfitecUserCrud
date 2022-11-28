import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { FiltrosUsuariosComponent } from './filtros-usuarios/filtros-usuarios.component';
import { ListaDetalhesUsuarioComponent } from './lista-detalhes-usuario/lista-detalhes-usuario.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NovoUsuarioComponent } from './novo-usuario/novo-usuario.component';

@NgModule({
  declarations: [
    UsuariosComponent,
    FiltrosUsuariosComponent,
    ListaDetalhesUsuarioComponent,
    NovoUsuarioComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsuariosRoutingModule,
    SharedModule,
  ],
})
export class UsuariosModule {}
