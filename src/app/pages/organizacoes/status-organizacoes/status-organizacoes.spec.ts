import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusOrganizacoes } from './status-organizacoes';

describe('StatusOrganizacoes', () => {
  let component: StatusOrganizacoes;
  let fixture: ComponentFixture<StatusOrganizacoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusOrganizacoes],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusOrganizacoes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
