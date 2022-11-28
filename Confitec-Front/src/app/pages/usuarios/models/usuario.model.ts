import { EEscolaridade } from "src/app/enums/EEscolaridade";

export class UsuarioModel {
  public id: number | undefined;
  public nome: string | undefined;
  public sobrenome: string | undefined;
  public email: string | undefined;
  public dataNascimento: Date | undefined;
  public dataNascimentoFormatada: string | undefined;
  public escolaridade: EEscolaridade | undefined;
}
