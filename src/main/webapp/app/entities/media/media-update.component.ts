import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IMedia, Media } from 'app/shared/model/media.model';
import { MediaService } from './media.service';
import { IAuteur } from 'app/shared/model/auteur.model';
import { AuteurService } from 'app/entities/auteur/auteur.service';
import { ITypeMedia } from 'app/shared/model/type-media.model';
import { TypeMediaService } from 'app/entities/type-media/type-media.service';

type SelectableEntity = IAuteur | ITypeMedia;

@Component({
  selector: 'jhi-media-update',
  templateUrl: './media-update.component.html',
})
export class MediaUpdateComponent implements OnInit {
  isSaving = false;
  auteurs: IAuteur[] = [];
  typemedias: ITypeMedia[] = [];

  editForm = this.fb.group({
    id: [],
    url: [],
    date: [],
    titre: [],
    description: [],
    keywords: [],
    auteur: [],
    type: [],
  });

  constructor(
    protected mediaService: MediaService,
    protected auteurService: AuteurService,
    protected typeMediaService: TypeMediaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ media }) => {
      if (!media.id) {
        const today = moment().startOf('day');
        media.date = today;
      }

      this.updateForm(media);

      this.auteurService.query().subscribe((res: HttpResponse<IAuteur[]>) => (this.auteurs = res.body || []));

      this.typeMediaService.query().subscribe((res: HttpResponse<ITypeMedia[]>) => (this.typemedias = res.body || []));
    });
  }

  updateForm(media: IMedia): void {
    this.editForm.patchValue({
      id: media.id,
      url: media.url,
      date: media.date ? media.date.format(DATE_TIME_FORMAT) : null,
      titre: media.titre,
      description: media.description,
      keywords: media.keywords,
      auteur: media.auteur,
      type: media.type,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const media = this.createFromForm();
    if (media.id !== undefined) {
      this.subscribeToSaveResponse(this.mediaService.update(media));
    } else {
      this.subscribeToSaveResponse(this.mediaService.create(media));
    }
  }

  private createFromForm(): IMedia {
    return {
      ...new Media(),
      id: this.editForm.get(['id'])!.value,
      url: this.editForm.get(['url'])!.value,
      date: this.editForm.get(['date'])!.value ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      titre: this.editForm.get(['titre'])!.value,
      description: this.editForm.get(['description'])!.value,
      keywords: this.editForm.get(['keywords'])!.value,
      auteur: this.editForm.get(['auteur'])!.value,
      type: this.editForm.get(['type'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMedia>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
