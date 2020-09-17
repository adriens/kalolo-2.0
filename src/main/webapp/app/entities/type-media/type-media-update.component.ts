import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITypeMedia, TypeMedia } from 'app/shared/model/type-media.model';
import { TypeMediaService } from './type-media.service';

@Component({
  selector: 'jhi-type-media-update',
  templateUrl: './type-media-update.component.html',
})
export class TypeMediaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    libelle: [],
  });

  constructor(protected typeMediaService: TypeMediaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ typeMedia }) => {
      this.updateForm(typeMedia);
    });
  }

  updateForm(typeMedia: ITypeMedia): void {
    this.editForm.patchValue({
      id: typeMedia.id,
      libelle: typeMedia.libelle,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const typeMedia = this.createFromForm();
    if (typeMedia.id !== undefined) {
      this.subscribeToSaveResponse(this.typeMediaService.update(typeMedia));
    } else {
      this.subscribeToSaveResponse(this.typeMediaService.create(typeMedia));
    }
  }

  private createFromForm(): ITypeMedia {
    return {
      ...new TypeMedia(),
      id: this.editForm.get(['id'])!.value,
      libelle: this.editForm.get(['libelle'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITypeMedia>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
