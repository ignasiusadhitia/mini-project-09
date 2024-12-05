import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const RichTextEditor = ({ name, onChange, value }) => {
  const [data, setData] = useState(value || '');
  const key = import.meta.env.VITE_CKEDITOR_LICENSE_KEY;

  const handleEditorChange = (event, editor) => {
    const content = editor.getData();
    setData(content);

    if (onChange) {
      onChange({
        target: {
          name,
          value: content,
        },
      });
    }
  };

  useEffect(() => {
    if (value) {
      setData(value);
    }
  }, [value]);

  return (
    <CKEditor
      config={{
        toolbar: [
          'heading',
          '|',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          '|',
          'blockQuote',
          'undo',
          'redo',
        ],
        licenseKey: key,
        allowedContent: true,
      }}
      data={data}
      editor={ClassicEditor}
      onChange={handleEditorChange}
    />
  );
};

RichTextEditor.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default RichTextEditor;
