import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ReturnHttp } from 'src/app/models/return-http';
import { BaseService } from 'src/app/services/base-service.service';
import { QueryString } from 'src/app/util/query-string';
import { GetUsuariosRequest } from '../models/request/GetUsuarios.request';
import { InsertUsuarioRequest } from '../models/request/InsertUsuario.request';
import { UpdateUsuarioRequest } from '../models/request/UpdateUsuario.request';
import { DeleteUsuarioResponse } from '../models/response/DeleteUsuario.response';
import { GetUsuariosResponse } from '../models/response/GetUsuarios.response';
import { InsertUsuarioResponse } from '../models/response/InsertUsuario.response';
import { UpdateUsuarioResponse } from '../models/response/UpdateUsuario.response';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService extends BaseService {
  protected getController(): string {
    return 'usuario';
  }

  constructor(
    public router: Router,
    public toastr: ToastrService,
    private http: HttpClient
  ) {
    super(router, toastr);
  }

  getUsuarios(
    getUsuariosRequest: GetUsuariosRequest
  ): Observable<ReturnHttp<GetUsuariosResponse>> {
    let C = this;
    let response = this.http
      .get<ReturnHttp<GetUsuariosResponse>>(
        `${this.getUrl()}/?${QueryString.toString(getUsuariosRequest)}`
      )
      .pipe(
        catchError((err) => {
          return C.serviceError(err, C.toastr);
        })
      );
    return response;
  }

  insertUsuario(
    insertUsuarioRequest: InsertUsuarioRequest
  ): Observable<ReturnHttp<InsertUsuarioResponse>> {
    let C = this;
    let response = this.http
      .post<ReturnHttp<InsertUsuarioResponse>>(
        this.getUrl(),
        insertUsuarioRequest
      )
      .pipe(
        catchError((err) => {
          return C.serviceError(err, C.toastr);
        })
      );
    return response;
  }

  updateUsuario(
    insertUsuarioRequest: UpdateUsuarioRequest
  ): Observable<ReturnHttp<UpdateUsuarioResponse>> {
    let C = this;
    let response = this.http
      .put<ReturnHttp<UpdateUsuarioResponse>>(
        this.getUrl(),
        insertUsuarioRequest
      )
      .pipe(
        catchError((err) => {
          return C.serviceError(err, C.toastr);
        })
      );
    return response;
  }

  deleteUsuario(
    idUsuario: number
  ): Observable<ReturnHttp<DeleteUsuarioResponse>> {
    let C = this;
    let response = this.http
      .delete<ReturnHttp<DeleteUsuarioResponse>>(
        `${this.getUrl()}/${idUsuario}`
      )
      .pipe(
        catchError((err) => {
          return C.serviceError(err, C.toastr);
        })
      );
    return response;
  }
}
