import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedsBannerComponent } from './beds-banner.component';

describe('BedsBannerComponent', () => {
  let component: BedsBannerComponent;
  let fixture: ComponentFixture<BedsBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BedsBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BedsBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
