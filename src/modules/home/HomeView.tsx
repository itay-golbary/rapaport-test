import React, { FC } from "react";
import { StyledHomeView } from "./styles";
import { Link } from "react-router-dom";

const HomeView: FC = () => {
  return (
    <StyledHomeView>
      <div className="HomeView__header">
        <div className="HomeView__header_title">
          Diamonds & Gems Catalog (by Itay Golbary)
        </div>

        <Link to="/catalog">Continue to Catalog</Link>
      </div>

      <div className="HomeView__content">
        <div className="HomeView__content_github">
          <a href="https://github.com/itay-golbary/rapaport-test">
            GitHub Repo
          </a>
        </div>

        <div className="HomeView__content_email">
          <a href="mailto:itay@golbary.io">Email: itay@golbary.io</a>
        </div>

        <div className="HomeView__content_phone">Phone: 052-4655995</div>
      </div>
    </StyledHomeView>
  );
};

export { HomeView };
