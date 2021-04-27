import { IEmploye } from 'app/entities/administration/employe/employe.model';

export interface IElementsAgent {
  id?: number;
  libellePhoto?: string | null;
  photoContentType?: string | null;
  photo?: string | null;
  extensionPhoto?: string | null;
  libelleSignature?: string | null;
  signatureContentType?: string | null;
  signature?: string | null;
  extensionSignature?: string | null;
  docTypePhoto?: string | null;
  docTypeSignature?: string | null;
  pieceJointContentType?: string | null;
  pieceJoint?: string | null;
  require?: boolean | null;
  employe?: IEmploye | null;
}

export class ElementsAgent implements IElementsAgent {
  constructor(
    public id?: number,
    public libellePhoto?: string | null,
    public photoContentType?: string | null,
    public photo?: string | null,
    public extensionPhoto?: string | null,
    public libelleSignature?: string | null,
    public signatureContentType?: string | null,
    public signature?: string | null,
    public extensionSignature?: string | null,
    public docTypePhoto?: string | null,
    public docTypeSignature?: string | null,
    public pieceJointContentType?: string | null,
    public pieceJoint?: string | null,
    public require?: boolean | null,
    public employe?: IEmploye | null
  ) {
    this.require = this.require ?? false;
  }
}

export function getElementsAgentIdentifier(elementsAgent: IElementsAgent): number | undefined {
  return elementsAgent.id;
}
