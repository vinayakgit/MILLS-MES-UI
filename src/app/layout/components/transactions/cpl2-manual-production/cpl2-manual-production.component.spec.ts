import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cpl2ManualProductionComponent } from './cpl2-manual-production.component';

describe('Cpl2ManualProductionComponent', () => {
  let component: Cpl2ManualProductionComponent;
  let fixture: ComponentFixture<Cpl2ManualProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cpl2ManualProductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cpl2ManualProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
