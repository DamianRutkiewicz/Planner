import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeIconComponent } from './change-icon.component';

describe('ChangeIconComponent', () => {
  let component: ChangeIconComponent;
  let fixture: ComponentFixture<ChangeIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
