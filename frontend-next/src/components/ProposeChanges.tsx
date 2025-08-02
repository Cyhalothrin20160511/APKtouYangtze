'use client';

import { FormEvent } from "react";
import { useState } from "react";

interface Props {
  articleId: string;
  genericText: Record<string, string>;
}

export default function ProposeChangesModal({
  articleId,
  genericText,
}: Props) {
  const [proposedChanges, setProposedChanges] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/propose-changes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: articleId, content: proposedChanges }),
        }
      );
      await res.json();
      setSuccessMessage(genericText.propose_changes_success);
      setTimeout(() => setSuccessMessage(""), 5000);
      setProposedChanges("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {successMessage && (
        <div className="alert alert-success position-fixed bottom-0 start-50 translate-middle-x mb-4">
          {successMessage}
        </div>
      )}

      <div
        className="modal fade"
        id="editModal"
        tabIndex={-1}
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <form onSubmit={handleSubmit} className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">
                {genericText.propose_changes}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label={genericText.cancel}
              />
            </div>
            <div className="modal-body">
              <textarea
                className="form-control"
                placeholder={genericText.propose_changes_example}
                style={{ minHeight: 300, resize: "vertical" }}
                value={proposedChanges}
                onChange={(e) => setProposedChanges(e.currentTarget.value)}
              />
            </div>
            <div className="modal-footer justify-content-between">
              <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                {genericText.cancel}
              </button>
              <button type="submit" className="btn btn-success" data-bs-dismiss="modal">
                {genericText.submit}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}