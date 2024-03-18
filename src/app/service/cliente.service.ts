import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  rootUrl: string = 'http://localhost:8080/api/cliente';

  constructor(protected http: HttpClient) {
  }

  getTodosClientes() {
    return this.http.request('GET', this.rootUrl).pipe(
      res => {
        return res;
      }
    )
  }

  salvarCliente(cliente: any) {
    console.log(cliente);
    return this.http.request('POST', this.rootUrl + '/incluir', {body: cliente}).pipe(
      res => {
        return res;
      }
    )
  }

  obterPorId(id: number) {
    return this.http.request('GET', this.rootUrl + '/' + id).pipe(
      res => {
        return res;
      }
    )
  }
}
