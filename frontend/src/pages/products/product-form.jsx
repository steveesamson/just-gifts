import { useCallback, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Display from "../../views/display-when";
import { save } from "./loader";
import { Progress, Loader } from "../../views/dialog";
import { useUpload } from "../../services/firebase";
import useScroller from "../../hooks/useScroller";
import { useToast } from "../../context/notificationContenxt";

import "./product.css";

const ProductForm = () => {
  const navigate = useNavigate();
  const { notify } = useToast();
  const { data, error = "" } = useLoaderData();
  const scrollup = useScroller();
  const [formError, setError] = useState(error);
  const [errors, setErrors] = useState({});
  const [params, setParams] = useState(data);
  const [saving, setSaving] = useState(false);

  const onImageUploaded = useCallback(async ({ error, data }) => {
    if (error) {
      return setError(error);
    }
    if (data) {
      setParams((oldVal) => ({ ...oldVal, ...data }));
    }
  }, []);

  const { uploadFile, deleteFile, uploading, percent } =
    useUpload(onImageUploaded);

  const onCancel = useCallback(
    (e) => {
      e.preventDefault();
      const { newImage } = params;
      // We have an orphaned image
      // that needs removal
      if (newImage) {
        deleteFile(newImage);
      }
      navigate(-1);
    },
    [navigate, deleteFile, params]
  );

  const onParams = useCallback(
    (e, name) => {
      // This is a file upload
      // intercept for upload
      if (name === "imageFile") {
        const file = e.target?.files[0];
        if (file) {
          // If there was already an image
          // try to overwrite it, rather than
          // upload as another name
          const { newImage, imageName } = params;
          const name = imageName ? imageName : newImage;
          uploadFile(file, name);
        }
        return;
      }
      const { value } = e.target;
      setParams((oldVal) => ({ ...oldVal, [name]: value }));
    },
    [uploadFile, params]
  );
  const onSubmit = useCallback(
    async (e) => {
      // Stop postback
      e.preventDefault();

      const {
        productName,
        unitPrice,
        productImage,
        imageName,
        quantityInStock,
        description,
        _id,
      } = params;

      const pendingErrors = {};
      if (productName.isEmpty()) {
        pendingErrors.productName = "Product Name is required";
      }
      if (description.isEmpty()) {
        pendingErrors.description = "Product Description is required";
      }
      if (productImage.isEmpty()) {
        pendingErrors.imageFile = "Product Image is required";
      }

      if (imageName.isEmpty()) {
        pendingErrors.imageFile = "Product image is required";
      }

      if (!unitPrice) {
        pendingErrors.unitPrice = "Unit Price is required";
      } else {
        const currencyUnit = parseFloat(unitPrice);
        if (isNaN(currencyUnit)) {
          pendingErrors.unitPrice =
            "Unit Price should be currency/money greater than zero.";
        }
      }

      if (quantityInStock < 1) {
        pendingErrors.quantityInStock =
          "Quantity in Stock should be greater than zero.";
      }
      const errorLen = Object.keys(pendingErrors);
      if (errorLen.length > 0) {
        scrollup();
        return setErrors(pendingErrors);
      } else {
        const load = {
          _id,
          productName,
          unitPrice,
          quantityInStock,
          description,
          productImage,
          imageName,
        };
        setSaving(true);
        const { error: saveError } = await save(load);
        setSaving(false);
        if (saveError) {
          setError(saveError);
          return;
        }
        const message = `Product ${_id ? "updated" : "added"} successfully.`;
        notify(message);
        navigate(-1);
      }
    },
    [navigate, params, scrollup, notify]
  );

  return (
    <form className="content">
      <fieldset>
        <Display when={!!params?._id}>
          <legend>Edit Product</legend>
        </Display>
        <Display when={!params?._id}>
          <legend>New Product</legend>
        </Display>
        <Display when={!!formError}>
          <small className="error">{formError}</small>
        </Display>
        <Display when={!!params.productImage && params.productImage.isUrl()}>
          <section className="product-image">
            <img loading="lazy" src={params.productImage} alt="" width="100%" />
          </section>
        </Display>
        <div className="form-field">
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            defaultValue={params?.productName}
            onChange={(e) => onParams(e, "productName")}
            className="input"
            placeholder="Enter Product Name"
          />
          <Display when={!!errors.productName}>
            <small className="error">{errors.productName}</small>
          </Display>
        </div>
        <div className="form-field">
          <label htmlFor="imageFile">Image:</label>
          <input
            type="file"
            id="imageFile"
            name="imageFile"
            onChange={(e) => onParams(e, "imageFile")}
            className="input"
          />
          <Display when={!!errors.imageFile}>
            <small className="error">{errors.imageFile}</small>
          </Display>
        </div>
        <section className="columns">
          <div className="form-field">
            <label htmlFor="quantityInStock">Quantity in Stock:</label>
            <input
              type="number"
              id="quantityInStock"
              name="quantityInStock"
              defaultValue={params?.quantityInStock}
              onChange={(e) => onParams(e, "quantityInStock")}
              className="input"
              placeholder="Enter quantity"
            />
            <Display when={!!errors.quantityInStock}>
              <small className="error">{errors.quantityInStock}</small>
            </Display>
          </div>
          <div className="form-field">
            <label htmlFor="unitPrice">Unit Price:</label>
            <input
              type="text"
              id="unitPrice"
              name="unitPrice"
              defaultValue={params?.unitPrice}
              onChange={(e) => onParams(e, "unitPrice")}
              className="input"
              placeholder="Enter Unit Price"
            />
            <Display when={!!errors.unitPrice}>
              <small className="error">{errors.unitPrice}</small>
            </Display>
          </div>
        </section>
        <div className="form-field">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            className="input"
            placeholder="Enter Description"
            defaultValue={params?.description}
            onChange={(e) => onParams(e, "description")}
          />
          <Display when={!!errors.description}>
            <small className="error">{errors.description}</small>
          </Display>
        </div>
      </fieldset>
      <section className="card submit">
        <button type="button" className="primary" onClick={onSubmit}>
          Save
        </button>
        <button type="button" className="button secondary" onClick={onCancel}>
          Cancel
        </button>
      </section>
      <Loader text="Saving product" open={saving} />
      <Progress text="Uploading image..." percent={percent} open={uploading} />
    </form>
  );
};

export default ProductForm;
