import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IExpression, Expression } from 'app/shared/model/expression.model';
import { ExpressionService } from './expression.service';
import { ITag } from 'app/shared/model/tag.model';
import { TagService } from 'app/entities/tag/tag.service';

@Component({
  selector: 'jhi-expression-update',
  templateUrl: './expression-update.component.html',
})
export class ExpressionUpdateComponent implements OnInit {
  isSaving = false;
  tags: ITag[] = [];

  editForm = this.fb.group({
    id: [],
    text: [],
    points: [],
    tags: [],
  });

  constructor(
    protected expressionService: ExpressionService,
    protected tagService: TagService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ expression }) => {
      this.updateForm(expression);

      this.tagService.query().subscribe((res: HttpResponse<ITag[]>) => (this.tags = res.body || []));
    });
  }

  updateForm(expression: IExpression): void {
    this.editForm.patchValue({
      id: expression.id,
      text: expression.text,
      points: expression.points,
      tags: expression.tags,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const expression = this.createFromForm();
    if (expression.id !== undefined) {
      this.subscribeToSaveResponse(this.expressionService.update(expression));
    } else {
      this.subscribeToSaveResponse(this.expressionService.create(expression));
    }
  }

  private createFromForm(): IExpression {
    return {
      ...new Expression(),
      id: this.editForm.get(['id'])!.value,
      text: this.editForm.get(['text'])!.value,
      points: this.editForm.get(['points'])!.value,
      tags: this.editForm.get(['tags'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExpression>>): void {
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

  trackById(index: number, item: ITag): any {
    return item.id;
  }

  getSelected(selectedVals: ITag[], option: ITag): ITag {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
