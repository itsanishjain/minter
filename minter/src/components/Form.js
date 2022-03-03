import React from "react";
import { useState } from "react";
import {
  pinataUploadImage,
  pinataUploadMetadata,
  nftDotStorage,
} from "../../utils";
import Loader from "./Loader";

export default function Form({setMetadataURLIPFS}) {
  const [loading, setLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    imageUrl: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = (_formValues) => {
    const errors = {};
    if (!_formValues.imageUrl) {
      errors.imageUrl = "please upload an image";
    }
    return errors;
  };

  // create a function which set the values of form field
  const handleOnChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleFileInput = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let _errors = validateForm(formValues);
    setFormErrors(_errors);
    if (Object.keys(_errors).length === 0) {
      console.log("NO ERRORs");
      setLoading(true);
      const metadata = await nftDotStorage(formValues.imageUrl);
      console.log("METADATA", metadata.url);
      setMetadataURLIPFS(metadata.url);
      setLoading(false);
      console.log("UPLOADED IMAGE TO IPFS");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 border border-red-600 p-4">
      <form>
        <p className="text-red-800 font-bold text-md">
          {formErrors.imageUrl && "Please upload an image"}
        </p>
        <input
          className="mt-2"
          type="file"
          name={Object.keys(formValues)[0]}
          onChange={handleFileInput}
        ></input>
      </form>
      {!loading ? (
        <button
          className="mt-2 border border-blue-500 p-4 rounded-lg"
          onClick={handleSubmit}
        >
          UPLOAD
        </button>
      ) : (
        <Loader />
      )}
    </div>
  );
}
