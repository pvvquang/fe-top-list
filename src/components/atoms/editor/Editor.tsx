"use-client";
import {
  default as DecoupledEditor,
  default as DocumentEditor,
} from "@ckeditor/ckeditor5-build-decoupled-document";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useEffect, useMemo, useState } from "react";
import ConditionalRender from "../ConditionalRender";
import editorConfig from "./editor.config";
import { createMedia } from "@/services/media.service";
import { IMedia } from "@/types/media.type";

interface IProps {
  onReady?: (editor: DecoupledEditor) => void;
  value: string;
  config?: any;
  onChange: (
    data: string,
    keyName: string,
    event?: any,
    editor?: DecoupledEditor
  ) => void;
  onFocus?: (data: string, event?: any, editor?: DecoupledEditor) => void;
  onBlur?: (data: string, event?: any, editor?: DecoupledEditor) => void;
  keyName?: string;
  onChangeFile?: (files: IMedia[]) => void;
  uniqueKey?: string;
  label?: string;
  errorMessage?: string;
}

function Editor({
  onReady,
  value,
  config = {},
  onChange,
  onFocus,
  onBlur,
  keyName = "",
  onChangeFile,
  uniqueKey,
  label,
  errorMessage,
}: IProps) {
  const [fileUploads, setFileUploads] = useState<IMedia[]>([]);

  function myUploadPlugin(editor: DecoupledEditor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) =>
      (function myUploadAdapter(loader) {
        return {
          upload: () => {
            return new Promise((resolve) => {
              loader.file.then((file) => {
                const formData = new FormData();
                formData.append("file", file as any);
                createMedia(formData).then((file) => {
                  setFileUploads((prev) => [...prev, file]);
                  resolve({ default: file.link });
                });
              });
            });
          },
        };
      })(loader);
  }

  const mergeConfig = useMemo(() => {
    return {
      ...editorConfig,
      ...config,
      extraPlugins: [myUploadPlugin],
    };
  }, [config]);

  const _onReady = (editor: DecoupledEditor) => {
    const toolbarEditor = document.getElementById(
      `toolbar-container-${keyName}`
    );
    if (!toolbarEditor) return;
    toolbarEditor.appendChild(editor.ui.view.toolbar.element as Node);
    onReady && onReady(editor);
  };

  const handleChange = (event: any, editor: DecoupledEditor) => {
    const data = editor.getData();
    onChange(data, keyName, event, editor);
  };

  const handleFocus = (event: any, editor: DecoupledEditor) => {
    const data = editor.getData();
    onFocus && onFocus(data, event, editor);
  };

  const handleBlur = (event: any, editor: DecoupledEditor) => {
    const data = editor.getData();
    onBlur && onBlur(data, event, editor);
  };

  useEffect(() => {
    onChangeFile && onChangeFile(fileUploads);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileUploads]);

  return (
    <div>
      <ConditionalRender conditional={!!label}>
        <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
          {label}
        </label>
      </ConditionalRender>
      <div
        id={`toolbar-container-${keyName}`}
        style={{ position: "sticky", zIndex: 100, top: 0 }}
      />
      <CKEditor
        editor={DocumentEditor}
        data={value}
        config={mergeConfig}
        onReady={_onReady}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      {!!errorMessage && (
        <p className="text-xs mt-2 text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}

export default Editor;
