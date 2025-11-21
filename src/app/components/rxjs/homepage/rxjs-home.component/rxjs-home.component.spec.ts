import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsHomeComponent } from './rxjs-home.component';

describe('RxjsHomeComponent', () => {
  let component: RxjsHomeComponent;
  let fixture: ComponentFixture<RxjsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxjsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
