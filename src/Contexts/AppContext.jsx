import React, { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const MyContext = createContext();
const cookies = new Cookies();

const AppProvider = ({ children }) => {
  const storedUserData = cookies.get('user');

  const [mode, setMode] = useState('light');
  const [reviewLocateId, setReviewLocateId] = useState(storedUserData && storedUserData.review_locate_id ? storedUserData.review_locate_id : null);
  const [userId, setUserId] = useState(storedUserData && storedUserData.userId ? storedUserData.userId : null);
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [townCity, setTownCity] = useState('');
  const [country, setCountry] = useState('');
  const [postCode, setPostCode] = useState('');
  const [moveInDate, setMoveInDate] = useState('');
  const [tenancyPeriod, setTenancyPeriod] = useState({"number":"1","period":"month"});
  const [isItSharingFlat, setIsItSharingFlat] = useState(false);
  const [peopleNumberLivingAtHome, setPeopleNumberLivingAtHome] = useState(0);
  const [futureRentersContactMe, setFutureRentersContactMe] = useState(true);
  const [rentAmount, setRentAmount] = useState(0.0);
  const [rentPeriod, setRentPeriod] = useState('per-month');
  const [rentDuration, setRentDuration] = useState(0);
  const [isBillsIncluded, setIsBillsIncluded] = useState(false);
  const [billsPerPerson, setBillsPerPerson] = useState(false);
  const [billsWholeHouse, setBillsWholeHouse] = useState(false);
  const [electricBill, setElectricBill] = useState('');
  const [waterBill, setWaterBill] = useState('');
  const [gasBill, setGasBill] = useState('');
  const [internetBill, setInternetBill] = useState('');
  const [reviewScore, setReviewScore] = useState(0);
  const [reviewHeadline, setReviewHeadline] = useState('');
  const [reviewPros, setReviewPros] = useState('');
  const [reviewCons, setReviewCons] = useState('');
  const [heatUpLevel, setHeatUpLevel] = useState(0);
  const [wellLitLevel, setWellLitLevel] = useState(0);
  const [internetConnectionLevel, setInternetConnectionLevel] = useState(0);
  const [isItPetFriendly, setIsItPetFriendly] = useState(false);
  const [anythingToBeFixed, setAnythingToBeFixed] = useState('');
  const [ownerRespondScore, setOwnerRespondScore] = useState(0);
  const [healthConcerns, setHealthConcerns] = useState('');
  const [perceptionNeighborsLevel, setPerceptionNeighborsLevel] = useState(0);
  const [noiseNeighborsLevel, setNoiseNeighborsLevel] = useState(0);
  const [parkingScore, setParkingScore] = useState(0);
  const [trafficScore, setTrafficScore] = useState(0);
  const [safetyConcerns, setSafetyConcerns] = useState('');
  const [agreeCheckbox, setAgreeCheckbox] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    cookies.set('user', { userId, mode, addressLine1, addressLine2, townCity, country, postCode, moveInDate, tenancyPeriod, isItSharingFlat, peopleNumberLivingAtHome, futureRentersContactMe, rentAmount, rentPeriod, rentDuration, isBillsIncluded, billsPerPerson, billsWholeHouse, electricBill, waterBill, gasBill, internetBill, reviewScore, reviewHeadline, reviewPros, reviewCons, heatUpLevel, wellLitLevel, internetConnectionLevel, isItPetFriendly, anythingToBeFixed, ownerRespondScore, healthConcerns, perceptionNeighborsLevel, noiseNeighborsLevel, parkingScore, trafficScore, safetyConcerns, agreeCheckbox, reviewLocateId }, { path: '/' });
  }, [userId, mode, addressLine1, addressLine2, townCity, country, postCode, moveInDate, tenancyPeriod, isItSharingFlat, peopleNumberLivingAtHome, futureRentersContactMe, rentAmount, rentPeriod, rentDuration, isBillsIncluded, billsPerPerson, billsWholeHouse, electricBill, waterBill, gasBill, internetBill, reviewScore, reviewHeadline, reviewPros, reviewCons, heatUpLevel, wellLitLevel, internetConnectionLevel, isItPetFriendly, anythingToBeFixed, ownerRespondScore, healthConcerns, perceptionNeighborsLevel, noiseNeighborsLevel, parkingScore, trafficScore, safetyConcerns, agreeCheckbox, reviewLocateId]);


  const sendReview = async() => {
    //console.log('sendReview');
    try {
      const response = await axios.post(`${serverUrl}/review/addReview`, {
        user_id: userId,
        address_line_1: addressLine1,
        address_line_2: addressLine2,
        town_city: townCity,
        country: country,
        post_code: postCode,
        move_in_date: moveInDate,
        tenancy_period: tenancyPeriod,
        is_it_sharing_flat: isItSharingFlat,
        people_number_leaving_at_home: peopleNumberLivingAtHome,
        future_renters_contact_me: futureRentersContactMe,
        rent_amount: rentAmount,
        rent_period: rentPeriod,
        rent_duration: rentDuration,
        is_bills_included: isBillsIncluded,
        bills_per_person: billsPerPerson,
        bills_whole_house: billsWholeHouse,
        electric_bill: electricBill,
        water_bill: waterBill,
        gas_bill: gasBill,
        internet_bill: internetBill,
        review_score: reviewScore,
        review_headline: reviewHeadline,
        review_pros: reviewPros,
        review_cons: reviewCons,
        heat_up_level: heatUpLevel,
        well_lit_level: wellLitLevel,
        internet_connection_level: internetConnectionLevel,
        is_it_pet_friendly: isItPetFriendly,
        anything_to_be_fixed: anythingToBeFixed,
        owner_respond_score: ownerRespondScore,
        health_concerns: healthConcerns,
        perception_neighbors_level: perceptionNeighborsLevel,
        noise_neighbors_level: noiseNeighborsLevel,
        parking_score: parkingScore,
        traffic_score: trafficScore,
        safety_concerns: safetyConcerns,
        agree_checkbox: agreeCheckbox,
        review_locate_id: reviewLocateId
      });

      return response.data; // Return true if the request is successful
    } catch (error) {
      console.log(error);
      return false; // Return false if there's an error
    }
  }

  return (
    <MyContext.Provider
      value={{openLoginModal, setOpenLoginModal, openRegisterModal, setOpenRegisterModal,
        sendReview, mode, setMode, userId, setUserId,serverUrl,
        reviewLocateId, setReviewLocateId,
        addressLine1, setAddressLine1, addressLine2, setAddressLine2, townCity, setTownCity, country, setCountry, postCode, setPostCode,
        moveInDate, setMoveInDate, tenancyPeriod, setTenancyPeriod, isItSharingFlat, setIsItSharingFlat, peopleNumberLivingAtHome, setPeopleNumberLivingAtHome, futureRentersContactMe, setFutureRentersContactMe,
        rentAmount, setRentAmount, rentPeriod, setRentPeriod, rentDuration, setRentDuration, isBillsIncluded, setIsBillsIncluded, billsPerPerson, setBillsPerPerson, billsWholeHouse, setBillsWholeHouse, electricBill, setElectricBill, waterBill, setWaterBill, gasBill, setGasBill, internetBill, setInternetBill,
        reviewScore, setReviewScore, reviewHeadline, setReviewHeadline, reviewPros, setReviewPros, reviewCons, setReviewCons,
        heatUpLevel, setHeatUpLevel, wellLitLevel, setWellLitLevel, internetConnectionLevel, setInternetConnectionLevel, isItPetFriendly, setIsItPetFriendly, anythingToBeFixed, setAnythingToBeFixed, ownerRespondScore, setOwnerRespondScore, healthConcerns, setHealthConcerns,
        perceptionNeighborsLevel, setPerceptionNeighborsLevel, noiseNeighborsLevel, setNoiseNeighborsLevel, parkingScore, setParkingScore, trafficScore, setTrafficScore, safetyConcerns, setSafetyConcerns, agreeCheckbox, setAgreeCheckbox}}

    >
      {children}
    </MyContext.Provider>
  );
};

const useAppProvider = () => {
  return useContext(MyContext);
};

export { useAppProvider, AppProvider };
