import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HerramientasTecnicasComponent } from './herramientas-tecnicas.component';

describe('HerramientasTecnicasComponent', () => {
  let component: HerramientasTecnicasComponent;
  let fixture: ComponentFixture<HerramientasTecnicasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HerramientasTecnicasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerramientasTecnicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
