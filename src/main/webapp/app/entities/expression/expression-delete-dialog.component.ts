import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExpression } from 'app/shared/model/expression.model';
import { ExpressionService } from './expression.service';

@Component({
  templateUrl: './expression-delete-dialog.component.html',
})
export class ExpressionDeleteDialogComponent {
  expression?: IExpression;

  constructor(
    protected expressionService: ExpressionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.expressionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('expressionListModification');
      this.activeModal.close();
    });
  }
}
