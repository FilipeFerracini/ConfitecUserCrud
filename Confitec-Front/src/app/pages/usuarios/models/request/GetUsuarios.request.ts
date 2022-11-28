import { EEscolaridade } from 'src/app/enums/EEscolaridade';

export class GetUsuariosRequest {
  public nome: string | undefined;
  public sobrenome: string | undefined;
  public email: string | undefined;
  public dataNascimento: string | undefined;
  public escolaridade: EEscolaridade | undefined;

  constructor(
    nome: string | undefined,
    sobrenome: string | undefined,
    email: string | undefined,
    dataNascimento: string | undefined,
    escolaridade: EEscolaridade | undefined
  ) {
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.email = email;
    this.dataNascimento = dataNascimento;
    this.escolaridade = escolaridade;
  }
}
