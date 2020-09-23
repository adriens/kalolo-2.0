import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KaloloTestModule } from '../../../test.module';
import { ExpressionComponent } from 'app/entities/expression/expression.component';
import { ExpressionService } from 'app/entities/expression/expression.service';
import { Expression } from 'app/shared/model/expression.model';

describe('Component Tests', () => {
  describe('Expression Management Component', () => {
    let comp: ExpressionComponent;
    let fixture: ComponentFixture<ExpressionComponent>;
    let service: ExpressionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KaloloTestModule],
        declarations: [ExpressionComponent],
      })
        .overrideTemplate(ExpressionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExpressionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExpressionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Expression(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.expressions && comp.expressions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
