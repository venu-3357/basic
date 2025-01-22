import React from "react";
import PropTypes from "prop-types";

const Card = ({ header, icon, children }) => {
  return (
    <div className="card-container">
      <div className="card-header">
        <div className="icon-container">{icon}</div>
        <h3 className="card-title">{header}</h3>
      </div>
      <div className="card-body">{children}</div>
      <style>{`
        .card-container {
          background: linear-gradient(145deg, #ffffff, #f0f0f0);
          border-radius: 15px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          padding: 20px;
          max-width: 100%;
          margin: 10px auto;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card-container:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
        }

        .icon-container {
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #ff9d2f, #ffd700);
          border-radius: 50%;
          width: 60px;
          height: 60px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .card-title {
          font-size: 1.6rem;
          font-weight: bold;
          color: #333;
          margin: 0;
          flex: 1;
        }

        .card-body {
          font-size: 1rem;
          color: #555;
          line-height: 1.6;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .card-container {
            padding: 18px;
          }

          .card-title {
            font-size: 1.4rem;
          }

          .icon-container {
            width: 50px;
            height: 50px;
          }
        }

        @media (max-width: 768px) {
          .card-container {
            padding: 15px;
          }

          .card-title {
            font-size: 1.2rem;
          }

          .icon-container {
            width: 45px;
            height: 45px;
          }

          .card-body {
            font-size: 0.95rem;
          }
        }

        @media (max-width: 480px) {
          .card-container {
            padding: 12px;
          }

          .card-title {
            font-size: 1rem;
          }

          .icon-container {
            width: 40px;
            height: 40px;
          }

          .card-body {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
};

Card.propTypes = {
  header: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  children: PropTypes.node.isRequired,
};

export default Card;
