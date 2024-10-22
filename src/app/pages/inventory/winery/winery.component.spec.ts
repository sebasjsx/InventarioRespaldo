import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineryComponent } from './winery.component';

describe('WineryComponent', () => {
  let component: WineryComponent;
  let fixture: ComponentFixture<WineryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WineryComponent]
    });
    fixture = TestBed.createComponent(WineryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
