import React, {useState, useEffect} from 'react'; 

const Info = ({parcelInfo}) => {

  if (!parcelInfo) {
    return <div>No parcel info</div>;
  }

  return (
    <div>
      <h2>Parcel Information</h2>
      <p><strong>Full Address:</strong> {parcelInfo.SITEADDRESS}</p>
      <p><strong>Owner:</strong> {parcelInfo.OWNERNME1}</p>
      <p><strong>Dimensions:</strong> {parcelInfo.ASS_DIMS}</p>
      <p><strong>Area:</strong> {parcelInfo.ASS_SQFT}</p>
      <p><strong>Description:</strong> {parcelInfo.PRPRTYDSCRP}</p>
    </div>
  );

}

export default Info;