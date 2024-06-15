import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HellofetchcacheComponent } from './hellofetchcache.component';

describe('HellofetchcacheComponent', () => {
  let component: HellofetchcacheComponent;
  let fixture: ComponentFixture<HellofetchcacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HellofetchcacheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HellofetchcacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
