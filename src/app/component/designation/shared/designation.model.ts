export class Designation{ 
    id: string;
    name: string;
  }

  export class DesignationVM  extends Designation{
    checked?: boolean;
    isEdit?: boolean;
  }