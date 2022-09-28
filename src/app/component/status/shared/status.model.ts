export class Status{ 
    id: string = '';
    name: string = '';
    createdOn:Date;
    modifiedOn:Date;
  }

  export class StatusVM  extends Status{
    checked?: boolean;
    isEdit?: boolean;
  }