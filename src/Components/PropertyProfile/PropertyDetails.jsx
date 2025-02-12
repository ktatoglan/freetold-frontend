import React, { useState, useRef, useEffect } from "react";
import { useAppProvider } from "../../Contexts/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PropertyDetails = ({reviews, selectedProperty, selectedPropertyLocate}) => {
  const [isSummaryVisible, setSummaryVisible] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [totalEstimatedBills, setTotalEstimatedBills] = useState('-');
  const [lastPrice, setLastPrice] = useState('-');
  const [totalFloorArea, setTotalFloorArea] = useState('-');
  const [Electricity, setElectricity] = useState('-');
  const [Gas, setGas] = useState('-');
  const [Water, setWater] = useState('-');
  const [internet, setInternet] = useState('-');
  const breakdownRef = useRef(null);
  const infoRef = useRef(null);
  const { serverUrl, userId, setReviewLocateId } = useAppProvider();
  const [propertyScore , setPropertyScore] = useState(0);
  const [displayStarsHTML, setDisplayStarsHTML] = useState('');
  const navigate = useNavigate();

  // Dış tıklama olayını dinlemek için tek bir işlev
  const handleClickOutside = (event) => {
    if (
      breakdownRef.current &&
      !breakdownRef.current.contains(event.target) &&
      infoRef.current &&
      !infoRef.current.contains(event.target)
    ) {
      setShowBreakdown(false);
      setSummaryVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if(reviews.length === 0){
      setTotalEstimatedBills('-');
      setLastPrice('-');
      setPropertyScore(0);
      setDisplayStarsHTML('');
      return;
    }

    let totalElectricity = reviews.reduce((acc, review) => acc + Number(review.electric_bill), 0);
    let totalGas = reviews.reduce((acc, review) => acc + Number(review.gas_bill), 0);
    let totalWater = reviews.reduce((acc, review) => acc + Number(review.water_bill), 0);
    let totalInternet = reviews.reduce((acc, review) => acc + Number(review.internet_bill), 0);
    setElectricity(totalElectricity/reviews.length);
    setGas(totalGas/reviews.length);
    setWater(totalWater/reviews.length);
    setInternet(totalInternet/reviews.length);
    const totalBills = (totalElectricity + totalGas + totalWater + totalInternet) / reviews.length;
    setTotalEstimatedBills(totalBills % 1 === 0 ? totalBills.toFixed(0) : totalBills.toFixed(2));
    setLastPrice(reviews.length > 0 ? parseInt(reviews[0].rent_amount, 10) : '-');
    const totalScore = reviews.reduce((acc, review) => acc + Number(review.review_score), 0);
    setPropertyScore(reviews.length > 0 ? (totalScore / reviews.length).toFixed(2) : 0);
    displayStars((totalScore / reviews.length).toFixed(0));
    setReviewLocateId(selectedPropertyLocate.Id ? selectedPropertyLocate.Id : selectedPropertyLocate.id);
  }, [reviews]);


  const handleInfoClick = () => {
    setShowBreakdown((prev) => !prev);
  };

  const toggleSummary = () => {
    setSummaryVisible((prev) => !prev);
  };

  function createAddressString(data) {
    const addressParts = [
      data["address1"],
      data["address2"],
      data["address3"],
      data["posttown"],
      data["postcode"],
    ].filter((part) => part && part.trim() !== "");
    return addressParts.join(", ");
  }

  function handleWriteReviewClick (){
    if (!userId){
      toast.error("Please login to write a review");
      return;
    }

    // navigate(`/write-a-review-1`);
    window.location.href = `/write-a-review-1`;
  }

  function displayStars(score){
    let stars = [];
    for (let i = 0; i < Math.round(score); i++){
      stars.push(
        <div key={'s'+i}>
          <input type="radio" id={`general-review-star-checked${i+1}`} name="rating" value={i+1} checked={true} onChange={()=>{}}/>
          <label className="checked-star" htmlFor={`general-review-star-checked${i+1}`}></label>
        </div>
      );
    }
    for (let i = 0; i < 5 - Math.round(score); i++){
      stars.push(
        <div key={"u"+i}>
          <input type="radio" id={`general-review-star${i+1}`} name="rating" value={i+1} onChange={()=>{}}/>
          <label htmlFor={`general-review-star${i+1}`}></label>
        </div>
      );
    }
    setDisplayStarsHTML(stars);
    return stars;
  }

  return (
    <div className="property-details">
      <div className="property-info">
        <div className="details">
          <h2>{selectedPropertyLocate.Label ? selectedPropertyLocate.Label : selectedPropertyLocate.label}</h2>
          <div className="stars">
            {displayStarsHTML}
            <span>({propertyScore})</span>
            <p className="review-count">{reviews.length} Reviews</p>
          </div>
          <p>
            Property type: <span>{selectedPropertyLocate["Type"] ? selectedPropertyLocate["Type"] : selectedPropertyLocate["type"]}</span>
            <br />
            More info will be added here soon...
          </p>
        </div>
        <div className="stats">
          <div className="stat-item">
            <div className="class-icon">
              <svg
                width="51"
                height="45"
                viewBox="0 0 51 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 6C9 4.4087 9.63214 2.88258 10.7574 1.75736C11.8826 0.632141 13.4087 0 15 0H36C37.5913 0 39.1174 0.632141 40.2426 1.75736C41.3679 2.88258 42 4.4087 42 6V27H51V33C51 35.3869 50.0518 37.6761 48.364 39.364C46.6761 41.0518 44.3869 42 42 42H29.85C29.949 41.514 30 41.013 30 40.5V39H39V6C39 5.20435 38.6839 4.44129 38.1213 3.87868C37.5587 3.31607 36.7957 3 36 3H15C14.2044 3 13.4413 3.31607 12.8787 3.87868C12.3161 4.44129 12 5.20435 12 6V24H9V6ZM48 30H42V39C43.5913 39 45.1174 38.3679 46.2426 37.2426C47.3679 36.1174 48 34.5913 48 33V30ZM18 10.5C18 10.1022 18.158 9.72064 18.4393 9.43934C18.7206 9.15804 19.1022 9 19.5 9H31.5C31.8978 9 32.2794 9.15804 32.5607 9.43934C32.842 9.72064 33 10.1022 33 10.5C33 10.8978 32.842 11.2794 32.5607 11.5607C32.2794 11.842 31.8978 12 31.5 12H19.5C19.1022 12 18.7206 11.842 18.4393 11.5607C18.158 11.2794 18 10.8978 18 10.5ZM18 19.5C18 19.1022 18.158 18.7206 18.4393 18.4393C18.7206 18.158 19.1022 18 19.5 18H31.5C31.8978 18 32.2794 18.158 32.5607 18.4393C32.842 18.7206 33 19.1022 33 19.5C33 19.8978 32.842 20.2794 32.5607 20.5607C32.2794 20.842 31.8978 21 31.5 21H19.5C19.1022 21 18.7206 20.842 18.4393 20.5607C18.158 20.2794 18 19.8978 18 19.5ZM27 31.5C27 30.3065 26.5259 29.1619 25.682 28.318C24.8381 27.4741 23.6935 27 22.5 27H4.5C3.30653 27 2.16193 27.4741 1.31802 28.318C0.474106 29.1619 0 30.3065 0 31.5V40.5C0 41.6935 0.474106 42.8381 1.31802 43.682C2.16193 44.5259 3.30653 45 4.5 45H22.5C23.6935 45 24.8381 44.5259 25.682 43.682C26.5259 42.8381 27 41.6935 27 40.5V31.5ZM24 37.5V40.5C23.6022 40.5 23.2206 40.658 22.9393 40.9393C22.658 41.2206 22.5 41.6022 22.5 42H19.5C19.5 40.8065 19.9741 39.6619 20.818 38.818C21.6619 37.9741 22.8065 37.5 24 37.5ZM22.5 30C22.5 30.3978 22.658 30.7794 22.9393 31.0607C23.2206 31.342 23.6022 31.5 24 31.5V34.5C22.8065 34.5 21.6619 34.0259 20.818 33.182C19.9741 32.3381 19.5 31.1935 19.5 30H22.5ZM3 31.5C3.39782 31.5 3.77936 31.342 4.06066 31.0607C4.34196 30.7794 4.5 30.3978 4.5 30H7.5C7.5 31.1935 7.02589 32.3381 6.18198 33.182C5.33807 34.0259 4.19347 34.5 3 34.5V31.5ZM4.5 42C4.5 41.6022 4.34196 41.2206 4.06066 40.9393C3.77936 40.658 3.39782 40.5 3 40.5V37.5C4.19347 37.5 5.33807 37.9741 6.18198 38.818C7.02589 39.6619 7.5 40.8065 7.5 42H4.5ZM9 36C9 35.409 9.1164 34.8239 9.34254 34.2779C9.56869 33.732 9.90016 33.2359 10.318 32.818C10.7359 32.4002 11.232 32.0687 11.7779 31.8425C12.3239 31.6164 12.9091 31.5 13.5 31.5C14.0909 31.5 14.6761 31.6164 15.2221 31.8425C15.768 32.0687 16.2641 32.4002 16.682 32.818C17.0998 33.2359 17.4313 33.732 17.6575 34.2779C17.8836 34.8239 18 35.409 18 36C18 37.1935 17.5259 38.3381 16.682 39.182C15.8381 40.0259 14.6935 40.5 13.5 40.5C12.3065 40.5 11.1619 40.0259 10.318 39.182C9.4741 38.3381 9 37.1935 9 36Z"
                  fill="#D9D9D9"
                />
              </svg>
            </div>
            <div className="stat-text">
              <div className="stat-label">Last price</div>
              <div className="stat-value">£{lastPrice}</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="class-icon">
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.66667 0C1.22464 0 0.800716 0.175595 0.488155 0.488155C0.175595 0.800716 0 1.22464 0 1.66667L0 48.3333C0 48.7754 0.175595 49.1993 0.488155 49.5118C0.800716 49.8244 1.22464 50 1.66667 50H15C15.442 50 15.8659 49.8244 16.1785 49.5118C16.4911 49.1993 16.6667 48.7754 16.6667 48.3333V16.6667H48.3333C48.7754 16.6667 49.1993 16.4911 49.5118 16.1785C49.8244 15.8659 50 15.442 50 15V1.66667C50 1.22464 49.8244 0.800716 49.5118 0.488155C49.1993 0.175595 48.7754 0 48.3333 0L1.66667 0ZM3.33333 13.5833V3.33333H13.5833V13.5833H3.33333ZM3.33333 16.4167V46.6667H13.3333V43.0833H9.16667C8.79094 43.0833 8.43061 42.9341 8.16493 42.6684C7.89926 42.4027 7.75 42.0424 7.75 41.6667C7.75 41.2909 7.89926 40.9306 8.16493 40.6649C8.43061 40.3993 8.79094 40.25 9.16667 40.25H13.3333V36.4167H7.5C7.12428 36.4167 6.76394 36.2674 6.49827 36.0017C6.23259 35.7361 6.08333 35.3757 6.08333 35C6.08333 34.6243 6.23259 34.2639 6.49827 33.9983C6.76394 33.7326 7.12428 33.5833 7.5 33.5833H13.3333V29.75H9.16667C8.79094 29.75 8.43061 29.6007 8.16493 29.3351C7.89926 29.0694 7.75 28.7091 7.75 28.3333C7.75 27.9576 7.89926 27.5973 8.16493 27.3316C8.43061 27.0659 8.79094 26.9167 9.16667 26.9167H13.3333V23.0833H9.16667C8.79094 23.0833 8.43061 22.9341 8.16493 22.6684C7.89926 22.4027 7.75 22.0424 7.75 21.6667C7.75 21.2909 7.89926 20.9306 8.16493 20.6649C8.43061 20.3993 8.79094 20.25 9.16667 20.25H13.3333V16.4167H3.33333ZM16.4167 13.3333H20.25V9.16667C20.25 8.79094 20.3993 8.43061 20.6649 8.16493C20.9306 7.89926 21.2909 7.75 21.6667 7.75C22.0424 7.75 22.4027 7.89926 22.6684 8.16493C22.9341 8.43061 23.0833 8.79094 23.0833 9.16667V13.3333H26.9167V9.16667C26.9167 8.79094 27.0659 8.43061 27.3316 8.16493C27.5973 7.89926 27.9576 7.75 28.3333 7.75C28.7091 7.75 29.0694 7.89926 29.3351 8.16493C29.6007 8.43061 29.75 8.79094 29.75 9.16667V13.3333H33.5833V7.5C33.5833 7.12428 33.7326 6.76394 33.9983 6.49827C34.2639 6.23259 34.6243 6.08333 35 6.08333C35.3757 6.08333 35.7361 6.23259 36.0017 6.49827C36.2674 6.76394 36.4167 7.12428 36.4167 7.5V13.3333H40.25V9.16667C40.25 8.79094 40.3993 8.43061 40.6649 8.16493C40.9306 7.89926 41.2909 7.75 41.6667 7.75C42.0424 7.75 42.4027 7.89926 42.6684 8.16493C42.9341 8.43061 43.0833 8.79094 43.0833 9.16667V13.3333H46.6667V3.33333H16.4167V13.3333Z"
                  fill="#D9D9D9"
                />
              </svg>
            </div>
            <div className="stat-text">
              <div className="stat-label">Total floor area</div>
              <div className="stat-value">{selectedProperty["total-floor-area"] ? selectedProperty["total-floor-area"]+" sq m" : "-" } </div>
            </div>
          </div>
          <div className="stat-item">
            <div className="class-icon">
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.25 17.5C24.2609 17.5 22.3532 18.2902 20.9467 19.6967C19.5402 21.1032 18.75 23.0109 18.75 25C18.75 26.9891 19.5402 28.8968 20.9467 30.3033C22.3532 31.7098 24.2609 32.5 26.25 32.5C28.2391 32.5 30.1468 31.7098 31.5533 30.3033C32.9598 28.8968 33.75 26.9891 33.75 25C33.75 23.0109 32.9598 21.1032 31.5533 19.6967C30.1468 18.2902 28.2391 17.5 26.25 17.5ZM22.5 25C22.5 24.0054 22.8951 23.0516 23.5983 22.3483C24.3016 21.6451 25.2554 21.25 26.25 21.25C27.2446 21.25 28.1984 21.6451 28.9017 22.3483C29.6049 23.0516 30 24.0054 30 25C30 25.9946 29.6049 26.9484 28.9017 27.6517C28.1984 28.3549 27.2446 28.75 26.25 28.75C25.2554 28.75 24.3016 28.3549 23.5983 27.6517C22.8951 26.9484 22.5 25.9946 22.5 25ZM5 15.625C5 14.1332 5.59263 12.7024 6.64752 11.6475C7.70242 10.5926 9.13316 10 10.625 10H41.875C42.6137 10 43.3451 10.1455 44.0276 10.4282C44.7101 10.7109 45.3301 11.1252 45.8525 11.6475C46.3748 12.1699 46.7891 12.7899 47.0718 13.4724C47.3545 14.1549 47.5 14.8863 47.5 15.625V27.5H43.75V21.25H41.875C40.3832 21.25 38.9524 20.6574 37.8975 19.6025C36.8426 18.5476 36.25 17.1168 36.25 15.625V13.75H16.25V15.625C16.25 17.1168 15.6574 18.5476 14.6025 19.6025C13.5476 20.6574 12.1168 21.25 10.625 21.25H8.75V28.75H10.625C12.1168 28.75 13.5476 29.3426 14.6025 30.3975C15.6574 31.4524 16.25 32.8832 16.25 34.375V36.25H35V40H10.625C9.13316 40 7.70242 39.4074 6.64752 38.3525C5.59263 37.2976 5 35.8668 5 34.375V15.625ZM10.625 13.75C10.1277 13.75 9.65081 13.9475 9.29917 14.2992C8.94754 14.6508 8.75 15.1277 8.75 15.625V17.5H10.625C11.1223 17.5 11.5992 17.3025 11.9508 16.9508C12.3025 16.5992 12.5 16.1223 12.5 15.625V13.75H10.625ZM43.75 17.5V15.625C43.75 15.1277 43.5525 14.6508 43.2008 14.2992C42.8492 13.9475 42.3723 13.75 41.875 13.75H40V15.625C40 16.66 40.84 17.5 41.875 17.5H43.75ZM8.75 34.375C8.75 35.41 9.59 36.25 10.625 36.25H12.5V34.375C12.5 33.8777 12.3025 33.4008 11.9508 33.0492C11.5992 32.6975 11.1223 32.5 10.625 32.5H8.75V34.375ZM11.0025 43.75H35V47.5H17.5C16.1831 47.5004 14.8893 47.154 13.7487 46.4958C12.6081 45.8375 11.661 44.8905 11.0025 43.75ZM55 27.5V22.5C55.0004 21.1831 54.654 19.8893 53.9958 18.7487C53.3375 17.6081 52.3905 16.661 51.25 16.0025V27.5H55ZM41.25 30C40.2554 30 39.3016 30.3951 38.5984 31.0983C37.8951 31.8016 37.5 32.7554 37.5 33.75V53.75C37.5 54.7446 37.8951 55.6984 38.5984 56.4016C39.3016 57.1049 40.2554 57.5 41.25 57.5H53.75C54.7446 57.5 55.6984 57.1049 56.4016 56.4016C57.1049 55.6984 57.5 54.7446 57.5 53.75V33.75C57.5 32.7554 57.1049 31.8016 56.4016 31.0983C55.6984 30.3951 54.7446 30 53.75 30H41.25ZM42.5 41.25H45C45.3315 41.25 45.6495 41.3817 45.8839 41.6161C46.1183 41.8505 46.25 42.1685 46.25 42.5C46.25 42.8315 46.1183 43.1495 45.8839 43.3839C45.6495 43.6183 45.3315 43.75 45 43.75H42.5C42.1685 43.75 41.8505 43.6183 41.6161 43.3839C41.3817 43.1495 41.25 42.8315 41.25 42.5C41.25 42.1685 41.3817 41.8505 41.6161 41.6161C41.8505 41.3817 42.1685 41.25 42.5 41.25ZM50 41.25H52.5C52.8315 41.25 53.1495 41.3817 53.3839 41.6161C53.6183 41.8505 53.75 42.1685 53.75 42.5C53.75 42.8315 53.6183 43.1495 53.3839 43.3839C53.1495 43.6183 52.8315 43.75 52.5 43.75H50C49.6685 43.75 49.3505 43.6183 49.1161 43.3839C48.8817 43.1495 48.75 42.8315 48.75 42.5C48.75 42.1685 48.8817 41.8505 49.1161 41.6161C49.3505 41.3817 49.6685 41.25 50 41.25ZM42.5 46.25H45C45.3315 46.25 45.6495 46.3817 45.8839 46.6161C46.1183 46.8505 46.25 47.1685 46.25 47.5C46.25 47.8315 46.1183 48.1495 45.8839 48.3839C45.6495 48.6183 45.3315 48.75 45 48.75H42.5C42.1685 48.75 41.8505 48.6183 41.6161 48.3839C41.3817 48.1495 41.25 47.8315 41.25 47.5C41.25 47.1685 41.3817 46.8505 41.6161 46.6161C41.8505 46.3817 42.1685 46.25 42.5 46.25ZM50 46.25H52.5C52.8315 46.25 53.1495 46.3817 53.3839 46.6161C53.6183 46.8505 53.75 47.1685 53.75 47.5C53.75 47.8315 53.6183 48.1495 53.3839 48.3839C53.1495 48.6183 52.8315 48.75 52.5 48.75H50C49.6685 48.75 49.3505 48.6183 49.1161 48.3839C48.8817 48.1495 48.75 47.8315 48.75 47.5C48.75 47.1685 48.8817 46.8505 49.1161 46.6161C49.3505 46.3817 49.6685 46.25 50 46.25ZM42.5 51.25H45C45.3315 51.25 45.6495 51.3817 45.8839 51.6161C46.1183 51.8505 46.25 52.1685 46.25 52.5C46.25 52.8315 46.1183 53.1495 45.8839 53.3839C45.6495 53.6183 45.3315 53.75 45 53.75H42.5C42.1685 53.75 41.8505 53.6183 41.6161 53.3839C41.3817 53.1495 41.25 52.8315 41.25 52.5C41.25 52.1685 41.3817 51.8505 41.6161 51.6161C41.8505 51.3817 42.1685 51.25 42.5 51.25ZM50 51.25H52.5C52.8315 51.25 53.1495 51.3817 53.3839 51.6161C53.6183 51.8505 53.75 52.1685 53.75 52.5C53.75 52.8315 53.6183 53.1495 53.3839 53.3839C53.1495 53.6183 52.8315 53.75 52.5 53.75H50C49.6685 53.75 49.3505 53.6183 49.1161 53.3839C48.8817 53.1495 48.75 52.8315 48.75 52.5C48.75 52.1685 48.8817 51.8505 49.1161 51.6161C49.3505 51.3817 49.6685 51.25 50 51.25ZM41.25 35C41.25 34.6685 41.3817 34.3505 41.6161 34.1161C41.8505 33.8817 42.1685 33.75 42.5 33.75H52.5C52.8315 33.75 53.1495 33.8817 53.3839 34.1161C53.6183 34.3505 53.75 34.6685 53.75 35V37.5C53.75 37.8315 53.6183 38.1495 53.3839 38.3839C53.1495 38.6183 52.8315 38.75 52.5 38.75H42.5C42.1685 38.75 41.8505 38.6183 41.6161 38.3839C41.3817 38.1495 41.25 37.8315 41.25 37.5V35Z"
                  fill="#D9D9D9"
                />
              </svg>
            </div>
            <div className="stat-text">
              <div className="stat-label">Total estimated bills</div>
              <div className="stat-value">
                <p>
                 £{totalEstimatedBills} {" "}
                  <span
                    className="info"
                    onClick={handleInfoClick}
                    ref={infoRef}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.5 1.5C5.9087 1.5 4.38258 2.13214 3.25736 3.25736C2.13214 4.38258 1.5 5.9087 1.5 7.5C1.5 9.0913 2.13214 10.6174 3.25736 11.7426C4.38258 12.8679 5.9087 13.5 7.5 13.5C9.0913 13.5 10.6174 12.8679 11.7426 11.7426C12.8679 10.6174 13.5 9.0913 13.5 7.5C13.5 5.9087 12.8679 4.38258 11.7426 3.25736C10.6174 2.13214 9.0913 1.5 7.5 1.5ZM0 7.5C0 3.35775 3.35775 0 7.5 0C11.6423 0 15 3.35775 15 7.5C15 11.6423 11.6423 15 7.5 15C3.35775 15 0 11.6423 0 7.5Z"
                        fill="#0A2446"
                      />
                      <path
                        d="M7.5 6C7.69891 6 7.88968 6.07902 8.03033 6.21967C8.17098 6.36032 8.25 6.55109 8.25 6.75V11.25C8.25 11.4489 8.17098 11.6397 8.03033 11.7803C7.88968 11.921 7.69891 12 7.5 12C7.30109 12 7.11032 11.921 6.96967 11.7803C6.82902 11.6397 6.75 11.4489 6.75 11.25V6.75C6.75 6.55109 6.82902 6.36032 6.96967 6.21967C7.11032 6.07902 7.30109 6 7.5 6ZM8.625 4.125C8.625 4.42337 8.50647 4.70952 8.2955 4.9205C8.08452 5.13147 7.79837 5.25 7.5 5.25C7.20163 5.25 6.91548 5.13147 6.7045 4.9205C6.49353 4.70952 6.375 4.42337 6.375 4.125C6.375 3.82663 6.49353 3.54048 6.7045 3.3295C6.91548 3.11853 7.20163 3 7.5 3C7.79837 3 8.08452 3.11853 8.2955 3.3295C8.50647 3.54048 8.625 3.82663 8.625 4.125Z"
                        fill="#0A2446"
                      />
                    </svg>
                  </span>
                </p>
              </div>
            </div>
            <div
              ref={breakdownRef}
              className={`bills-breakdown ${showBreakdown ? "show" : ""}`}
            >
              <p className="breakdown-title">Monthly bills breakdown</p>
              <div className="breakdown-item">
                <p className="breakdown-label">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.5 20L16.36 10.27H13V4L8 13.73H11.5V20ZM12 2C14.75 2 17.1 3 19.05 4.95C21 6.9 22 9.25 22 12C22 14.75 21 17.1 19.05 19.05C17.1 21 14.75 22 12 22C9.25 22 6.9 21 4.95 19.05C3 17.1 2 14.75 2 12C2 9.25 3 6.9 4.95 4.95C6.9 3 9.25 2 12 2Z"
                      fill="#0A2446"
                    />
                  </svg>
                  Electricity
                </p>
                <p className="breakdown-value">{Electricity} £</p>
              </div>
              <div className="breakdown-item">
                <p className="breakdown-label">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.66 14.18C14.69 14.29 14.7 14.4 14.7 14.5C14.73 15.15 14.44 15.85 13.97 16.28C13.75 16.47 13.39 16.67 13.11 16.75C12.23 17.06 11.35 16.62 10.83 16.11C11.77 15.89 12.32 15.21 12.5 14.5C12.62 13.89 12.37 13.38 12.27 12.78C12.17 12.2 12.19 11.71 12.4 11.18C12.55 11.47 12.71 11.77 12.9 12C13.5 12.78 14.45 13.12 14.66 14.18ZM22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12ZM17.16 12.56L17.06 12.36C16.9 12 16.45 11.38 16.45 11.38C16.27 11.15 16.05 10.94 15.85 10.74C15.32 10.27 14.73 9.94 14.22 9.45C13.05 8.31 12.79 6.44 13.54 5C12.79 5.18 12.14 5.58 11.58 6.03C9.55 7.65 8.75 10.5 9.71 12.95C9.74 13.03 9.77 13.11 9.77 13.21C9.77 13.38 9.65 13.53 9.5 13.6C9.31 13.67 9.13 13.63 9 13.5C8.94499 13.4702 8.89983 13.425 8.87 13.37C8 12.26 7.84 10.66 8.43 9.39C7.12 10.45 6.41 12.24 6.5 13.92C6.56 14.31 6.6 14.7 6.74 15.09C6.85 15.56 7.06 16 7.3 16.44C8.14 17.78 9.61 18.75 11.19 18.94C12.87 19.15 14.67 18.85 15.96 17.7C17.4 16.4 17.9 14.33 17.16 12.56Z"
                      fill="#0A2446"
                    />
                  </svg>
                  Gas
                </p>
                <p className="breakdown-value">{Gas} £</p>
              </div>
              <div className="breakdown-item">
                <p className="breakdown-label">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.4275 2.81823C12.3747 2.75656 12.3092 2.70705 12.2354 2.6731C12.1617 2.63916 12.0814 2.62158 12.0002 2.62158C11.919 2.62158 11.8388 2.63916 11.7651 2.6731C11.6913 2.70705 11.6258 2.75656 11.573 2.81823C10.0889 4.55401 5.25 10.5549 5.25 15.0001C5.25 19.1424 7.85812 21.7501 12 21.7501C16.1419 21.7501 18.75 19.1424 18.75 15.0001C18.75 10.5549 13.9111 4.55401 12.4275 2.81823ZM12.75 19.3126C12.6599 19.3128 12.5711 19.2914 12.491 19.2501C12.4109 19.2088 12.3419 19.1489 12.2898 19.0754C12.2377 19.0019 12.2041 18.9169 12.1916 18.8277C12.1792 18.7385 12.1884 18.6475 12.2184 18.5626C12.2568 18.4518 12.3291 18.3559 12.4252 18.2885C12.5212 18.2212 12.636 18.1859 12.7533 18.1876C13.4978 18.186 14.2114 17.8895 14.7379 17.363C15.2644 16.8365 15.5609 16.1229 15.5625 15.3784C15.5608 15.2611 15.5961 15.1463 15.6634 15.0503C15.7308 14.9542 15.8267 14.8819 15.9375 14.8435C16.0224 14.8135 16.1134 14.8043 16.2026 14.8167C16.2918 14.8292 16.3768 14.8628 16.4503 14.9149C16.5238 14.967 16.5837 15.036 16.625 15.1161C16.6663 15.1962 16.6877 15.285 16.6875 15.3751C16.6864 16.419 16.2712 17.4199 15.533 18.1581C14.7948 18.8963 13.7939 19.3115 12.75 19.3126Z"
                      fill="#0A2446"
                    />
                  </svg>
                  Water
                </p>
                <p className="breakdown-value">{Water} £</p>
              </div>
              <div className="breakdown-item">
                <p className="breakdown-label">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.36 14C16.44 13.34 16.5 12.68 16.5 12C16.5 11.32 16.44 10.66 16.36 10H19.74C19.9 10.64 20 11.31 20 12C20 12.69 19.9 13.36 19.74 14M14.59 19.56C15.19 18.45 15.65 17.25 15.97 16H18.92C17.9512 17.6683 16.4141 18.932 14.59 19.56ZM14.34 14H9.66C9.56 13.34 9.5 12.68 9.5 12C9.5 11.32 9.56 10.65 9.66 10H14.34C14.43 10.65 14.5 11.32 14.5 12C14.5 12.68 14.43 13.34 14.34 14ZM12 19.96C11.17 18.76 10.5 17.43 10.09 16H13.91C13.5 17.43 12.83 18.76 12 19.96ZM8 8H5.08C6.03886 6.32721 7.5748 5.06149 9.4 4.44C8.8 5.55 8.35 6.75 8 8ZM5.08 16H8C8.35 17.25 8.8 18.45 9.4 19.56C7.57862 18.9317 6.04485 17.6677 5.08 16ZM4.26 14C4.1 13.36 4 12.69 4 12C4 11.31 4.1 10.64 4.26 10H7.64C7.56 10.66 7.5 11.32 7.5 12C7.5 12.68 7.56 13.34 7.64 14M12 4.03C12.83 5.23 13.5 6.57 13.91 8H10.09C10.5 6.57 11.17 5.23 12 4.03ZM18.92 8H15.97C15.657 6.76146 15.1936 5.5659 14.59 4.44C16.43 5.07 17.96 6.34 18.92 8ZM12 2C6.47 2 2 6.5 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2Z"
                      fill="#0A2446"
                    />
                  </svg>
                  Internet
                </p>
                <p className="breakdown-value">{internet} £</p>
              </div>
              <p className="breakdown-text">
                Per whole household, based on 2 reviews{" "}
              </p>
            </div>
          </div>
          <div className="stat-item">
            <div className="class-icon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M28 21V16M20 21V16M24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44Z"
                  stroke="#D9D9D9"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M24 32C26.1217 32 28.1566 31.1571 29.6569 29.6569C31.1571 28.1566 32 26.1217 32 24V21H16V24C16 26.1217 16.8429 28.1566 18.3431 29.6569C19.8434 31.1571 21.8783 32 24 32ZM24 32V44"
                  stroke="#D9D9D9"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="stat-text">
              <div className="stat-label">EPC rating</div>
              <div className="stat-value">
                <p>
                  { selectedProperty["current-energy-rating"] ? selectedProperty["current-energy-rating"] + `(${selectedProperty["current-energy-efficiency"]})` : "Unknown" }
                  <span className="info" onClick={toggleSummary} ref={infoRef}>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.5 1.5C5.9087 1.5 4.38258 2.13214 3.25736 3.25736C2.13214 4.38258 1.5 5.9087 1.5 7.5C1.5 9.0913 2.13214 10.6174 3.25736 11.7426C4.38258 12.8679 5.9087 13.5 7.5 13.5C9.0913 13.5 10.6174 12.8679 11.7426 11.7426C12.8679 10.6174 13.5 9.0913 13.5 7.5C13.5 5.9087 12.8679 4.38258 11.7426 3.25736C10.6174 2.13214 9.0913 1.5 7.5 1.5ZM0 7.5C0 3.35775 3.35775 0 7.5 0C11.6423 0 15 3.35775 15 7.5C15 11.6423 11.6423 15 7.5 15C3.35775 15 0 11.6423 0 7.5Z"
                        fill="#ef6c67"
                      />
                      <path
                        d="M7.5 6C7.69891 6 7.88968 6.07902 8.03033 6.21967C8.17098 6.36032 8.25 6.55109 8.25 6.75V11.25C8.25 11.4489 8.17098 11.6397 8.03033 11.7803C7.88968 11.921 7.69891 12 7.5 12C7.30109 12 7.11032 11.921 6.96967 11.7803C6.82902 11.6397 6.75 11.4489 6.75 11.25V6.75C6.75 6.55109 6.82902 6.36032 6.96967 6.21967C7.11032 6.07902 7.30109 6 7.5 6ZM8.625 4.125C8.625 4.42337 8.50647 4.70952 8.2955 4.9205C8.08452 5.13147 7.79837 5.25 7.5 5.25C7.20163 5.25 6.91548 5.13147 6.7045 4.9205C6.49353 4.70952 6.375 4.42337 6.375 4.125C6.375 3.82663 6.49353 3.54048 6.7045 3.3295C6.91548 3.11853 7.20163 3 7.5 3C7.79837 3 8.08452 3.11853 8.2955 3.3295C8.50647 3.54048 8.625 3.82663 8.625 4.125Z"
                        fill="#ef6c67"
                      />
                    </svg>
                  </span>
                </p>
              </div>
            </div>
            <div className={`epc-summary ${isSummaryVisible ? "show" : ""}`}>
              <p className="summary-text">Heats up very economically</p>
            </div>
          </div>
        </div>
      </div>
        <button className="write-review" onClick={handleWriteReviewClick}>Write a review for this property</button>
    </div>
  );
};

export default PropertyDetails;
