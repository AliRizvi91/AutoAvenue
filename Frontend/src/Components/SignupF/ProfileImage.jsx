import React from 'react';

function ProfileImage({ initialImage, width, height }) {
  return (
    <img
      src={initialImage}
      alt=""
      className={`img-thumbnail ${initialImage ? 'cursor-pointer' : ''}`}
      style={{
        margin: "2rem 2rem",
        width: width,
        height: height,
        borderRadius: "50%",
        objectFit: 'cover',
        cursor: 'pointer',
      }}
    />
  );
}

export default ProfileImage;
