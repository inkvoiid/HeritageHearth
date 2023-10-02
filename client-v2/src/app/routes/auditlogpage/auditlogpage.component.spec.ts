import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditlogpageComponent } from './auditlogpage.component';

describe('AuditlogpageComponent', () => {
  let component: AuditlogpageComponent;
  let fixture: ComponentFixture<AuditlogpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditlogpageComponent]
    });
    fixture = TestBed.createComponent(AuditlogpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
