import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteIncluirEditarComponent } from './cliente-incluir-editar.component';

describe('ClienteIncluirEditarComponent', () => {
  let component: ClienteIncluirEditarComponent;
  let fixture: ComponentFixture<ClienteIncluirEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteIncluirEditarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClienteIncluirEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
