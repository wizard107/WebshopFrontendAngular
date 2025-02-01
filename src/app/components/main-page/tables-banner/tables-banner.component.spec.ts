import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesBannerComponent } from './tables-banner.component';

describe('TablesBannerComponent', () => {
  let component: TablesBannerComponent;
  let fixture: ComponentFixture<TablesBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablesBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablesBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
