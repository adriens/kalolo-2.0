import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExpression } from 'app/shared/model/expression.model';

@Component({
  selector: 'jhi-expression-detail',
  templateUrl: './expression-detail.component.html',
})
export class ExpressionDetailComponent implements OnInit {
  expression: IExpression | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ expression }) => (this.expression = expression));
  }

  previousState(): void {
    window.history.back();
  }
}
