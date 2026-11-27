import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelecionarContexto } from './selecionar-contexto';

describe('SelecionarContexto', () => {
  let component: SelecionarContexto;
  let fixture: ComponentFixture<SelecionarContexto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelecionarContexto],
    }).compileComponents();

    fixture = TestBed.createComponent(SelecionarContexto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
