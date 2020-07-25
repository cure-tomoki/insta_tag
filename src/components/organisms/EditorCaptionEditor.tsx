import * as React from 'react';
import styled from 'styled-components';

import * as EditorDuck from '~/ducks/EditorDuck';
import useRootContext from '~/hooks/useRootContext';
import * as vars from '~/vars';

const EMPTY_LINE = '.';
const generateCaptionText = (exif: Instatag.ExifData): string => {
  const text = [
    exif.createdDate,
    EMPTY_LINE,
    exif.camera?.makeModel && `CAMERA: ${exif.camera?.makeModel}`,
    exif.lens?.makeModel && `LENS: ${exif.lens?.makeModel}`,
    (exif.settings?.iso ||
      exif.settings?.fNumber ||
      exif.settings?.shutterSpeed) &&
      `SETTINGS: ${[
        exif.settings?.iso && `ISO ${exif.settings?.iso}`,
        exif.settings?.fNumber,
        exif.settings?.shutterSpeed && `${exif.settings?.shutterSpeed}s`,
      ]
        .filter(Boolean)
        .join(' | ')}`,
    EMPTY_LINE,
  ]
    .filter(Boolean)
    .join('\n');
  return text;
};

const EditorCaptionEditor = () => {
  const { state } = useRootContext();
  const { file } = EditorDuck.selectors.getImage(state);
  const exif = EditorDuck.selectors.getExifData(state);

  const editorRef = React.useRef<HTMLTextAreaElement>();
  const previewRef = React.useRef<HTMLButtonElement>();

  const [text, setText] = React.useState('');
  const [isEditMode, setEditMode] = React.useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  // generate caption text
  React.useEffect(() => setText(generateCaptionText(exif)), [exif]);

  // manage focus
  React.useEffect(() => {
    if (isEditMode) {
      editorRef.current?.focus();
    } else {
      previewRef.current?.focus();
    }
  }, [isEditMode, editorRef, previewRef]);

  // render nothing when image file is not present
  if (file === null) return null;

  return (
    <div>
      {/* edit mode */}
      {isEditMode && (
        <form onSubmit={() => setEditMode(false)}>
          <TextArea
            ref={editorRef as any}
            value={text}
            onChange={handleTextChange}
          ></TextArea>
          <button type="submit">submit</button>
        </form>
      )}

      {/* preview Mode */}
      {!isEditMode && (
        <EditButton
          ref={previewRef as any}
          type="button"
          onClick={() => setEditMode(true)}
        >
          {text}
        </EditButton>
      )}
    </div>
  );
};

const TextArea = styled.textarea({
  height: 150,
  width: '100%',
  boxSizing: 'border-box',
  fontSize: vars.fontSize.xxs,
  padding: vars.spacing.normal,
  border: `1px solid ${vars.colors.lightgray}`,
  borderRadius: vars.radius.double,
  fontFamily: vars.fontFamily.default,
});

const EditButton = styled.button({
  width: '100%',
  padding: 0,
  textAlign: 'left',
  whiteSpace: 'pre',
  background: 'none',
  border: 'none',
  fontSize: vars.fontSize.xxs,
});

export default EditorCaptionEditor;
