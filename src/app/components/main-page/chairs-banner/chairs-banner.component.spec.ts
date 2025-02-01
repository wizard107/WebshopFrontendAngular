import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChairsBannerComponent } from './chairs-banner.component';

describe('ChairsBannerComponent', () => {
  let component: ChairsBannerComponent;
  let fixture: ComponentFixture<ChairsBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChairsBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChairsBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
