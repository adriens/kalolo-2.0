import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KaloloTestModule } from '../../../test.module';
import { ExpressionDetailComponent } from 'app/entities/expression/expression-detail.component';
import { Expression } from 'app/shared/model/expression.model';

describe('Component Tests', () => {
  describe('Expression Management Detail Component', () => {
    let comp: ExpressionDetailComponent;
    let fixture: ComponentFixture<ExpressionDetailComponent>;
    const route = ({ data: of({ expression: new Expression(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KaloloTestModule],
        declarations: [ExpressionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ExpressionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExpressionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load expression on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.expression).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
