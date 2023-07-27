import React, { FC } from "react";
import RichTextEditor from "src/containers/RichTextEditor";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import useEditorPlayground from "./hooks/useEditorPlayground";
import { EditorState } from "lexical";
import SaveIcon from "@mui/icons-material/Save";
import { exampleContent } from "./constants";

const EditorPlayground: FC = () => {
  const [editorState, setEditorState] = React.useState<EditorState | null>(null);
  const { saveContent, isLoading } = useEditorPlayground();

  const handleSaveContent = () => {
    // console.log(JSON.stringify(editorState));
    // console.log(editorState?.toJSON());
    saveContent(JSON.stringify(editorState));
  };

  return (
    <Grid container gap={2} sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Editor Playground
      </Typography>
      <RichTextEditor
        // editable={false}
        shouldReadFromLocalStorage={false}
        content={exampleContent}
        onChange={editorState => {
          // console.log(editorState)
          setEditorState(editorState);
        }}
        // hasBorder={false}
        // showTreeView
        namespace="1"
      />
      <Stack direction="row" sx={{ justifyContent: "flex-end", width: "100%" }}>
        <LoadingButton
          variant="contained"
          disableElevation
          loading={isLoading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          onClick={handleSaveContent}
        >
          Save
        </LoadingButton>
      </Stack>
    </Grid>
  );
};

export default EditorPlayground;
