import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KaloloSharedModule } from 'app/shared/shared.module';
import { TypeMediaComponent } from './type-media.component';
import { TypeMediaDetailComponent } from './type-media-detail.component';
import { TypeMediaUpdateComponent } from './type-media-update.component';
import { TypeMediaDeleteDialogComponent } from './type-media-delete-dialog.component';
import { typeMediaRoute } from './type-media.route';

@NgModule({
  imports: [KaloloSharedModule, RouterModule.forChild(typeMediaRoute)],
  declarations: [TypeMediaComponent, TypeMediaDetailComponent, TypeMediaUpdateComponent, TypeMediaDeleteDialogComponent],
  entryComponents: [TypeMediaDeleteDialogComponent],
})
export class KaloloTypeMediaModule {}
