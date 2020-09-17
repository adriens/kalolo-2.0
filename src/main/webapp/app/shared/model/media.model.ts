import { Moment } from 'moment';
import { IAuteur } from 'app/shared/model/auteur.model';
import { ITypeMedia } from 'app/shared/model/type-media.model';

export interface IMedia {
  id?: number;
  url?: string;
  date?: Moment;
  titre?: string;
  description?: string;
  keywords?: string;
  auteur?: IAuteur;
  type?: ITypeMedia;
}

export class Media implements IMedia {
  constructor(
    public id?: number,
    public url?: string,
    public date?: Moment,
    public titre?: string,
    public description?: string,
    public keywords?: string,
    public auteur?: IAuteur,
    public type?: ITypeMedia
  ) {}
}
