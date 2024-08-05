import React, { useState } from "react";
import "./Instruction.css";
import ProviderRegistration from "../ProviderRegistration/ProviderRegistration";
import inst_img from '../../assets/inst.jpg'

const Instruction = ({ closeInstruct, providerData }) => {
  const [finalRegis, setFinalRegis] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <div className="instructions">
        <div className="inst">
        <div className="inst-img">
          <img src={inst_img} alt="" />

        </div>
        <div className="instruction-container">

          <div>
            <h3>Service Provider Instructions</h3>
            <p>
              Welcome to QuickMatch! Please adhere to these guidelines for a
              seamless experience: Do not share your mobile number with
              customers; all interactions must be conducted through the
              application. You should submit a pdf consists of proofs for ensure
              you are a provider. You can login after you are verified. Even
              with repeat customers, ensure all communications are within the
              platform, as direct connections outside the app are strictly
              prohibited. Use email only if necessary to contact customers. If
              you are unable to attend to a customer, decline their request
              within two weeks of the booking date. Following these instructions
              helps maintain the integrity and reliability of our platform.
              Thank you for your cooperation and professionalism.
            </p>
            <h6>
              <input type="checkbox" name="terms" id="terms" onChange={handleCheckboxChange} /> I agree to the terms and
              conditions.
            </h6>
          </div>

          <div className="button-div">
            <button
              className="button"
              onClick={() => {
                closeInstruct(false);
              }}
            >
              Back
            </button>
            <button
              className="button"
              disabled={!isChecked}
              onClick={() => {
                setFinalRegis(true);
              }}
            >
              Next
            </button>
          </div>
        </div>
        </div>
      </div>
      {finalRegis && <ProviderRegistration providerData={providerData} openFinalReg={setFinalRegis} />}
    </>
  );
};

export default Instruction;
