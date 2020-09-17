import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KaloloTestModule } from '../../../test.module';
import { TypeMediaUpdateComponent } from 'app/entities/type-media/type-media-update.component';
import { TypeMediaService } from 'app/entities/type-media/type-media.service';
import { TypeMedia } from 'app/shared/model/type-media.model';

describe('Component Tests', () => {
  describe('TypeMedia Management Update Component', () => {
    let comp: TypeMediaUpdateComponent;
    let fixture: ComponentFixture<TypeMediaUpdateComponent>;
    let service: TypeMediaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KaloloTestModule],
        declarations: [TypeMediaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TypeMediaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TypeMediaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TypeMediaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TypeMedia(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TypeMedia();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
