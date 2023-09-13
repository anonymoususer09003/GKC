export const saveImage = (imageFile) => ({
  type: 'IMAGE',
  payload: imageFile,
});

export const saveVideo = (videoFile) => ({
  type: 'VIDEO',
  payload: videoFile,
});
