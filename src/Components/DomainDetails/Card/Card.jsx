import { useState } from "react";
import ReadMore from "../ReadMore/ReadMore";
import "./Card.css";

const Card = ({
  id,
  title,
  desc,
  photo,
  link = "#",
  linkText = "Read More",
}) => {
  const [modal, setModal] = useState(false);

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div className="topic-card">
      {photo && (
        <div className="img-wrapper">
          {/* Safely require the image. If it's missing the require will be caught and the avatar fallback used. */}
          <img
            alt="domain"
            src={(() => {
              try {
                return require(`../../../data/${id}/images/${photo}`);
              } catch (e) {
                return require("../../../assets/common/avatar.jpg");
              }
            })()}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = require("../../../assets/common/avatar.jpg");
            }}
          />
        </div>
      )}
      {title && <h2>{title}</h2>}
      {desc && <p>{desc}</p>}
      {desc && (
        <div>
          {link && link !== "#" && (
            <>
              <span onClick={() => setModal(true)} className="link-text">
                {linkText}
              </span>

              <svg
                className="svg-image"
                width="12"
                height="12"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.1711 3.983L2.12965 14.0245L0.47998 12.3748L10.5203 2.33333H1.67115V0H14.5045V12.8333H12.1711V3.983Z"
                  fill="#000738"
                />
              </svg>
            </>
          )}
        </div>
      )}
      {!desc && link && (
        <a href={link} target="_blank" rel="noopener noreferrer">
          <div>
            <span className="link-text">{linkText}</span>
            <svg
              className="svg-image"
              width="12"
              height="12"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1711 3.983L2.12965 14.0245L0.47998 12.3748L10.5203 2.33333H1.67115V0H14.5045V12.8333H12.1711V3.983Z"
                fill="#000738"
              />
            </svg>
          </div>
        </a>
      )}
      {title && link && desc && modal && (
        <ReadMore
          heading={title}
          description={desc}
          link={link}
          modal={modal}
          setModal={setModal}
        />
      )}
    </div>
  );
};

export default Card;
