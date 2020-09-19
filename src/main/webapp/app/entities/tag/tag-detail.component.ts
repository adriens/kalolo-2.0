import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITag } from 'app/shared/model/tag.model';
import { TagDeleteDialogComponent } from './tag-delete-dialog.component';

@Component({
  selector: 'jhi-tag-detail',
  templateUrl: './tag-detail.component.html',
})
export class TagDetailComponent implements OnInit {
  tag: ITag | null = null;

  constructor(protected activatedRoute: ActivatedRoute, protected modalService: NgbModal) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tag }) => (this.tag = tag));
  }

  previousState(): void {
    window.history.back();
  }

  delete(tag: ITag): void {
    const modalRef = this.modalService.open(TagDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tag = tag;
  }
}
