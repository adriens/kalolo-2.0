import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'auteur',
        loadChildren: () => import('./auteur/auteur.module').then(m => m.KaloloAuteurModule),
      },
      {
        path: 'expression',
        loadChildren: () => import('./expression/expression.module').then(m => m.KaloloExpressionModule),
      },
      {
        path: 'media',
        loadChildren: () => import('./media/media.module').then(m => m.KaloloMediaModule),
      },
      {
        path: 'tag',
        loadChildren: () => import('./tag/tag.module').then(m => m.KaloloTagModule),
      },
      {
        path: 'type-media',
        loadChildren: () => import('./type-media/type-media.module').then(m => m.KaloloTypeMediaModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class KaloloEntityModule {}
