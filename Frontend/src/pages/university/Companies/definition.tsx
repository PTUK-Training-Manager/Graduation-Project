import { IconButton } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';
import { createDataGrid } from 'src/components/DataGridTanstack';
import { useState } from 'react';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { getBranch } from 'src/api/getBranch';
import { CompaniesData } from './api/types';
import useSnackbar from 'src/hooks/useSnackbar';
import { addBranch } from './api';
import { useTranslation } from 'react-i18next';
import React from 'react';

interface Branch {
    map(arg0: (company: any) => { id: any; location: any }): unknown;
    id: string;
    location: string;
  }
  
const uselogic = () => {
    const [companyName, setCompanyName] = useState('');
    const [showBranches, setShowBranches] = useState<boolean>(false);
    const [companyId, setCompanyId] = useState('');
    const [addBranchDiolog, setAddBranchDiolog] = useState(false);
    const [location, setLocation] = useState('');
    const [availableBranches, setAvailableBranches] = useState<Branch[]>([]);
    const { showSnackbar } = useSnackbar();
    const handleshowBranchesClose = () => {
        setShowBranches(false);
      };
    
      const handleAddBranchDialogOpen = () => {
        setAddBranchDiolog(true);
      };
    
      const handleAddBranchDialogClose = () => {
        setAddBranchDiolog(false);
        setShowBranches(false);
      };
    
      const handleAddBranch = () => {
        addBranch({ id: companyId, location: location }).then(
          (res: { success: boolean; message: any }) => {
            if (res.success === true) {
              showSnackbar({ severity: 'success', message: res.message });
              setLocation('');
              handleAddBranchDialogClose();
            } else if (res.success === false) {
              showSnackbar({ severity: 'warning', message: res.message });
              setLocation('');
              handleAddBranchDialogClose();
            }
          }
        );
      };
    const handleShowBranchesOpen = (id: string, name: string) => {
        setCompanyName(name);
        setShowBranches(true)
        setCompanyId(id);
        console.log(id);
        console.log(companyId);
        console.log(companyName);
        setShowBranches(true);
        getBranch({ companyId: id }).then((res) => {
          if (res.success === true) {
            setAvailableBranches(res.data);
          } else if (res.success === false) {
            showSnackbar({ severity: 'warning', message: res.message });
          }
        });
      };
  const [isOpen, setIsOpen] = useState(false);
  const [trainingId, setTrainingId] = useState('');
 //@ts-ignore
  const {t}=useTranslation();
  const ManegarName = t('Manegar Name');
  const PhoneNumber = t('Phone Number');
const CompanyName=t('Company Name');
const Email=t('EmailT');
const Branches=t('Branches');
const CompanyId=t('CompanyId');

  const handleOpenDialog = (id: string) => {
    setTrainingId(id);
    console.log(trainingId);
    console.log(isOpen);
    setIsOpen((prev) => !prev);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setTrainingId('');
  };

  const columns: ColumnDef<CompaniesData, any>[] = [
    {
      accessorKey: 'id',
      header:CompanyId ,
    },
    {
      accessorKey: 'name',
      header: CompanyName,
      filterFn: 'arrIncludesSome',
    },
    {
        accessorKey: 'phoneNumber',
        header: PhoneNumber,
        filterFn: 'arrIncludesSome',
      },
      {
        accessorKey: 'User.email',
        header: Email,
        filterFn: 'arrIncludesSome',
      },
      {
        accessorKey: 'managerName',
        header: ManegarName,
        filterFn: 'arrIncludesSome',
      },
  
    {
      header: Branches,
      cell: (props) => {
        const {
          row: { original },
        } = props;
        const name = original.name;
        return (
          <IconButton
            sx={{ ml: 1.5 }}
            aria-label="progress form"
            onClick={() => handleShowBranchesOpen(original.id, name)}
          >
            <AddBusinessIcon sx={{ color: '#820000' }} />
          </IconButton>
        );
      },
    },
  ];
  const CompaniesDataGrid = React.useMemo(() => {
    return createDataGrid({
      name: 'CompaniesDataGrid',
      columns,
      shouldFlexGrowCells: true,
    });
  }, []);
  

  return {
   CompaniesDataGrid,
   handleAddBranch,
   handleAddBranchDialogClose,
   handleAddBranchDialogOpen,
   handleCloseDialog,
   handleOpenDialog,
   handleShowBranchesOpen,
   handleshowBranchesClose,
   availableBranches,
   companyName,
   companyId,
   addBranchDiolog,
   showBranches,
  };
};
export default uselogic;
