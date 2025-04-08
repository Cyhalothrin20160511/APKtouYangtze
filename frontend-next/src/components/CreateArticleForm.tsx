"use client";

import { useState } from "react";
import { useGenericText } from "@/context/GenericTextProvider";

type Article = {
  language: string;
  title: string;
  desc: string;
  shortDesc?: string;
  sourceUrl?: string;
  imageUrl?: string;
};

type CreateArticleFormProps = {
  onSubmit: (article: Article) => void;
};

const CreateArticleForm: React.FC<CreateArticleFormProps> = ({ onSubmit }) => {
  const { genericText } = useGenericText();
  const [language, setLanguage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [shortDesc, setShortDesc] = useState<string>("");
  const [sourceUrl, setSourceUrl] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleSubmit = () => {
    if (!language || !title || !desc) {
      alert(genericText.required_fields_missing);
      return;
    }

    const newArticle: Article = {
      language,
      title,
      desc,
      shortDesc,
      sourceUrl,
      imageUrl,
    };

    onSubmit(newArticle);
  };

  return (
    <>
      <a
        className="text-primary"
        data-bs-toggle="modal"
        data-bs-target="#createArticleModal"
        style={{ cursor: "pointer" }}
      >
        {genericText.click_here_to_submit}
      </a>

      <div
        className="modal fade"
        id="createArticleModal"
        tabIndex={-1}
        aria-labelledby="createArticleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createArticleModalLabel">
                {genericText.submit_article}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="language" className="form-label">
                    {genericText.language_code}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    required
                    placeholder={genericText.language_example}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    {genericText.text_title}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder={genericText.title_example}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">
                    {genericText.text_desc}
                  </label>
                  <textarea
                    className="form-control"
                    id="desc"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    rows={6}
                    required
                    placeholder={genericText.desc_example}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="shortDesc" className="form-label">
                    {genericText.text_short_desc}
                  </label>
                  <textarea
                    className="form-control"
                    id="shortDesc"
                    value={shortDesc}
                    onChange={(e) => setShortDesc(e.target.value)}
                    rows={2}
                    placeholder={genericText.short_desc_example}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="sourceUrl" className="form-label">
                    {genericText.text_source_url}
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    id="sourceUrl"
                    value={sourceUrl}
                    onChange={(e) => setSourceUrl(e.target.value)}
                    placeholder={genericText.source_url_example}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="imageUrl" className="form-label">
                    {genericText.text_image_url}
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    id="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder={genericText.image_url_example}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                {genericText.cancel}
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSubmit}
                data-bs-dismiss="modal"
              >
                {genericText.submit}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateArticleForm;
