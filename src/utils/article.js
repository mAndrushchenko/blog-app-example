export const addImagesToArray = (arr, images) => {
  return arr.map((element, index) => {
    const imageIndex = index % images.length; // This will cycle from 0 to 11
    return {
      ...element,
      image: images[imageIndex]
    };
  });
}
