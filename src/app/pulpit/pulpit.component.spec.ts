import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PulpitComponent } from './pulpit.component';

describe('PulpitComponent', () => {
  let component: PulpitComponent;
  let fixture: ComponentFixture<PulpitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PulpitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PulpitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
