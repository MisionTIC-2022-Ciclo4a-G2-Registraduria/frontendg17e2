import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaysTableComponent } from './plays-table.component';

describe('PlaysTableComponent', () => {
  let component: PlaysTableComponent;
  let fixture: ComponentFixture<PlaysTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaysTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaysTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
