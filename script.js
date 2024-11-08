async function uploadImage() {
  const fileInput = document.getElementById('imageInput');
  const resultDiv = document.getElementById('result');

  if (fileInput.files.length === 0) {
    alert('Please select an image to upload.');
    return;
  }

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append('image', file);

  resultDiv.innerHTML = 'Uploading...';

  try {
    const response = await fetch('https://betadash-uploader.vercel.app/imgur?link=', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Image upload failed');
    }

    const data = await response.json();
    resultDiv.innerHTML = `<p>Image URL:</p> <a href="${data.link}" target="_blank">${data.link}</a>`;
    resultDiv.innerHTML += `<img src="${data.link}" alt="Uploaded Image">`;
  } catch (error) {
    resultDiv.innerHTML = 'Error: ' + error.message;
  }
}
