import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HellofetchComponent } from './hellofetch.component';

describe('HellofetchComponent', () => {
  let component: HellofetchComponent;
  let fixture: ComponentFixture<HellofetchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HellofetchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HellofetchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
