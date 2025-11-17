import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableImageComponent } from './reusable-image-component';

describe('ReusableImageComponent', () => {
  let component: ReusableImageComponent;
  let fixture: ComponentFixture<ReusableImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReusableImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReusableImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
