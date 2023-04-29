export interface Row {
    id: string;
    studentId: string;
    companyBranchId: string;
    Student: {
        name: string;
    };
    CompanyBranch: {
        location: string;
        Company: {
            name: string;
        };
    };
}