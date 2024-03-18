import {TelefoneCliente} from "./telefone-cliente.model";

export class Cliente {

  id?: number;
  nome?: string;
  endereco?: string;
  bairro?: string;
  telefones?: Array<TelefoneCliente> = []
}
