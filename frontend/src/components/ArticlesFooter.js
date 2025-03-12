import { Link } from "react-router-dom";
import { useGenericText } from "../context/GenericTextProvider";

const ArticlesFooter = ({ page, hasNextPage }) => {
  const { genericText } = useGenericText();

  return (
    <footer className="text-body-secondary py-5">
      <div className="container text-center">
        {page > 1 && (
          <Link to={`?page=${page - 1}`} className="btn btn-sm btn-outline-secondary">
            {genericText.previous_page}
          </Link>
        )}
        <span> {genericText.page_1}</span>
        <span> {page} </span>
        <span>{genericText.page_2} </span>
        {hasNextPage && (
          <Link to={`?page=${page + 1}`} className="btn btn-sm btn-outline-secondary">
            {genericText.next_page}
          </Link>
        )}
      </div>
    </footer>
  );
};

export default ArticlesFooter;
