import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInlineEdit } from './product-inline-edit';

describe('ProductInlineEdit', () => {
  let component: ProductInlineEdit;
  let fixture: ComponentFixture<ProductInlineEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductInlineEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductInlineEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
