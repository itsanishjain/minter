import React from "react";
import { useState } from "react";

export default function Form() {
  const [formValues, setFormValues] = useState({
    imageUrl: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = (_formValues) => {
    const errors = {};
    if (!_formValues.imageUrl) {
      errors.companyName = "please upload an image";
    }
    return errors;
  };
  // create a function which set the values of form field
  const handleOnChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleFileInput = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.files[0] });

    // console.log(e.target.files[0].src,">>>>>>>>>");
    var file = e.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    console.log("IMG", url);
  };

  const handleSubmit = (e, obj) => {
    e.preventDefault();
    let _errors = validateForm(formValues);
    setFormErrors(_errors);
    if (Object.keys(_errors).length === 0) {
      console.log("NOOOOO ERRORS");
      console.log(formValues.imageUrl);
      setLoading(true);
      nftDotStorage(formValues.imageUrl).then((contentId) => {
        // console.log("CONTENT ID", contentId);
        createPost(contentId);
      });
      console.log("FORM SUBMITED SUCCESSFULLY");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 border border-red-600">
      <form>
        <input
          type="file"
          name={Object.keys(formValues)[0]}
          onChange={handleFileInput}
        ></input>
      </form>
    </div>
  );
}
