import React, { useEffect, useState } from "react";
import LocationMap from "../PropertyProfile/LocationMap";
import axios from "axios";
import { useAppProvider } from "../../Contexts/AppContext";

const PropertyCard = ({ property }) => {
  const [epcDetails, setEpcDetails] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [addressDetails, setAddressDetails] = useState({});
  const [reviews, setReviews] = useState([]);
  const { setReviewLocateId, serverUrl } = useAppProvider();
  useEffect(() => {
    const descriptionSentences = property.Description.split(' ');
    const lastTwoSentences = descriptionSentences.slice(-2).join('');
    searchProperties(lastTwoSentences);
    getAddressFromPostcode(property.Description);
    getReviewsCount(property.Id);
  }, []);

  const token =
  "ZG9ndWNhbmJhc2tpbkBnbWFpbC5jb206NzljMDc5YjllOTNmMGQ3MWQ3MjIyY2MwYjAyNWM1NDI2NjEwMjg3OA==";
  const headers = {
    Accept: "text/csv",
    Authorization: `Basic ${token}`,
  };
  const baseUrl = "https://epc.opendatacommunities.org/api/v1/domestic/search";

  async function getReviewsCount(id) {
    const url = `${serverUrl}/review/getReviewsById/${id}`;
    axios.get(url)
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  async function searchProperties(query) {
    if (!query.trim()) {
      return;
    }
    const queryParams = { "postcode": query };
    const encodedParams = new URLSearchParams(queryParams).toString();
    const fullUrl = `${baseUrl}?${encodedParams}`;

    await fetch(fullUrl, {
      method: "GET",
      headers: headers,
    })
      .then(async (response) => {
        const responseText = await response.text();
        const formattedData = csvToKeyValueArray(responseText);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        //console.log(formattedData);
        if (formattedData.length > 0)
          setEpcDetails(formattedData[0]);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  function csvToKeyValueArray(csv) {
    const lines = csv.split("\n");
    const headers = lines[0].split(",");
    return lines.slice(1).map((line) => {
      const values = line.split(",");
      return headers.reduce((obj, header, index) => {
        obj[header] = values[index];
        return obj;
      }, {});
    });
  }


  // Retrieve the full address details of a selected unit
  const handleUnitSelect = async (id, text, Description) => {
    const postalCode = Description.split(" ").slice(-2).join("");
    window.location.href = `/property-profile?id=${id}&address=${text}&postcode=${postalCode.replace(/\s+/g, '')}`;
  };

  const getAddressFromPostcode = async (Description) => {
    try {
      const postcode = Description.split(" ").slice(-2).join("");
      const response = await axios.get(`https://api.postcodes.io/postcodes/${postcode}`);
      const data = response.data;
      if (data.status === 200 && data.result && data.result.latitude && data.result.longitude) {
        // You can process the data as needed
        //console.log(data.result);
        setAddressDetails(data.result);
        setShowMap(true);
      } else {
        console.log('Postcode not found');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };


  function createAddressString(data) {
    const addressParts = [
      data["Text"],
      data["Description"],
    ].filter((part) => part && part.trim() !== "");
    return addressParts.join(", ");
  }
  return (
    <div className="property-card" onClick={()=>{
      if (property.Type === "Address"){
        handleUnitSelect(property.Id, property.Text, property.Description);
      }
      else{
        window.location.href = `/property-listing/?search=${property.Text}&id=${property.Id}`;
      }
    }}>
      <div className="property-header">
        <h4>{createAddressString(property)}</h4>
        <a href="#" className="show-on-map" onClick={(e) => {showMap(true); e.stopPropagation();}}>
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
          Show on map
        </a>
      </div>
      <div className="property-details">
        {property.rating ? (
          <div className="property-rating">
            <span>
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="30" height="30" rx="6" fill="#0A2446" />
                <path
                  d="M14.9996 20.9108L10.7581 23.5861C10.5707 23.711 10.3748 23.7645 10.1704 23.7467C9.96601 23.7288 9.78716 23.6575 9.63385 23.5326C9.48054 23.4078 9.36131 23.2519 9.27614 23.065C9.19097 22.8781 9.17393 22.6683 9.22503 22.4357L10.3493 17.3794L6.59328 13.9817C6.42294 13.8212 6.31665 13.6382 6.2744 13.4327C6.23216 13.2273 6.24476 13.0268 6.31222 12.8313C6.38035 12.6351 6.48256 12.4746 6.61883 12.3498C6.7551 12.2249 6.94248 12.1446 7.18095 12.109L12.1378 11.6542L14.0542 6.89208C14.1393 6.67805 14.2715 6.51753 14.4507 6.41052C14.6299 6.30351 14.8129 6.25 14.9996 6.25C15.1869 6.25 15.3699 6.30351 15.5484 6.41052C15.7269 6.51753 15.8591 6.67805 15.945 6.89208L17.8613 11.6542L22.8182 12.109C23.0567 12.1446 23.244 12.2249 23.3803 12.3498C23.5166 12.4746 23.6188 12.6351 23.6869 12.8313C23.755 13.0275 23.768 13.2283 23.7257 13.4338C23.6835 13.6393 23.5769 13.8219 23.4058 13.9817L19.6498 17.3794L20.7741 22.4357C20.8252 22.6676 20.8082 22.8774 20.723 23.065C20.6378 23.2526 20.5186 23.4085 20.3653 23.5326C20.212 23.6575 20.0331 23.7288 19.8287 23.7467C19.6243 23.7645 19.4284 23.711 19.241 23.5861L14.9996 20.9108Z"
                  fill="#EF6C67"
                />
              </svg>
              {property.rating}
            </span>
          </div>
        ) : (
          <div className="property-rating">
            <p>
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="30" height="30" rx="6" fill="#D9D9D9" />
                <path
                  d="M14.9996 20.9108L10.7581 23.5861C10.5707 23.711 10.3748 23.7645 10.1704 23.7467C9.96601 23.7288 9.78716 23.6575 9.63385 23.5326C9.48054 23.4078 9.36131 23.2519 9.27614 23.065C9.19097 22.8781 9.17393 22.6683 9.22503 22.4357L10.3493 17.3794L6.59328 13.9817C6.42294 13.8212 6.31665 13.6382 6.2744 13.4327C6.23216 13.2273 6.24476 13.0268 6.31222 12.8313C6.38035 12.6351 6.48256 12.4746 6.61883 12.3498C6.7551 12.2249 6.94248 12.1446 7.18095 12.109L12.1378 11.6542L14.0542 6.89208C14.1393 6.67805 14.2715 6.51753 14.4507 6.41052C14.6299 6.30351 14.8129 6.25 14.9996 6.25C15.1869 6.25 15.3699 6.30351 15.5484 6.41052C15.7269 6.51753 15.8591 6.67805 15.945 6.89208L17.8613 11.6542L22.8182 12.109C23.0567 12.1446 23.244 12.2249 23.3803 12.3498C23.5166 12.4746 23.6188 12.6351 23.6869 12.8313C23.755 13.0275 23.768 13.2283 23.7257 13.4338C23.6835 13.6393 23.5769 13.8219 23.4058 13.9817L19.6498 17.3794L20.7741 22.4357C20.8252 22.6676 20.8082 22.8774 20.723 23.065C20.6378 23.2526 20.5186 23.4085 20.3653 23.5326C20.212 23.6575 20.0331 23.7288 19.8287 23.7467C19.6243 23.7645 19.4284 23.711 19.241 23.5861L14.9996 20.9108Z"
                  fill="#F5F5F5"
                />
              </svg>
              No reviews yet — be the first one!
            </p>
          </div>
        )}
        <p className="property-info">
          {property.lastPrice && (
            <span className="property-price">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1 12C1 5.925 5.925 1 12 1C18.075 1 23 5.925 23 12C23 18.075 18.075 23 12 23C5.925 23 1 18.075 1 12ZM13 6C12.507 6 11.789 6.14 11.166 6.588C10.49 7.074 10 7.874 10 9V11H9C8.73478 11 8.48043 11.1054 8.29289 11.2929C8.10536 11.4804 8 11.7348 8 12C8 12.2652 8.10536 12.5196 8.29289 12.7071C8.48043 12.8946 8.73478 13 9 13H10V14C10 14.173 9.94 14.456 9.788 14.666C9.674 14.825 9.474 15 9 15C8.73478 15 8.48043 15.1054 8.29289 15.2929C8.10536 15.4804 8 15.7348 8 16C8 16.2652 8.10536 16.5196 8.29289 16.7071C8.48043 16.8946 8.73478 17 9 17H15C15.2652 17 15.5196 16.8946 15.7071 16.7071C15.8946 16.5196 16 16.2652 16 16C16 15.7348 15.8946 15.4804 15.7071 15.2929C15.5196 15.1054 15.2652 15 15 15H11.834C11.954 14.633 12 14.28 12 14V13H13C13.2652 13 13.5196 12.8946 13.7071 12.7071C13.8946 12.5196 14 12.2652 14 12C14 11.7348 13.8946 11.4804 13.7071 11.2929C13.5196 11.1054 13.2652 11 13 11H12V9C12 8.526 12.175 8.326 12.334 8.212C12.544 8.06 12.827 8 13 8C13.173 8 13.456 8.06 13.666 8.212C13.825 8.326 14 8.526 14 9C14 9.26522 14.1054 9.51957 14.2929 9.70711C14.4804 9.89464 14.7348 10 15 10C15.2652 10 15.5196 9.89464 15.7071 9.70711C15.8946 9.51957 16 9.26522 16 9C16 7.874 15.508 7.074 14.834 6.588C14.2966 6.21023 13.6569 6.00513 13 6Z"
                  fill="#919191"
                />
              </svg>
              Last price: {property.lastPrice}
            </span>
          )}
          <span className="property-size">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2H8V4H16V2H22V8H20V16H22V22H16V20H8V22H2V16H4V8H2V2ZM16 8V6H8V8H6V16H8V18H16V16H18V8H16ZM4 4V6H6V4H4ZM18 4V6H20V4H18ZM4 18V20H6V18H4ZM18 18V20H20V18H18Z"
                fill="#919191"
              />
            </svg>
            {property.size}
          </span>
          <span className="property-epc">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5 20L16.36 10.27H13V4L8 13.73H11.5V20ZM12 2C14.75 2 17.1 3 19.05 4.95C21 6.9 22 9.25 22 12C22 14.75 21 17.1 19.05 19.05C17.1 21 14.75 22 12 22C9.25 22 6.9 21 4.95 19.05C3 17.1 2 14.75 2 12C2 9.25 3 6.9 4.95 4.95C6.9 3 9.25 2 12 2Z"
                fill="#919191"
              />
            </svg>
            EPC rating: {epcDetails['current-energy-rating']} ({epcDetails['current-energy-efficiency']})
          </span>
        </p>
        {showMap && <LocationMap addressDetails={addressDetails} />}
        <p className="property-description">{property.description}</p>
      </div>
      <div className="property-footer">
        <div className="footer-review-info">
          <p>{reviews ? reviews.length : 0} Reviews</p>
          <a
            href="#"
            className={
              (reviews && reviews.length > 0) ? "write-review" : "first write-review"
            }
          >
            { (reviews && reviews.length > 0) ? (
              <>
                <i className="icon-write-review" />
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.71 7.04006C21.1 6.65006 21.1 6.00006 20.71 5.63006L18.37 3.29006C18 2.90006 17.35 2.90006 16.96 3.29006L15.12 5.12006L18.87 8.87006M3 17.2501V21.0001H6.75L17.81 9.93006L14.06 6.18006L3 17.2501Z"
                    fill="#0A2446"
                  />
                </svg>
                Write a review
              </>
            ) : (
              <>
                <i className="icon-first-review" />
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.71 7.04006C21.1 6.65006 21.1 6.00006 20.71 5.63006L18.37 3.29006C18 2.90006 17.35 2.90006 16.96 3.29006L15.12 5.12006L18.87 8.87006M3 17.2501V21.0001H6.75L17.81 9.93006L14.06 6.18006L3 17.2501Z"
                    fill="#EF6C67"
                  />
                </svg>
                Write first review
              </>
            )}
          </a>
        </div>
        <div className="footer-fav">
          <button className="favorite-button">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45 20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z"
                fill="#919191"
              />
            </svg>
            Saved to favorites
            <svg
              width="29"
              height="30"
              viewBox="0 0 29 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.11462 16.875C5.48744 16.875 6.60033 16.0355 6.60033 15C6.60034 13.9645 5.48744 13.125 4.11462 13.125C2.7418 13.125 1.62891 13.9645 1.62891 15C1.62891 16.0355 2.7418 16.875 4.11462 16.875Z"
                fill="#919191"
              />
              <path
                d="M14.058 16.875C15.4308 16.875 16.5437 16.0355 16.5437 15C16.5437 13.9645 15.4308 13.125 14.058 13.125C12.6852 13.125 11.5723 13.9645 11.5723 15C11.5723 16.0355 12.6852 16.875 14.058 16.875Z"
                fill="#919191"
              />
              <path
                d="M24.0004 16.875C25.3732 16.875 26.4861 16.0355 26.4861 15C26.4861 13.9645 25.3732 13.125 24.0004 13.125C22.6275 13.125 21.5146 13.9645 21.5146 15C21.5146 16.0355 22.6275 16.875 24.0004 16.875Z"
                fill="#919191"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
