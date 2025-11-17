import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAuthorizePageComponent } from './un-authorize-page-component';

describe('UnAuthorizePageComponent', () => {
  let component: UnAuthorizePageComponent;
  let fixture: ComponentFixture<UnAuthorizePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnAuthorizePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnAuthorizePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
