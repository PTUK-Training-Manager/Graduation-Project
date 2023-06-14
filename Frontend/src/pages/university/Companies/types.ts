export interface Row {
    map(arg0: (company: any) => { id: any; name: any; }): unknown;
    id: string;
    name: string;
    phoneNumber: string;
    managerName: string;
    userId: string;
    User: {
      email: string;
    };
  }