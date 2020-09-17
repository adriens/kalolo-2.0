import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KaloloTestModule } from '../../../test.module';
import { TypeMediaDetailComponent } from 'app/entities/type-media/type-media-detail.component';
import { TypeMedia } from 'app/shared/model/type-media.model';

describe('Component Tests', () => {
  describe('TypeMedia Management Detail Component', () => {
    let comp: TypeMediaDetailComponent;
    let fixture: ComponentFixture<TypeMediaDetailComponent>;
    const route = ({ data: of({ typeMedia: new TypeMedia(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KaloloTestModule],
        declarations: [TypeMediaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TypeMediaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TypeMediaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load typeMedia on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.typeMedia).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
