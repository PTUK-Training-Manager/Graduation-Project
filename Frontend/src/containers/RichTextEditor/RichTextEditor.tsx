import React, {FC} from 'react';
import {EditorState} from 'lexical';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {HorizontalRulePlugin} from '@lexical/react/LexicalHorizontalRulePlugin';
import {ListPlugin} from '@lexical/react/LexicalListPlugin';
import {CheckListPlugin} from '@lexical/react/LexicalCheckListPlugin';
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import Toolbar from "./components/Toolbar";
import LocalStoragePlugin from "./plugins/LocalStoragePlugin";
import TreeViewPlugin from './plugins/TreeViewPlugin';
import Stack from "@mui/material/Stack";
import Placeholder from "./components/Placeholder";
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import {initialConfig} from "./constants";
import useStyles from "./styles";
import {noop} from "src/utils/functionsUtils";
import classnames from "classnames";
import {RichTextEditorProps} from "./types";


export const RichTextEditor: FC<RichTextEditorProps> = ({
                                                            onChange = noop,
                                                            editable = true,
                                                            hasBorder = true,
                                                            showTreeView = false,
                                                            namespace = "",
                                                            shouldReadFromLocalStorage = false,
                                                            content
                                                        }) => {

    const classes = useStyles();

    // Retrieve content from local storage
    const initialContent = shouldReadFromLocalStorage
        ? localStorage.getItem(`${initialConfig.namespace}_${namespace}`)
        : content ?? undefined;

    const handleChange = (editorState: EditorState) => {
        onChange(editorState);
    }

    return (
        <LexicalComposer
            initialConfig={{...initialConfig, editorState: initialContent, editable}}
        >
            <Stack className={classnames(classes.container, {
                [classes.containerBorder]: hasBorder,
            })}
            >
                <Toolbar editable={editable}/>
                <RichTextPlugin
                    contentEditable={<ContentEditable className={classnames(classes.contentEditable, {
                        [classes.contentEditableMinHeight]: editable,
                    })}/>}
                    placeholder={<Placeholder className={classes.placeholder}>Enter some rich text...</Placeholder>}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <CodeHighlightPlugin/>
                <OnChangePlugin onChange={handleChange}/>
                <HistoryPlugin/>
                {shouldReadFromLocalStorage &&
                    <LocalStoragePlugin namespace={`${initialConfig.namespace}_${namespace}`}/>}
                <ListPlugin/>
                <HorizontalRulePlugin/>
                <CheckListPlugin/>
                {showTreeView && <TreeViewPlugin/>}
            </Stack>
        </LexicalComposer>
    )
}

export default RichTextEditor;