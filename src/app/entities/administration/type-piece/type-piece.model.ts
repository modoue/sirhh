import { IEmploye } from 'app/entities/administration/employe/employe.model';

export interface ITypePiece {
  id?: number;
  codeTypePiece?: string;
  libelleTypePiece?: string;
  employes?: IEmploye[] | null;
}

export class TypePiece implements ITypePiece {
  constructor(public id?: number, public codeTypePiece?: string, public libelleTypePiece?: string, public employes?: IEmploye[] | null) {}
}

export function getTypePieceIdentifier(typePiece: ITypePiece): number | undefined {
  return typePiece.id;
}
