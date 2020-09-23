import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IExpression } from 'app/shared/model/expression.model';
import { ExpressionService } from './expression.service';
import { ExpressionDeleteDialogComponent } from './expression-delete-dialog.component';

@Component({
  selector: 'jhi-expression',
  templateUrl: './expression.component.html',
})
export class ExpressionComponent implements OnInit, OnDestroy {
  expressions?: IExpression[];
  eventSubscriber?: Subscription;

  constructor(protected expressionService: ExpressionService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.expressionService.query().subscribe((res: HttpResponse<IExpression[]>) => (this.expressions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInExpressions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IExpression): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInExpressions(): void {
    this.eventSubscriber = this.eventManager.subscribe('expressionListModification', () => this.loadAll());
  }

  delete(expression: IExpression): void {
    const modalRef = this.modalService.open(ExpressionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.expression = expression;
  }

}
