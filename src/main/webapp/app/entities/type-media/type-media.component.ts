import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITypeMedia } from 'app/shared/model/type-media.model';
import { TypeMediaService } from './type-media.service';
import { TypeMediaDeleteDialogComponent } from './type-media-delete-dialog.component';

@Component({
  selector: 'jhi-type-media',
  templateUrl: './type-media.component.html',
})
export class TypeMediaComponent implements OnInit, OnDestroy {
  typeMedias?: ITypeMedia[];
  eventSubscriber?: Subscription;

  constructor(protected typeMediaService: TypeMediaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.typeMediaService.query().subscribe((res: HttpResponse<ITypeMedia[]>) => (this.typeMedias = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTypeMedias();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITypeMedia): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTypeMedias(): void {
    this.eventSubscriber = this.eventManager.subscribe('typeMediaListModification', () => this.loadAll());
  }

  delete(typeMedia: ITypeMedia): void {
    const modalRef = this.modalService.open(TypeMediaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.typeMedia = typeMedia;
  }
}
