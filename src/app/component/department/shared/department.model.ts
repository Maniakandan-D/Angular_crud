export class Department{
  id: string = '';
  name: string = '';
}

export class DepartmentVM  extends Department{
  checked?: boolean;
  isEdit?: boolean;
}

