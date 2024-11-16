import React, {useEffect, useState} from "react";
import axios from "axios";
const PropertyInfo = ({review}) => {
  useEffect(() => {
    // You can process the data as needed
    getAddressFromPostcode(review.post_code);
  }, [review]);
  const [addressDetails, setAddressDetails] = useState({});
  const getAddressFromPostcode = async (postcode) => {
    try {
      const response = await axios.get(`https://api.postcodes.io/postcodes/${postcode}`);
      const data = response.data;
      if (data.status === 200) {
        // You can process the data as needed
        setAddressDetails(data.result);
      } else {
        console.log('Postcode not found');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const showOnTheMap = () => {
    // You can process the data as needed
    const { latitude, longitude } = addressDetails;
    if (latitude && longitude) {
      window.open(`https://www.google.com/maps?q=${latitude},${longitude}&hl=es;z=14&output=embed`, '_blank');
    } else {
      console.log('Address details are not available');
    }
  };
  return (
    <div className="property-info">
      <h3>{review.review_headline}</h3>
      <p className="address">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.4955 8.67814C18.4955 9.28952 18.0528 9.76843 17.551 9.76843H16.6065L16.6272 15.2097C16.6272 15.3014 16.6213 15.3931 16.6124 15.4848V16.0316C16.6124 16.7823 16.0841 17.3902 15.4317 17.3902H14.9595C14.927 17.3902 14.8945 17.3902 14.8621 17.3868C14.8208 17.3902 14.7794 17.3902 14.7381 17.3902H13.0704C12.4181 17.3902 11.8898 16.7823 11.8898 16.0316V13.0427C11.8898 12.4415 11.4677 11.9558 10.9452 11.9558H9.0562C8.53376 11.9558 8.11167 12.4415 8.11167 13.0427V16.0316C8.11167 16.7823 7.58333 17.3902 6.93102 17.3902H5.28105C5.23678 17.3902 5.1925 17.3868 5.14823 17.3835C5.11281 17.3868 5.07739 17.3902 5.04197 17.3902H4.56971C3.91739 17.3902 3.38905 16.7823 3.38905 16.0316V12.2275C3.38905 12.1969 3.38905 12.163 3.392 12.1324V9.76843H2.44452C1.91323 9.76843 1.5 9.29291 1.5 8.67814C1.5 8.37245 1.58855 8.10073 1.79516 7.86297L9.36317 0.271723C9.56978 0.0339653 9.80591 0 10.0125 0C10.2191 0 10.4553 0.0679306 10.6324 0.237757L18.1709 7.86297C18.407 8.10073 18.5251 8.37245 18.4955 8.67814Z"
            fill="#646464"
          />
        </svg>
        {review.address_line_1 + " " + review.address_line_2 + " " + review.town_city + " " + review.post_code+ " " + review.country + " "}
        <span className="show-map" onClick={showOnTheMap}>
          <svg
            width="14"
            height="20"
            viewBox="0 0 14 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 9.5C6.33696 9.5 5.70107 9.23661 5.23223 8.76777C4.76339 8.29893 4.5 7.66304 4.5 7C4.5 6.33696 4.76339 5.70107 5.23223 5.23223C5.70107 4.76339 6.33696 4.5 7 4.5C7.66304 4.5 8.29893 4.76339 8.76777 5.23223C9.23661 5.70107 9.5 6.33696 9.5 7C9.5 7.3283 9.43534 7.65339 9.3097 7.95671C9.18406 8.26002 8.99991 8.53562 8.76777 8.76777C8.53562 8.99991 8.26002 9.18406 7.95671 9.3097C7.65339 9.43534 7.3283 9.5 7 9.5ZM7 0C5.14348 0 3.36301 0.737498 2.05025 2.05025C0.737498 3.36301 0 5.14348 0 7C0 12.25 7 20 7 20C7 20 14 12.25 14 7C14 5.14348 13.2625 3.36301 11.9497 2.05025C10.637 0.737498 8.85652 0 7 0Z"
              fill="#EF6C67"
            />
          </svg>
          Show on map
        </span>
      </p>
      <div className="stars">
        {Array.from({ length: 5 }, (_, index) => (
          <React.Fragment key={index}>
            <input
              type="radio"
              id={`star${index + 1}`}
              name="rating"
              value={index + 1}
              checked={index < 1}
              onChange={() => {}}
            />
            <label htmlFor={`star${index + 1}`}></label>
          </React.Fragment>
        ))}
      </div>
      <div className="pros-cons">
        <div className="pros">
          <h4>
            Pros
            <div className="icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9 18C10.6259 18.0001 12.2214 17.5598 13.6171 16.7259C15.0128 15.8919 16.1566 14.6955 16.9268 13.2636C17.697 11.8318 18.065 10.218 17.9916 8.59378C17.9182 6.96956 17.4062 5.39556 16.51 4.039L9.355 11.989C9.02079 12.3604 8.55967 12.5933 8.06238 12.6418C7.56509 12.6903 7.06767 12.5509 6.668 12.251L3.40001 9.8C3.18783 9.64087 3.04756 9.40397 3.01006 9.14142C2.97255 8.87887 3.04087 8.61217 3.2 8.4C3.35913 8.18783 3.59603 8.04756 3.85858 8.01005C4.12113 7.97254 4.38783 8.04087 4.6 8.2L7.868 10.651L15.214 2.49C14.1498 1.47411 12.8528 0.734601 11.4365 0.336222C10.0202 -0.0621564 8.52788 -0.107256 7.09013 0.204872C5.65238 0.517001 4.31308 1.17684 3.18948 2.12661C2.06588 3.07639 1.19225 4.28713 0.645082 5.65284C0.0979184 7.01855 -0.106095 8.49757 0.0509047 9.96041C0.207905 11.4233 0.72113 12.8253 1.54564 14.0438C2.37016 15.2623 3.48082 16.2601 4.78038 16.9498C6.07994 17.6395 7.52876 18.0001 9 18Z"
                  fill="#EF6C67"
                />
              </svg>
            </div>
          </h4>
          <p>
            {review.review_pros}
          </p>
        </div>
        <div className="cons">
          <h4>
            Cons
            <div className="icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20C4.477 20 0 15.523 0 10ZM10 11C9.73478 11 9.48043 10.8946 9.29289 10.7071C9.10536 10.5196 9 10.2652 9 10V6C9 5.73478 9.10536 5.48043 9.29289 5.29289C9.48043 5.10536 9.73478 5 10 5C10.2652 5 10.5196 5.10536 10.7071 5.29289C10.8946 5.48043 11 5.73478 11 6V10C11 10.2652 10.8946 10.5196 10.7071 10.7071C10.5196 10.8946 10.2652 11 10 11ZM8.5 14C8.5 13.6022 8.65804 13.2206 8.93934 12.9393C9.22064 12.658 9.60218 12.5 10 12.5H10.01C10.4078 12.5 10.7894 12.658 11.0707 12.9393C11.352 13.2206 11.51 13.6022 11.51 14V14.01C11.51 14.4078 11.352 14.7894 11.0707 15.0707C10.7894 15.352 10.4078 15.51 10.01 15.51H10C9.60218 15.51 9.22064 15.352 8.93934 15.0707C8.65804 14.7894 8.5 14.4078 8.5 14.01V14Z"
                  fill="#EF6C67"
                />
              </svg>
            </div>
          </h4>
          <p>
            {review.review_cons}
          </p>
        </div>
      </div>
      <div className="fixes">
        <h4>
          Is there anything that needs to be fixed?
          <div className="icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.7101 18.29L18.2901 19.71C18.1027 19.8962 17.8492 20.0008 17.5851 20.0008C17.3209 20.0008 17.0674 19.8962 16.8801 19.71L5.00006 7.85C4.67487 7.94421 4.33858 7.99465 4.00006 8C3.36336 7.99955 2.73597 7.84711 2.17005 7.55536C1.60413 7.26362 1.11602 6.84099 0.746322 6.32263C0.37662 5.80426 0.135999 5.20513 0.0444667 4.57505C-0.047066 3.94496 0.0131336 3.30213 0.22006 2.7L2.76006 5.24L3.29006 4.71L4.71006 3.29L5.24006 2.76L2.70006 0.22C3.30219 0.0130733 3.94503 -0.0471263 4.57511 0.0444064C5.20519 0.135939 5.80432 0.376559 6.32269 0.746262C6.84105 1.11596 7.26368 1.60407 7.55542 2.16999C7.84717 2.73591 7.99961 3.3633 8.00006 4C7.99471 4.33852 7.94427 4.67481 7.85006 5L19.7101 16.88C19.8963 17.0674 20.0009 17.3208 20.0009 17.585C20.0009 17.8492 19.8963 18.1026 19.7101 18.29ZM0.29006 16.88C0.103809 17.0674 -0.000732422 17.3208 -0.000732422 17.585C-0.000732422 17.8492 0.103809 18.1026 0.29006 18.29L1.71006 19.71C1.89742 19.8962 2.15087 20.0008 2.41506 20.0008C2.67925 20.0008 2.9327 19.8962 3.12006 19.71L8.59006 14.25L5.76006 11.42M18.0001 0L14.0001 2V4L11.8301 6.17L13.8301 8.17L16.0001 6H18.0001L20.0001 2L18.0001 0Z"
                fill="#EF6C67"
              />
            </svg>
          </div>
        </h4>
        <p>
          {review.anything_to_be_fixed}
        </p>
      </div>
      <div className="safety">
        <h4>
          Are there any safety concerns in the surrounding area?
          <div className="icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.298 0.195179C8.69262 0.0475309 9.12379 0.0282824 9.53 0.140179L9.702 0.195179L16.702 2.82018C17.0569 2.95327 17.3667 3.18448 17.5953 3.48688C17.8239 3.78928 17.9618 4.1504 17.993 4.52818L18 4.69318V10.0562C18 11.6766 17.5624 13.267 16.7336 14.6594C15.9048 16.0518 14.7154 17.1946 13.291 17.9672L13.025 18.1062L9.671 19.7832C9.48632 19.8754 9.28461 19.9285 9.07847 19.9392C8.87233 19.9498 8.66621 19.9178 8.473 19.8452L8.329 19.7832L4.975 18.1062C3.52561 17.3815 2.29878 16.2789 1.424 14.9148C0.549233 13.5507 0.0589805 11.9758 0.00500011 10.3562L0 10.0562V4.69318C5.81505e-06 4.31431 0.107627 3.94323 0.310334 3.62315C0.513041 3.30307 0.802495 3.04715 1.145 2.88518L1.298 2.82018L8.298 0.195179ZM12.433 6.62918L7.835 11.2272L6.067 9.45918C5.87936 9.27167 5.62492 9.16638 5.35965 9.16648C5.09438 9.16657 4.84001 9.27204 4.6525 9.45968C4.46499 9.64732 4.3597 9.90176 4.3598 10.167C4.35989 10.4323 4.46536 10.6867 4.653 10.8742L7.057 13.2782C7.15915 13.3804 7.28044 13.4614 7.41393 13.5168C7.54742 13.5721 7.6905 13.6005 7.835 13.6005C7.9795 13.6005 8.12258 13.5721 8.25607 13.5168C8.38956 13.4614 8.51085 13.3804 8.613 13.2782L13.847 8.04318C13.9425 7.95093 14.0187 7.84059 14.0711 7.71858C14.1235 7.59658 14.1511 7.46536 14.1523 7.33258C14.1534 7.1998 14.1281 7.06812 14.0778 6.94523C14.0275 6.82233 13.9533 6.71068 13.8594 6.61678C13.7655 6.52289 13.6539 6.44864 13.531 6.39836C13.4081 6.34808 13.2764 6.32277 13.1436 6.32393C13.0108 6.32508 12.8796 6.35267 12.7576 6.40508C12.6356 6.45749 12.5252 6.53367 12.433 6.62918Z"
                fill="#EF6C67"
              />
            </svg>
          </div>
        </h4>
        <p>
          {review.safety_concerns}
        </p>
      </div>
      <div className="health">
        <h4>
          Do you have any health concerns about the property?
          <div className="icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.1875 0.75C8.81454 0.75 8.45685 0.898158 8.19313 1.16188C7.92941 1.4256 7.78125 1.78329 7.78125 2.15625V7.78125H2.15625C1.78329 7.78125 1.4256 7.92941 1.16188 8.19313C0.898158 8.45685 0.75 8.81454 0.75 9.1875V14.8125C0.75 15.1855 0.898158 15.5431 1.16188 15.8069C1.4256 16.0706 1.78329 16.2188 2.15625 16.2188H7.78125V21.8438C7.78125 22.2167 7.92941 22.5744 8.19313 22.8381C8.45685 23.1018 8.81454 23.25 9.1875 23.25H14.8125C15.1855 23.25 15.5431 23.1018 15.8069 22.8381C16.0706 22.5744 16.2188 22.2167 16.2188 21.8438V16.2188H21.8438C22.2167 16.2188 22.5744 16.0706 22.8381 15.8069C23.1018 15.5431 23.25 15.1855 23.25 14.8125V9.1875C23.25 8.81454 23.1018 8.45685 22.8381 8.19313C22.5744 7.92941 22.2167 7.78125 21.8438 7.78125H16.2188V2.15625C16.2188 1.78329 16.0706 1.4256 15.8069 1.16188C15.5431 0.898158 15.1855 0.75 14.8125 0.75H9.1875Z"
                fill="#EF6C67"
              />
            </svg>
          </div>
        </h4>
        <p>
          {review.health_concerns}
        </p>
      </div>
      {/*

      <div className="helpful">
        <button>
          <svg
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.1C19 7.62261 18.818 7.16477 18.4941 6.82721C18.1702 6.48964 17.7308 6.3 17.2727 6.3H11.8145L12.6436 2.187C12.6609 2.097 12.6695 1.998 12.6695 1.899C12.6695 1.53 12.5227 1.188 12.2895 0.945L11.3741 0L5.69136 5.922C5.37182 6.255 5.18182 6.705 5.18182 7.2V16.2C5.18182 16.6774 5.3638 17.1352 5.68772 17.4728C6.01165 17.8104 6.45099 18 6.90909 18H14.6818C15.3986 18 16.0118 17.55 16.2709 16.902L18.8791 10.557C18.9568 10.35 19 10.134 19 9.9V8.1ZM0 18H3.45455V7.2H0V18Z"
              fill="#919191"
            />
          </svg>
          Was this review helpful?
        </button>
      </div>

      */}
      {/*

      <div className="comment-section">
        <p className="comment-title">Comment this review or ask questions</p>
        <textarea placeholder="Enter a text..."></textarea>
        <div className="button-holder">
          <button>Write a comment</button>
        </div>
      </div>
      <div className="comments">
        <div className="comment">
          <p>
            <svg
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.5 23.22C10.125 23.22 7.1415 21.492 5.4 18.9C5.4405 16.2 10.8 14.715 13.5 14.715C16.2 14.715 21.5595 16.2 21.6 18.9C20.7075 20.229 19.5019 21.3181 18.0894 22.0714C16.6769 22.8247 15.1008 23.2192 13.5 23.22ZM13.5 4.05C14.5741 4.05 15.6043 4.4767 16.3638 5.23622C17.1233 5.99574 17.55 7.02587 17.55 8.1C17.55 9.17413 17.1233 10.2043 16.3638 10.9638C15.6043 11.7233 14.5741 12.15 13.5 12.15C12.4259 12.15 11.3957 11.7233 10.6362 10.9638C9.87669 10.2043 9.45 9.17413 9.45 8.1C9.45 7.02587 9.87669 5.99574 10.6362 5.23622C11.3957 4.4767 12.4259 4.05 13.5 4.05ZM13.5 0C11.7272 0 9.97167 0.349188 8.33377 1.02763C6.69588 1.70606 5.20765 2.70047 3.95406 3.95406C1.42232 6.4858 0 9.91958 0 13.5C0 17.0804 1.42232 20.5142 3.95406 23.0459C5.20765 24.2995 6.69588 25.2939 8.33377 25.9724C9.97167 26.6508 11.7272 27 13.5 27C17.0804 27 20.5142 25.5777 23.0459 23.0459C25.5777 20.5142 27 17.0804 27 13.5C27 6.0345 20.925 0 13.5 0Z"
                fill="#D9D9D9"
              />
            </svg>
            <strong>M. J., student</strong>{" "}
            <span className="date">Wrote on 23 Sep 2024</span>
          </p>
          <p>
            Newly Refurbished Spacious 2 bedroom mid terraced property
            Conveniently Located Near the Center of Town, a short distance to
            Shops, Amenities and Transport Links. The property comprises of 2
            Reception Rooms, Breakfast Room, and kitchen. To the first floor,
            Bathroom and 2 Double Bedrooms. EPC D
          </p>
          <p className="likes">
            <span className="like-icon">
              <svg
                width="19"
                height="18"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 8.1C19 7.62261 18.818 7.16477 18.4941 6.82721C18.1702 6.48964 17.7308 6.3 17.2727 6.3H11.8145L12.6436 2.187C12.6609 2.097 12.6695 1.998 12.6695 1.899C12.6695 1.53 12.5227 1.188 12.2895 0.945L11.3741 0L5.69136 5.922C5.37182 6.255 5.18182 6.705 5.18182 7.2V16.2C5.18182 16.6774 5.3638 17.1352 5.68772 17.4728C6.01165 17.8104 6.45099 18 6.90909 18H14.6818C15.3986 18 16.0118 17.55 16.2709 16.902L18.8791 10.557C18.9568 10.35 19 10.134 19 9.9V8.1ZM0 18H3.45455V7.2H0V18Z"
                  fill="#919191"
                />
              </svg>
            </span>{" "}
            2 likes <span className="reply-link">Reply</span>
          </p>
        </div>
        <div className="comment reply">
          <p>
            <svg
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.5 23.22C10.125 23.22 7.1415 21.492 5.4 18.9C5.4405 16.2 10.8 14.715 13.5 14.715C16.2 14.715 21.5595 16.2 21.6 18.9C20.7075 20.229 19.5019 21.3181 18.0894 22.0714C16.6769 22.8247 15.1008 23.2192 13.5 23.22ZM13.5 4.05C14.5741 4.05 15.6043 4.4767 16.3638 5.23622C17.1233 5.99574 17.55 7.02587 17.55 8.1C17.55 9.17413 17.1233 10.2043 16.3638 10.9638C15.6043 11.7233 14.5741 12.15 13.5 12.15C12.4259 12.15 11.3957 11.7233 10.6362 10.9638C9.87669 10.2043 9.45 9.17413 9.45 8.1C9.45 7.02587 9.87669 5.99574 10.6362 5.23622C11.3957 4.4767 12.4259 4.05 13.5 4.05ZM13.5 0C11.7272 0 9.97167 0.349188 8.33377 1.02763C6.69588 1.70606 5.20765 2.70047 3.95406 3.95406C1.42232 6.4858 0 9.91958 0 13.5C0 17.0804 1.42232 20.5142 3.95406 23.0459C5.20765 24.2995 6.69588 25.2939 8.33377 25.9724C9.97167 26.6508 11.7272 27 13.5 27C17.0804 27 20.5142 25.5777 23.0459 23.0459C25.5777 20.5142 27 17.0804 27 13.5C27 6.0345 20.925 0 13.5 0Z"
                fill="#D9D9D9"
              />
            </svg>
            <strong>M. J., student</strong>{" "}
            <span className="date">Wrote on 23 Sep 2024</span>
          </p>
          <p>
            Newly Refurbished Spacious 2 bedroom mid terraced property
            Conveniently Located Near the Center of Town
          </p>
          <p className="likes">
            <span className="like-icon">
              <svg
                width="19"
                height="18"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 8.1C19 7.62261 18.818 7.16477 18.4941 6.82721C18.1702 6.48964 17.7308 6.3 17.2727 6.3H11.8145L12.6436 2.187C12.6609 2.097 12.6695 1.998 12.6695 1.899C12.6695 1.53 12.5227 1.188 12.2895 0.945L11.3741 0L5.69136 5.922C5.37182 6.255 5.18182 6.705 5.18182 7.2V16.2C5.18182 16.6774 5.3638 17.1352 5.68772 17.4728C6.01165 17.8104 6.45099 18 6.90909 18H14.6818C15.3986 18 16.0118 17.55 16.2709 16.902L18.8791 10.557C18.9568 10.35 19 10.134 19 9.9V8.1ZM0 18H3.45455V7.2H0V18Z"
                  fill="#919191"
                />
              </svg>
            </span>{" "}
            2 likes
          </p>
        </div>
      </div>

      */}
    </div>
  );
};

export default PropertyInfo;
