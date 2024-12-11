/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin";
import { useLexicalEditable } from "@lexical/react/useLexicalEditable";
import { useSharedHistoryContext } from "./context/SharedHistoryContext";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { $convertFromMarkdownString } from "@lexical/markdown";
import { PLAYGROUND_TRANSFORMERS } from "@/components/lexical/plugins/MarkdownTransformers";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { useState } from "react";
import ImagesPlugin from "./plugins/ImagesPlugin";
import LinkPlugin from "./plugins/LinkPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import ActionsPlugin from "./plugins/ActionsPlugin";

const placeholder = "Hãy bắt đầu viết...";

export default function Editor({ markdown }: { markdown?: string }) {
  const [editor] = useLexicalComposerContext();
  const { historyState } = useSharedHistoryContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const isEditable = useLexicalEditable();
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

  console.log(isLinkEditMode);
  if (markdown) {
    editor.update(() => {
      $convertFromMarkdownString(
        markdown,
        PLAYGROUND_TRANSFORMERS,
        undefined,
        true
      );
    });
  }

  return (
    <div className="w-full border border-gray-200 rounded-lg bg-gray-50">
      <ToolbarPlugin
        editor={editor}
        activeEditor={activeEditor}
        setActiveEditor={setActiveEditor}
        setIsLinkEditMode={setIsLinkEditMode}
      />
      <HistoryPlugin externalHistoryState={historyState} />
      <MarkdownShortcutPlugin transformers={PLAYGROUND_TRANSFORMERS} />
      <div className="relative">
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className="block w-full relative min-h-40 outline-none px-4 py-2 bg-white rounded-b-lg text-sm text-gray-800 border-0 overflow-auto focus:ring-0"
              aria-placeholder={placeholder}
              placeholder={
                <div className="absolute text-sm top-2 left-4 text-gray-400 text-ellipsis user-select-none pointer-events-none inline">
                  {placeholder}
                </div>
              }
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        <ListPlugin />
        <LinkPlugin hasLinkAttributes={false} />
        <ClickableLinkPlugin disabled={isEditable} />
        <CodeHighlightPlugin />
        <CheckListPlugin />
        <TablePlugin
          hasCellMerge={true}
          hasCellBackgroundColor={true}
          hasTabHandler={true}
        />
        <ImagesPlugin />
        <AutoFocusPlugin />
        <ActionsPlugin shouldPreserveNewLinesInMarkdown={false} />
      </div>
    </div>
  );
}
