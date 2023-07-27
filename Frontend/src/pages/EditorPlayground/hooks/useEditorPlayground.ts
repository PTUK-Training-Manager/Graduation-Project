import { useMutation } from "@tanstack/react-query";
import useSnackbar from "src/hooks/useSnackbar";

const useEditorPlayground = () => {
  const { showSnackbar } = useSnackbar();

  // TODO: replace this with the actual API call
  const saveContentMutationFn = (editorStateString: string) => {
    console.log(editorStateString);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("saved");
      }, 1000);
    });
  };

  const { mutate: saveContent, isLoading } = useMutation(
    ["EditorPlayground"],
    (editorStateString: string) => saveContentMutationFn(editorStateString),
    {
      onSuccess: () => {
        showSnackbar({
          severity: "success",
          variant: "standard",
          message: "Saved Successfully",
          autoHideDuration: 2000,
        });
      },
    }
  );

  return {
    saveContent,
    isLoading,
  };
};

export default useEditorPlayground;
