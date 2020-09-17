export interface ITypeMedia {
  id?: number;
  libelle?: string;
}

export class TypeMedia implements ITypeMedia {
  constructor(public id?: number, public libelle?: string) {}
}
