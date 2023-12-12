import axios from 'axios';

export const modules = {
  toolbar: [
    [{ header: [false, 2, 3, 4, 5, 6] }],
    [{ size: ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
  imageUploader: {
    upload: async (file) => {
      const formData = new FormData();
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      return '/storage/' + data.path;
    },
  },
};
