import React from "react";

const UserInfo = () => {
  return (
    <div className="user-profile">
      <div className="user-info">
        <h2>Benedict Cumberbatch</h2>
        <div className="user-info-line">
          <p>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8333 15.8333H4.16667V6.66658H15.8333M15.8333 2.49992H15V0.833252H13.3333V2.49992H6.66667V0.833252H5V2.49992H4.16667C3.72464 2.49992 3.30072 2.67551 2.98816 2.98807C2.67559 3.30063 2.5 3.72456 2.5 4.16659V15.8333C2.5 16.2753 2.67559 16.6992 2.98816 17.0118C3.30072 17.3243 3.72464 17.4999 4.16667 17.4999H15.8333C16.2754 17.4999 16.6993 17.3243 17.0118 17.0118C17.3244 16.6992 17.5 16.2753 17.5 15.8333V4.16659C17.5 3.72456 17.3244 3.30063 17.0118 2.98807C16.6993 2.67551 16.2754 2.49992 15.8333 2.49992ZM13.775 9.21659L12.8917 8.33325L8.825 12.3999L7.05833 10.6333L6.175 11.5166L8.825 14.1666L13.775 9.21659Z"
                fill="#646464"
              />
            </svg>
            Joined at March 2024
          </p>
          <p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 11.5C11.337 11.5 10.7011 11.2366 10.2322 10.7678C9.76339 10.2989 9.5 9.66304 9.5 9C9.5 8.33696 9.76339 7.70107 10.2322 7.23223C10.7011 6.76339 11.337 6.5 12 6.5C12.663 6.5 13.2989 6.76339 13.7678 7.23223C14.2366 7.70107 14.5 8.33696 14.5 9C14.5 9.3283 14.4353 9.65339 14.3097 9.95671C14.1841 10.26 13.9999 10.5356 13.7678 10.7678C13.5356 10.9999 13.26 11.1841 12.9567 11.3097C12.6534 11.4353 12.3283 11.5 12 11.5ZM12 2C10.1435 2 8.36301 2.7375 7.05025 4.05025C5.7375 5.36301 5 7.14348 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 7.14348 18.2625 5.36301 16.9497 4.05025C15.637 2.7375 13.8565 2 12 2Z"
                fill="#EF6C67"
              />
            </svg>
            London, Bloomsberry
          </p>
        </div>
      </div>

      <div className="invite-friends">
        <h4>Invite your friends to share their experience!</h4>
        <button className="invite-button">Copy invitation link</button>
      </div>
    </div>
  );
};

export default UserInfo;
