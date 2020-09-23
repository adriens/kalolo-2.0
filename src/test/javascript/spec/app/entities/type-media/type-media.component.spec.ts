import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KaloloTestModule } from '../../../test.module';
import { TypeMediaComponent } from 'app/entities/type-media/type-media.component';
import { TypeMediaService } from 'app/entities/type-media/type-media.service';
import { TypeMedia } from 'app/shared/model/type-media.model';

describe('Component Tests', () => {
  describe('TypeMedia Management Component', () => {
    let comp: TypeMediaComponent;
    let fixture: ComponentFixture<TypeMediaComponent>;
    let service: TypeMediaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KaloloTestModule],
        declarations: [TypeMediaComponent],
      })
        .overrideTemplate(TypeMediaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TypeMediaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TypeMediaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TypeMedia(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.typeMedias && comp.typeMedias[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
