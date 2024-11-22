import { ToolbarContext } from "@/components/lexical/context/ToolbarContext";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import Editor from "@/components/lexical/editor";
import { editorConfig } from "@/components/lexical/editorConfig";
import { EditorState } from "lexical";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { memo } from "react";

const LexicalEditor = memo(
  ({ onChange }: { onChange: (editorState: EditorState) => void }) => {
    return (
      <LexicalComposer initialConfig={editorConfig}>
        <ToolbarContext>
          <Editor />
        </ToolbarContext>
        <OnChangePlugin onChange={onChange} />
      </LexicalComposer>
    );
  },
);

LexicalEditor.displayName = "LexicalEditor";
export default LexicalEditor;
