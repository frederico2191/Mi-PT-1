import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

const UploadImages = ({ file, setFile }) => {
  const { store, actions } = useContext(Context);

  return (
    <div className="mb-3">
      <label htmlFor="imageUpload" className="form-label">
        Upload Profile Image
      </label>
      <input
        type="file"
        className="form-control"
        id="imageUpload"
        // value={file}
        onChange={(e) => setFile(e.target.files)}
      />
    </div>
  );
};

export default UploadImages;
