import {Component, OnInit, ViewChild} from '@angular/core';
import {PoModalComponent, PoModule, PoTableAction, PoTableColumn, PoTableColumnSpacing} from "@po-ui/ng-components";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ClienteService} from "../service/cliente.service";


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
export class ClienteListarComponent implements OnInit{

  protected readonly PoTableColumnSpacing = PoTableColumnSpacing;

  columns: Array<PoTableColumn> = [];
  itens: Array<any> = []
  actions: Array<PoTableAction> = []

  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent

  constructor(private clienteService: ClienteService, private router: Router) {
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
        // action: this.discount.bind(this),
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
      { property: 'nome', type: 'string', width: '25%', label: 'Nome' },
      { property: 'endereco', type: 'string', width: '50%', label: 'Endereço' },
      { property: 'bairro', type: 'string', width: '25%', label: 'bairro' },
    ];
  }

  abrirModal() {
    this.poModal.open();
  }

  atualizarListagem() {
    this.clienteService.getTodosClientes().pipe().subscribe((res: any) => {
      this.itens = res;
      console.log(this.itens);
    })
  }
}
