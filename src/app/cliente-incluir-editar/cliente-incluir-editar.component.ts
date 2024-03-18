import {Component, OnInit, ViewChild} from '@angular/core';
import {
  PoDynamicFormComponent,
  PoDynamicFormFieldChanged,
  PoDynamicFormValidation, PoLoadingComponent, PoLoadingOverlayComponent,
  PoModule,
  PoNotificationService,
  PoTableColumnSpacing,
  PoToasterOrientation
} from "@po-ui/ng-components";
import {Cliente} from "../model/cliente.model";
import {TelefoneCliente} from "../model/telefone-cliente.model";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ClienteService} from "../service/cliente.service";
import {Utils} from "../util/utils";

@Component({
  selector: 'app-cliente-incluir-editar',
  standalone: true,
  imports: [
    PoModule,
    RouterLink,
  ],
  templateUrl: './cliente-incluir-editar.component.html',
  styleUrl: './cliente-incluir-editar.component.scss'
})
export class ClienteIncluirEditarComponent implements OnInit {

  fields: Array<any> = []
  fieldsTelefone: Array<any> = []

  hiddenLoading = true

  @ViewChild('dynamicFormTelefoneCliente', {static: true}) dynamicFormTelefoneCliente?: PoDynamicFormComponent;
  @ViewChild('clienteForm', {static: true}) clienteForm?: PoDynamicFormComponent;

  cliente: Cliente = {telefones: []}

  telefoneCliente: TelefoneCliente = {}

  actions = [
    {
      action: this.deletarTelefone.bind(this),
      icon: 'po-icon po-icon-delete',
      label: '',
    },
  ]

  constructor(protected poNotification: PoNotificationService,
              private clienteService: ClienteService,
              private router: Router, private activatedRoute: ActivatedRoute) {
    const paramId = this.activatedRoute.snapshot.paramMap.get('id');
    if (paramId) {
      const codigo = parseInt(paramId);
      this.hiddenLoading = false
      this.clienteService.obterPorId(codigo).subscribe({
        next: (res) => {
          this.cliente = res
        },
        error: (e) => {
          console.error(e)
          this.hiddenLoading = true

          let erro = 'Erro ao buscar cliente'

          if (e.error.error)
            erro = e.error.error

          this.poNotification.error({
            message: erro,
            duration: 5000,
          })

          this.router.navigate(['/cliente']).then(r => console.log(r))
        },
        complete: () => {
          console.log('complete')
          this.hiddenLoading = true
        }
      })
    }
  }

  ngOnInit() {
    this.buildFields()
    this.builderFieldsTelefone()
  }

  buildFields() {
    this.fields = [
      {
        property: 'nome',
        label: 'Nome',
        required: true,
        gridColumns: 6,
        gridSmColumns: 12,
        className: 'custom-class',
        maxLength: 100,
        minLength: 10,
        showRequired: true
      },
      {
        property: 'endereco',
        label: 'Endereço',
        required: false,
        gridColumns: 6,
        gridSmColumns: 12,
        maxLength: 100,
      },
      {
        property: 'bairro',
        label: 'Bairro',
        required: false,
        gridColumns: 6,
        gridSmColumns: 12,
        maxLength: 100,
      },
    ]
  }

  builderFieldsTelefone() {
    this.fieldsTelefone = [
      {
        property: 'telefone',
        label: 'Telefone',
        gridCollums: 12,
        required: true,
        minLength: 15,
        mask: '(99) 99999-9999'
      }
    ]
  }

  getCollumnsTelefone() {
    return [
      {property: 'id', label: 'Id', visible: false, width: '10%',},
      {
        property: 'telefone',
        label: 'Telefone',
        width: '80%',
        required: true,
        type: 'cellTemplate',
        mask: '(99) 99999-9999'
      }
    ];
  }

  getTelefonesCliente(): Array<any> {
    return this.cliente.telefones ? this.cliente.telefones : [];
  }

  protected readonly PoTableColumnSpacing = PoTableColumnSpacing;

  adicionarTelefone() {
    if (this.dynamicFormTelefoneCliente?.form.invalid) return

    if (this.telefoneCliente.telefone) {
      if (this.cliente.telefones?.filter((item: any) => item.telefone === this.telefoneCliente.telefone).length == 0) {
        this.cliente.telefones = [... this.cliente.telefones, this.telefoneCliente]
        this.telefoneCliente = {}
      } else {
        this.poNotification.information({
          message: 'Telefone já cadastrado',
          duration: 5000,
        })
      }
    }
  }

  deletarTelefone(row: any) {
    this.cliente.telefones = this.cliente.telefones?.filter((item: any) => item.telefone !== row.telefone)
    if (!this.cliente.telefones) {
      this.cliente.telefones = []
    }
  }

  salvarCliente() {
    if (this.clienteForm?.form.invalid) {
      this.poNotification.error({
        message: 'Preencha os campos obrigatórios',
        duration: 5000,
      })
      return
    }

    if (!this.cliente.id) {
      this.clienteService.salvarCliente(this.cliente).subscribe({
        next: (v) => {
          this.poNotification.success({
            message: 'Cliente salvo com sucesso',
            duration: 5000,
          })
        },
        error: (e) => {
          console.error(e)
          if (e.error.error)
            var erro = e.error.error

          this.poNotification.error({
            message: erro ? erro : 'Erro ao salvar cliente',
            duration: 5000,
          })

        },
        complete: () => {
          this.router.navigate(['/cliente'])
        }
      })
    } else {
      this.clienteService.alterarCliente(this.cliente).subscribe({
        next: (v) => {
          this.poNotification.success({
            message: 'Cliente alterado com sucesso',
            duration: 5000,
          })
        },
        error: (e) => {
          console.error(e)
          if (e.error.error)
            var erro = e.error.error

          this.poNotification.error({
            message: erro ? erro : 'Erro ao alterar cliente',
            duration: 5000,
          })

        },
        complete: () => {
          this.router.navigate(['/cliente'])
        }
      })
    }
  }

    protected readonly Utils = Utils;
}
