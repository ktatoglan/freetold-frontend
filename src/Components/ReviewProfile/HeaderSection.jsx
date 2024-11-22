import React, {useState} from "react";

const HeaderSection = ({review}) => {
  const formattedDate = new Date(review.date).toLocaleDateString();

  return (
    <div className="header-section">
      <div className="back-link">
        <a href="#" onClick={() => window.history.back()}>← Back</a>
      </div>
      <div className="user-info">
        <div className="left-section">
          <div className="user-icon">
            <svg
              width="54"
              height="54"
              viewBox="0 0 54 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27 46.44C20.25 46.44 14.283 42.984 10.8 37.8C10.881 32.4 21.6 29.43 27 29.43C32.4 29.43 43.119 32.4 43.2 37.8C41.415 40.4579 39.0038 42.6361 36.1788 44.1428C33.3538 45.6494 30.2017 46.4384 27 46.44ZM27 8.1C29.1483 8.1 31.2085 8.95339 32.7276 10.4724C34.2466 11.9915 35.1 14.0517 35.1 16.2C35.1 18.3483 34.2466 20.4085 32.7276 21.9276C31.2085 23.4466 29.1483 24.3 27 24.3C24.8517 24.3 22.7915 23.4466 21.2724 21.9276C19.7534 20.4085 18.9 18.3483 18.9 16.2C18.9 14.0517 19.7534 11.9915 21.2724 10.4724C22.7915 8.95339 24.8517 8.1 27 8.1ZM27 0C23.4543 0 19.9433 0.698376 16.6675 2.05525C13.3918 3.41213 10.4153 5.40094 7.90812 7.90812C2.84463 12.9716 0 19.8392 0 27C0 34.1608 2.84463 41.0284 7.90812 46.0919C10.4153 48.5991 13.3918 50.5879 16.6675 51.9448C19.9433 53.3016 23.4543 54 27 54C34.1608 54 41.0284 51.1554 46.0919 46.0919C51.1554 41.0284 54 34.1608 54 27C54 12.069 41.85 0 27 0Z"
                fill="#D9D9D9"
              />
            </svg>
          </div>
          <div className="user-details">
            <span className="username">M. J., student</span>
            <span className="stay-duration">
              Stayed in this property for {review.rent_duration}  {" " + review.rent_period == 'per-month' ? 'months' : 'years'}
            </span>
          </div>
        </div>
        <div className="right-section">
          <span className="last-updated">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 19H5V8H19M19 3H18V1H16V3H8V1H6V3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3ZM16.53 11.06L15.47 10L10.59 14.88L8.47 12.76L7.41 13.82L10.59 17L16.53 11.06Z"
                fill="#919191"
              />
            </svg>
            {formattedDate}
          </span>
          {/*

          <span className="likes">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 8.1C22 7.62261 21.818 7.16477 21.4941 6.82721C21.1702 6.48964 20.7308 6.3 20.2727 6.3H14.8145L15.6436 2.187C15.6609 2.097 15.6695 1.998 15.6695 1.899C15.6695 1.53 15.5227 1.188 15.2895 0.945L14.3741 0L8.69136 5.922C8.37182 6.255 8.18182 6.705 8.18182 7.2V16.2C8.18182 16.6774 8.3638 17.1352 8.68772 17.4728C9.01165 17.8104 9.45099 18 9.90909 18H17.6818C18.3986 18 19.0118 17.55 19.2709 16.902L21.8791 10.557C21.9568 10.35 22 10.134 22 9.9V8.1ZM3 18H6.45455V7.2H3V18Z"
                fill="#919191"
              />
            </svg>
            14
          </span>

          */}
          {/*

          <span className="favorites">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46 6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55ZM16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45 20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z"
                fill="#919191"
              />
            </svg>
            Save to favorites
          </span>

          */}
          {/*

          <span className="more-options">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.256 16.875C5.67616 16.875 6.82743 16.0355 6.82743 15C6.82743 13.9645 5.67616 13.125 4.256 13.125C2.83584 13.125 1.68457 13.9645 1.68457 15C1.68457 16.0355 2.83584 16.875 4.256 16.875Z"
                fill="#919191"
              />
              <path
                d="M14.5421 16.875C15.9623 16.875 17.1136 16.0355 17.1136 15C17.1136 13.9645 15.9623 13.125 14.5421 13.125C13.122 13.125 11.9707 13.9645 11.9707 15C11.9707 16.0355 13.122 16.875 14.5421 16.875Z"
                fill="#919191"
              />
              <path
                d="M24.8278 16.875C26.2479 16.875 27.3992 16.0355 27.3992 15C27.3992 13.9645 26.2479 13.125 24.8278 13.125C23.4076 13.125 22.2563 13.9645 22.2563 15C22.2563 16.0355 23.4076 16.875 24.8278 16.875Z"
                fill="#919191"
              />
            </svg>
          </span>

          */}
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
