import React, { FC } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import theme from "src/styling/customTheme";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Typography from "@mui/material/Typography";
import TextFieldWrapper from "src/components/FormsUI/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import { useFormikContext } from "formik";
import { LoginRequestBody } from "../api/request.dto";
import { useLoginContext } from "../context/LoginContext";
import { DialogType } from "../constants";
import { LoginFormProps } from "../types";

const LoginForm: FC<LoginFormProps> = ({ isLoggingIn }) => {
  const { isValid } = useFormikContext<LoginRequestBody>();
  const { onOpenDialog } = useLoginContext();

  const handleOpenForgotPasswordDialog = () => onOpenDialog(DialogType.FORGET_PASSWORD);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Paper
        elevation={10}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          p: 4,
          pb: 1,
          width: { xs: "90%" },
          maxWidth: { md: "520px" },
        }}
      >
        <Stack alignItems="center" sx={{ position: "relative" }}>
          <Avatar
            sx={{
              bgcolor: "secondary.main",
              backgroundColor: "primary.main",
              position: "absolute",
              top: `calc(-${theme.spacing(4)} - 20px)`, // -padding - half of the avatar size
            }}
          >
            <LockOpenIcon />
          </Avatar>
          <Stack direction="row" gap={2} sx={{ alignItems: "center", mb: 3 }}>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
          </Stack>
          <TextFieldWrapper name="username" label="Username" sx={{ mb: 2.5 }} />
          <TextFieldWrapper name="password" label="Password" type="password" />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" size="small" />}
            label="Remember me"
            sx={{
              my: 1,
              alignSelf: "flex-start",
              color: "text.secondary",
            }}
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            disabled={!isValid}
            loading={isLoggingIn}
            // loadingPosition="start"
            sx={{ mb: 1 }}
          >
            Login
          </LoadingButton>
          <Button sx={{ textTransform: "none" }} onClick={handleOpenForgotPasswordDialog}>
            Forgotten your username or password?
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default LoginForm;
