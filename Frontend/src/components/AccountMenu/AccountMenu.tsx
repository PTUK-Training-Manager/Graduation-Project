/* eslint-disable react/jsx-key */
import React, { FC, useState, MouseEvent, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import useAccountContext from "src/hooks/useAccountContext";
import { cyan, grey } from "@mui/material/colors";
import { addField } from "src/api/addField";
import { GetAllFieldsData, getAllFields } from "src/api/getAllFields";
import useAccountMenuAPI from "../hooks/useAccountMenuAPI";
import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import useSnackbar from "src/hooks/useSnackbar";
import { useNavigate } from "react-router-dom";

const AccountMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [fieldOptions, setFieldOptions] = useState<GetAllFieldsData[]>([]);
  const [selectedFields, setSelectedFields] = useState<{ id: string; label: string }[]>([]);

  const open = Boolean(anchorEl);

  const { getUser } = useAccountContext();
  const user = getUser();

  const { logout } = useAccountMenuAPI();
  const [openAddFieldDialog, setOpenAddFieldDialog] = useState(false);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const navigateToResetPasswordPagePage = () => {
    navigate("/me/reset-password");
    handleClose();
  };
  const userInitial = user?.username[0].toUpperCase();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  const handleAddField = () => {
    console.log(selectedFields);
    const fields = selectedFields.map(field => {
      if (field.id) {
        // If the field has an ID, send only the ID in the request body
        return { id: field.id };
      } else {
        // If the field doesn't have an ID, send the label in the request body
        return { label: field.label };
      }
    });
    console.log(fields);
    //@ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addField({ fields }).then((res: { success: boolean; message: any }) => {
      if (res.success === true) {
        showSnackbar({ severity: "success", message: res.message });
        setSelectedFields([]);
        setOpenAddFieldDialog(false);
      } else if (res.success === false) {
        showSnackbar({ severity: "warning", message: res.message });
        setSelectedFields([]);
        setOpenAddFieldDialog(false);
      }
    });
  };

  const handleCancelAddField = () => {
    setOpenAddFieldDialog(false);
  };

  const handleClickAddField = () => {
    setOpenAddFieldDialog(true);
  };

  {
    user?.roleId == 6 &&
      useEffect(() => {
        getAllFields().then(res => {
          if (res.success) {
            //@ts-ignore
            const options = res.data.map(field => ({
              id: field.id,
              label: field.field,
            })) as GetAllFieldsData[];
            setFieldOptions(options);
          }
        });
      }, []);
  }

  return (
    <>
      <>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ bgcolor: cyan[50], color: grey[800] }}>{userInitial}</Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>
            <Avatar /> Profile
          </MenuItem>
          <MenuItem onClick={navigateToResetPasswordPagePage}>
            <Avatar /> Reset My Password
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>

          {user?.roleId == 6 && (
            <MenuItem onClick={handleClickAddField}>
              <ListItemIcon>
                <AddIcon fontSize="small" />
              </ListItemIcon>
              Add Field
            </MenuItem>
          )}
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </>
      <Dialog open={openAddFieldDialog} onClose={handleCancelAddField} maxWidth="xs" fullWidth>
        <DialogTitle>Add New Field</DialogTitle>
        <DialogContent>
          Please write a new field or select from the options:
          <Autocomplete
            multiple
            id="field"
            options={fieldOptions}
            //@ts-ignore
            getOptionLabel={option => option.label}
            onChange={(event, newValue) => {
              if (Array.isArray(newValue)) {
                const newSelectedFields = newValue.map(option => {
                  //@ts-ignore
                  if (option.label) {
                    // Existing option
                    return option;
                  } else {
                    // New value entered
                    return { label: option, id: "" };
                  }
                });
                //@ts-ignore
                setSelectedFields(newSelectedFields);
              }
            }}
            //@ts-ignore
            getOptionSelected={(option, value) =>
              option.id === value.id || option.label === value.label
            }
            freeSolo
            //@ts-ignore
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                //@ts-ignore
                if (option.label) {
                  // Render existing options
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <Chip
                      variant="outlined"
                      //@ts-ignore
                      label={option.label}
                      {...getTagProps({ index })}
                    />
                  );
                } else {
                  // Render new values
                  return (
                    <Chip
                      variant="outlined"
                      //@ts-ignore

                      label={option}
                      {...getTagProps({ index })}
                    />
                  );
                }
              })
            }
            renderInput={params => (
              <TextField
                {...params}
                margin="dense"
                variant="filled"
                label="Fields"
                onKeyDown={event => {
                  //@ts-ignore
                  if (event.key === "Enter" && event.target.value) {
                    //@ts-ignore
                    const newField = { id: "", label: event.target.value };
                    setSelectedFields(prevSelectedFields => [...prevSelectedFields, newField]);
                    //@ts-ignore
                    event.target.value = "";
                  }
                }}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelAddField} color="error" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleAddField} color="success" variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AccountMenu;
