import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KaloloSharedModule } from 'app/shared/shared.module';
import { ExpressionComponent } from './expression.component';
import { ExpressionDetailComponent } from './expression-detail.component';
import { ExpressionUpdateComponent } from './expression-update.component';
import { ExpressionDeleteDialogComponent } from './expression-delete-dialog.component';
import { expressionRoute } from './expression.route';

@NgModule({
  imports: [KaloloSharedModule, RouterModule.forChild(expressionRoute)],
  declarations: [ExpressionComponent, ExpressionDetailComponent, ExpressionUpdateComponent, ExpressionDeleteDialogComponent],
  entryComponents: [ExpressionDeleteDialogComponent],
})
export class KaloloExpressionModule {}
