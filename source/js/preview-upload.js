const uploadInput = document.querySelector('#upload-file');
const preview = document.querySelector('.img-upload__preview > img');
const previews = document.querySelectorAll('.effects__preview');

uploadInput.addEventListener('change', () => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = /\.png$|\.jpg$|\.jpeg$/i.test(fileName);

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
      previews.forEach((filter) => {
        filter.style.backgroundImage = `url(${reader.result})`;
      })
    });

    reader.readAsDataURL(file);
  }
});

export {};
