import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "./Loader";

import { nftDotStorage } from "../../utils";

export default function Form({ setMetadataURLIPFS }) {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({ imageUrl: "" });
  const [imageSrc, setImageSrc] = useState();
  const [formErrors, setFormErrors] = useState({});

  const validateForm = (_formValues) => {
    const errors = {};
    if (!_formValues.imageUrl) {
      errors.imageUrl = "please upload an image";
    }
    return errors;
  };

  const onImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
    };

    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.files[0],
    }));

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let _errors = validateForm(formValues);
    setFormErrors(_errors);
    if (Object.keys(_errors).length === 0) {
      setLoading(true);
      const metadata = await nftDotStorage(formValues.imageUrl);
      console.log("METADATA", metadata.url);
      setMetadataURLIPFS(metadata.url);
      setLoading(false);
      console.log("UPLOADED IMAGE TO IPFS");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 space-y-2 p-8 bg-white rounded-lg sm:flex  sm:py-4 sm:space-x-6 border-2">
      <form>
        {formErrors.imageUrl && toast.error('Please upload an image')}
        {
          !imageSrc && <input
            className="cursor-pointer"
            type="file"
            name={Object.keys(formValues)[0]}
            onChange={(e) => { onImageChange(e) }}
          >
          </input>
        }

        {imageSrc && <img src={imageSrc} className="bg-red-800" />}

        {
          imageSrc &&
          (
            !loading ?
              (
                <button
                  className="mt-2 border border-blue-500 p-4 rounded-lg text-black"
                  onClick={handleSubmit}
                >
                  UPLOAD
                </button>
              ) :
              <Loader />
          )
        }
      </form>
    </div>

  );
}
