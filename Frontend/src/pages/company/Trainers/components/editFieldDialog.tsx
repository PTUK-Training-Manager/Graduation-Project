// import { Dialog, DialogTitle, DialogContent, Autocomplete, TextField, DialogActions, Button } from "@mui/material";
// import { FC } from "react";

// interface EditFieldForTrainerDialogProps {
   
//   }
  
//   const ProgressFormDialog: FC<EditFieldForTrainerDialogProps> = () => {
   
  
//     return (
//         <Dialog
//         fullWidth
//         className="dialog-box"
//         open={updateFieldForTrainerOpen}
//         onClose={handleUpdateFieldDialogClose}
//         BackdropProps={{ invisible: true }}
//         aria-labelledby="form-dialog-title"
//       >
//         <DialogTitle id="form-dialog-title">Edit Field</DialogTitle>
//         <DialogContent>
//           <Autocomplete
//             id="field"
//             options={fieldOptions}
//             getOptionLabel={(option) => option.Field.field}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 margin="dense"
//                 label="Field"
//                 variant="outlined"
//               />
//             )}
//             onChange={(event, newValue) => {
//               formikProps.setFieldValue('fieldId', newValue?.id || '');
//               setNewFieldId(newValue?.id || '');
//             }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleUpdateFieldDialogClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleSaveUpdatedValueField} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     );
//   };
  
//   export default ProgressFormDialog;
  