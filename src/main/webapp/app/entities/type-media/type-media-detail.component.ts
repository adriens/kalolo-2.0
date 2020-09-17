import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITypeMedia } from 'app/shared/model/type-media.model';

@Component({
  selector: 'jhi-type-media-detail',
  templateUrl: './type-media-detail.component.html',
})
export class TypeMediaDetailComponent implements OnInit {
  typeMedia: ITypeMedia | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ typeMedia }) => (this.typeMedia = typeMedia));
  }

  previousState(): void {
    window.history.back();
  }
}
