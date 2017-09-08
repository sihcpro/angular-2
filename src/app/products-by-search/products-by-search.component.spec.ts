import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsBySearchComponent } from './products-by-search.component';

describe('ProductsBySearchComponent', () => {
  let component: ProductsBySearchComponent;
  let fixture: ComponentFixture<ProductsBySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsBySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsBySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
