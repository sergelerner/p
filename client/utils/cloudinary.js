
export const prepareImage = (id, transformation) => {
  const url = `http://res.cloudinary.com/sergelerner/image/upload/v1496484069/${id}.jpg`;
  const insertionKeyword = '/upload/';
  const insertionPoint = url.indexOf(insertionKeyword) + insertionKeyword.length;
  const before = url.slice(0, insertionPoint);
  const after = url.slice(insertionPoint);

  return `${before}${transformation}/${after}`;
};
