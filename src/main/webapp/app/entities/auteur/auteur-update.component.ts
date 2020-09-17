import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAuteur, Auteur } from 'app/shared/model/auteur.model';
import { AuteurService } from './auteur.service';

@Component({
  selector: 'jhi-auteur-update',
  templateUrl: './auteur-update.component.html',
})
export class AuteurUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nom: [],
    cleAuteur: [],
    urlWeb: [],
    urlFb: [],
    urlInsta: [],
    urlYt: [],
    urlTwit: [],
  });

  constructor(protected auteurService: AuteurService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ auteur }) => {
      this.updateForm(auteur);
    });
  }

  updateForm(auteur: IAuteur): void {
    this.editForm.patchValue({
      id: auteur.id,
      nom: auteur.nom,
      cleAuteur: auteur.cleAuteur,
      urlWeb: auteur.urlWeb,
      urlFb: auteur.urlFb,
      urlInsta: auteur.urlInsta,
      urlYt: auteur.urlYt,
      urlTwit: auteur.urlTwit,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const auteur = this.createFromForm();
    if (auteur.id !== undefined) {
      this.subscribeToSaveResponse(this.auteurService.update(auteur));
    } else {
      this.subscribeToSaveResponse(this.auteurService.create(auteur));
    }
  }

  private createFromForm(): IAuteur {
    return {
      ...new Auteur(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      cleAuteur: this.editForm.get(['cleAuteur'])!.value,
      urlWeb: this.editForm.get(['urlWeb'])!.value,
      urlFb: this.editForm.get(['urlFb'])!.value,
      urlInsta: this.editForm.get(['urlInsta'])!.value,
      urlYt: this.editForm.get(['urlYt'])!.value,
      urlTwit: this.editForm.get(['urlTwit'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAuteur>>): void {
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
