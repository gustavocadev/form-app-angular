import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitcherPageComponent } from './switcher-page.component';

describe('SwitcherPageComponent', () => {
  let component: SwitcherPageComponent;
  let fixture: ComponentFixture<SwitcherPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SwitcherPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SwitcherPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
