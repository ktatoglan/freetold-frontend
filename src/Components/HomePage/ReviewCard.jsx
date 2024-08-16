import React from "react";

// const getTenancyPeriodText = (tenancyPeriod) => {
//   const { number, period } = JSON.parse(tenancyPeriod);
//   const periodText = number === 1 ? period : period + "s";
//   return `Stayed in this property for ${number} ${periodText}`;
// };

const ReviewCard = ({ ReviewID }) => {
  return (
    <div className="review-single">
      <div className="review-user">
        <div className="avatar-placeholder">
          {/* Avatar Placeholder */}
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

          {/*  */}
        </div>
        {/* <div className="user-duration">{getTenancyPeriodText(review.tenancy_period)}</div> */}
        <div className="user-duration">
          <p>Stayed in this property for 6 months</p>
        </div>
      </div>
      <div className="review-title">
        <h4>Light apartment in very cozy and safe neighborhood</h4>
      </div>
      <div className="review-stars">
        <div className="stars">
          {Array.from({ length: 5 }, (_, index) => (
            <React.Fragment key={index}>
              <input
                type="radio"
                id={`star${index + 1}`}
                name="rating"
                value={index + 1}
                checked={index <= 5}
              />
              <label htmlFor={`star${index + 1}`}></label>
            </React.Fragment>
          ))}
          <span className="review-date">2 weeks ago</span>
        </div>
      </div>
      <div className="review-rating">
        <div className="rating-container">
          <div className="rating-title"><p>Rating review</p></div>
          <div className="rating-item">
            <span className="icon heating-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.66 12.18C12.69 12.29 12.7 12.4 12.7 12.5C12.73 13.15 12.44 13.85 11.97 14.28C11.75 14.47 11.39 14.67 11.11 14.75C10.23 15.06 9.35 14.62 8.83 14.11C9.77 13.89 10.32 13.21 10.5 12.5C10.62 11.89 10.37 11.38 10.27 10.78C10.17 10.2 10.19 9.71 10.4 9.18C10.55 9.47 10.71 9.77 10.9 10C11.5 10.78 12.45 11.12 12.66 12.18ZM20 10C20 15.5 15.5 20 10 20C4.5 20 0 15.5 0 10C0 4.5 4.5 0 10 0C15.5 0 20 4.5 20 10ZM15.16 10.56L15.06 10.36C14.9 10 14.45 9.38 14.45 9.38C14.27 9.15 14.05 8.94 13.85 8.74C13.32 8.27 12.73 7.94 12.22 7.45C11.05 6.31 10.79 4.44 11.54 3C10.79 3.18 10.14 3.58 9.58 4.03C7.55 5.65 6.75 8.5 7.71 10.95C7.74 11.03 7.77 11.11 7.77 11.21C7.77 11.38 7.65 11.53 7.5 11.6C7.31 11.67 7.13 11.63 7 11.5C6.94499 11.4702 6.89983 11.425 6.87 11.37C6 10.26 5.84 8.66 6.43 7.39C5.12 8.45 4.41 10.24 4.5 11.92C4.56 12.31 4.6 12.7 4.74 13.09C4.85 13.56 5.06 14 5.3 14.44C6.14 15.78 7.61 16.75 9.19 16.94C10.87 17.15 12.67 16.85 13.96 15.7C15.4 14.4 15.9 12.33 15.16 10.56Z"
                  fill="#0A2446"
                />
              </svg>
            </span>
            <span>Heating</span>
            <span>4.5</span>
          </div>
          <div className="rating-item">
            <span className="icon noise-icon">
              <svg
                width="19"
                height="16"
                viewBox="0 0 19 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.15848 9.93039C0.808755 9.34736 0.624023 8.68026 0.624023 8.00039C0.624023 7.32052 0.808755 6.65342 1.15848 6.07039C1.26602 5.89091 1.40992 5.73591 1.58093 5.61535C1.75195 5.4948 1.94629 5.41136 2.15148 5.37039L3.84448 5.03139C3.94544 5.0114 4.03651 4.95739 4.10248 4.87839L6.17048 2.39539C7.35248 0.975389 7.94448 0.266388 8.47148 0.457388C9.00048 0.648388 9.00048 1.57239 9.00048 3.42039V12.5824C9.00048 14.4294 9.00048 15.3524 8.47248 15.5444C7.94548 15.7344 7.35348 15.0254 6.17148 13.6064L4.10048 11.1224C4.03476 11.0436 3.94408 10.9896 3.84348 10.9694L2.15048 10.6304C1.94529 10.5894 1.75095 10.506 1.57993 10.3854C1.40892 10.2649 1.26602 10.1099 1.15848 9.93039Z"
                  fill="#0A2446"
                />
                <path
                  d="M11.5361 4.46475C12.4692 5.39774 12.9956 6.66172 13.0006 7.98119C13.0057 9.30066 12.489 10.5686 11.5631 11.5088M15.6571 2.34375C17.15 3.83642 17.9923 5.85864 18.0005 7.96969C18.0088 10.0807 17.1823 12.1095 15.7011 13.6138"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span>Noise level</span>
            <span>4.2</span>
          </div>
          <div className="rating-item">
            <span className="icon traffic-icon">
              <svg
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 0H3C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V11C0 11.7956 0.316071 12.5587 0.87868 13.1213C1.44129 13.6839 2.20435 14 3 14L2 15V16H3L5 13.97L7 14V9H2V2H11V4H13V3C13 2.20435 12.6839 1.44129 12.1213 0.87868C11.5587 0.316071 10.7956 0 10 0ZM3 10C3.26522 10 3.51957 10.1054 3.70711 10.2929C3.89464 10.4804 4 10.7348 4 11C4 11.2652 3.89464 11.5196 3.70711 11.7071C3.51957 11.8946 3.26522 12 3 12C2.73478 12 2.48043 11.8946 2.29289 11.7071C2.10536 11.5196 2 11.2652 2 11C2 10.7348 2.10536 10.4804 2.29289 10.2929C2.48043 10.1054 2.73478 10 3 10ZM18.57 5.66C18.43 5.26 18.05 5 17.6 5H10.41C9.95 5 9.58 5.26 9.43 5.66L8 9.77V15.28C8 15.66 8.32 16 8.7 16H9.32C9.7 16 10 15.62 10 15.24V14H18V15.24C18 15.62 18.31 16 18.69 16H19.3C19.68 16 20 15.66 20 15.28V9.77L18.57 5.66ZM10.41 6H17.6L18.63 9H9.38L10.41 6ZM10 12C9.73478 12 9.48043 11.8946 9.29289 11.7071C9.10536 11.5196 9 11.2652 9 11C9 10.7348 9.10536 10.4804 9.29289 10.2929C9.48043 10.1054 9.73478 10 10 10C10.2652 10 10.5196 10.1054 10.7071 10.2929C10.8946 10.4804 11 10.7348 11 11C11 11.2652 10.8946 11.5196 10.7071 11.7071C10.5196 11.8946 10.2652 12 10 12ZM18 12C17.7348 12 17.4804 11.8946 17.2929 11.7071C17.1054 11.5196 17 11.2652 17 11C17 10.7348 17.1054 10.4804 17.2929 10.2929C17.4804 10.1054 17.7348 10 18 10C18.2652 10 18.5196 10.1054 18.7071 10.2929C18.8946 10.4804 19 10.7348 19 11C19 11.2652 18.8946 11.5196 18.7071 11.7071C18.5196 11.8946 18.2652 12 18 12Z"
                  fill="#0A2446"
                />
              </svg>
            </span>
            <span>Traffic</span>
            <span>5.0</span>
          </div>
        </div>
      </div>
      <div className="review-footer">
        <div className="fav">
          <span>
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
          </span>
          <span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 8.1C22 7.62261 21.818 7.16477 21.4941 6.82721C21.1702 6.48964 20.7308 6.3 20.2727 6.3H14.8145L15.6436 2.187C15.6609 2.097 15.6695 1.998 15.6695 1.899C15.6695 1.53 15.5227 1.188 15.2895 0.945L14.3741 0L8.69136 5.922C8.37182 6.255 8.18182 6.705 8.18182 7.2V16.2C8.18182 16.6774 8.3638 17.1352 8.68772 17.4728C9.01165 17.8104 9.45099 18 9.90909 18H17.6818C18.3986 18 19.0118 17.55 19.2709 16.902L21.8791 10.557C21.9568 10.35 22 10.134 22 9.9V8.1ZM3 18H6.45455V7.2H3V18Z"
                fill="#646464"
              />
            </svg>
            2 likes
          </span>
        </div>
        <div className="link">
          <a href="#">Read full review</a>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
