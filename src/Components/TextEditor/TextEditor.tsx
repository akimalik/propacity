import React from 'react';
import { Editor, IAllProps } from '@tinymce/tinymce-react';

const TextEditor = (props: IAllProps) => {
  return (
    <Editor
      apiKey="8cpw8hindbo0e2i37bzi8qf4pgppc8a5sjststcvhchhj9yc"
      init={{
        height: 300,
        menubar: false,
        plugins: ['autolink link lists wordcount'],
        toolbar:
          `undo redo | formatselect| bold italic underline | link | bullist numlist |  forecolor backcolor | alignleft aligncenter alignright | outdent indent  |`
      }}
      {...props}
    />
  );

}

export default TextEditor;