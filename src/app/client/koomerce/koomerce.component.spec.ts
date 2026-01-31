import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KoomerceComponent } from './koomerce.component';

describe('KoomerceComponent', () => {
  let component: KoomerceComponent;
  let fixture: ComponentFixture<KoomerceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KoomerceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KoomerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
