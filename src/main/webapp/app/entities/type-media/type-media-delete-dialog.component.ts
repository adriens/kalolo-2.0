import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITypeMedia } from 'app/shared/model/type-media.model';
import { TypeMediaService } from './type-media.service';

@Component({
  templateUrl: './type-media-delete-dialog.component.html',
})
export class TypeMediaDeleteDialogComponent {
  typeMedia?: ITypeMedia;

  constructor(protected typeMediaService: TypeMediaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.typeMediaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('typeMediaListModification');
      this.activeModal.close();
    });
  }
}
