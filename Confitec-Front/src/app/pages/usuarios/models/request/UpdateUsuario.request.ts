import { EEscolaridade } from "src/app/enums/EEscolaridade";

export class UpdateUsuarioRequest {
  public id: number | undefined;
  public nome: string | undefined;
  public sobrenome: string | undefined;
  public email: string | undefined;
  public dataNascimento: string | undefined;
  public escolaridade: EEscolaridade | undefined;
}
