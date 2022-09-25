export class Status{ 
    id: string = '';
    name: string = '';
    createdOn:Date;
    modifiedOn:Date;
  }

export interface Status {
    checked?: boolean;
  }