import { modules } from '@/utils/quillOptions';
import ImageUploader from 'quill-image-uploader';
import 'quill-image-uploader/dist/quill.imageUploader.min.css';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

Quill.register('modules/imageUploader', ImageUploader);

export default function Editor({ value, onChange, id, label }) {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={label} className="text-sm">
          {label}
        </label>
      )}
      <ReactQuill
        id={id}
        className="bg-white prose max-w-none"
        theme="snow"
        modules={modules}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
