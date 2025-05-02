import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlltaskitemsComponent } from './alltaskitems.component';

describe('AlltaskitemsComponent', () => {
  let component: AlltaskitemsComponent;
  let fixture: ComponentFixture<AlltaskitemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlltaskitemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlltaskitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
