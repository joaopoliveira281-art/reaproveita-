import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmarEmail } from './confirmar-email';

describe('ConfirmarEmail', () => {
  let component: ConfirmarEmail;
  let fixture: ComponentFixture<ConfirmarEmail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmarEmail],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmarEmail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
