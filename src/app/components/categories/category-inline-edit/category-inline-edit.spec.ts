import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryInlineEdit } from './category-inline-edit';

describe('CategoryInlineEdit', () => {
  let component: CategoryInlineEdit;
  let fixture: ComponentFixture<CategoryInlineEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryInlineEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryInlineEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
