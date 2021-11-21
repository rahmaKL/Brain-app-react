import React from "react";
import './faceRecognition.css';
const FaceRecognition = ({ imgUrl, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2 ">
        <img id="inputImage" src={imgUrl} width="500px" heigh="auto" alt="" />
    <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
      </div>
    </div>
  );
};
export default FaceRecognition;
