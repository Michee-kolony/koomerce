import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoircommandeComponent } from './voircommande.component';

describe('VoircommandeComponent', () => {
  let component: VoircommandeComponent;
  let fixture: ComponentFixture<VoircommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VoircommandeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoircommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
