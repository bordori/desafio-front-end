import {Component, OnInit, ViewChild} from '@angular/core';
import {
  PoModalAction,
  PoModalComponent,
  PoModule, PoNotificationService,
  PoTableAction,
  PoTableColumn,
  PoTableColumnSpacing
} from "@po-ui/ng-components";
import {FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {ClienteService} from "../service/cliente.service";
import {Cliente} from "../model/cliente.model";


@Component({
  selector: 'app-cliente-listar',
  standalone: true,
  templateUrl: './cliente-listar.component.html',
  imports: [
    PoModule,
    FormsModule,
    RouterLink,
  ],
  styleUrl: './cliente-listar.component.scss'
})
export class ClienteListarComponent implements OnInit {

  protected readonly PoTableColumnSpacing = PoTableColumnSpacing;

  columns: Array<PoTableColumn> = [];
  itens: Array<any> = []
  actions: Array<PoTableAction> = []

  clienteExclusao?: Cliente

  @ViewChild(PoModalComponent, {static: true}) poModal!: PoModalComponent

  constructor(private clienteService: ClienteService,
              private router: Router,
              private poNotificationService: PoNotificationService) {
  }

  ngOnInit(): void {
    this.columns = this.getColumns()


    this.actions = [
      {
        action: this.alterar.bind(this),
        icon: 'po-icon po-icon-edit',
        label: 'Alterar',
      },
      {
        action: this.abrirModalExclusao.bind(this),
        icon: 'po-icon po-icon-user-delete',
        label: 'Excluir',
      },
    ]

    this.atualizarListagem()
  }

  alterar(row: any) {
    this.router.navigate([`/cliente/${row.id}/alterar`]).then(r => console.log(r))
  }


  getColumns(): Array<PoTableColumn> {
    return [
      {property: 'nome', type: 'string',  label: 'Nome'},
      {property: 'endereco', type: 'string', label: 'Endereço'},
      {property: 'bairro', type: 'string', label: 'bairro'},
    ];
  }

  abrirModalExclusao(row: any) {
    this.clienteExclusao = row;
    this.poModal.open();
  }

  atualizarListagem() {
    this.clienteService.getTodosClientes().subscribe({
      next: (res: any) => {
        this.itens = res;
      },
      error: (e) => {
        console.error(e)
        let erro = 'Erro ao buscar clientes'

        if (e.error.error)
          erro = e.error.error

        this.poNotificationService.error({
          message: erro,
          duration: 5000,
        })
      }
    })
  }

  confirmarExclusao: PoModalAction = {
    action: () => {
      if (!this.clienteExclusao) return
      let id = this.clienteExclusao?.id ? this.clienteExclusao.id : 0
      this.clienteService.excluirCliente(id).subscribe({
        next: () => {
          this.poNotificationService.success({
            message: 'Cliente excluído com sucesso!',
            duration: 5000
          })
        },
        error: (err) => {
          let msg = 'Erro ao excluir cliente!'

          if (err.error.error) {
            msg = err.error.error
          }

          this.poNotificationService.error({
            message: msg,
            duration: 5000
          })
          console.log(err)
        },
        complete: () => {
          this.atualizarListagem()
          this.poModal.close();
          this.clienteExclusao = {}
        }
      })
      this.poModal.close();
      this.clienteExclusao = {}
    },
    label: 'Sim'
  }

  cancelarExclusao: PoModalAction = {
    action: () => {
      this.clienteExclusao = {}
      this.poModal.close();
    },
    label: 'Não'
  }
}
