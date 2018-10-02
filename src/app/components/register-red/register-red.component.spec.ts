import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRedComponent } from './register-red.component';

describe('RegisterRedComponent', () => {
  let component: RegisterRedComponent;
  let fixture: ComponentFixture<RegisterRedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterRedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterRedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
