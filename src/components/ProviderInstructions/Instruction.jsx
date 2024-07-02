import React, { useState } from "react";
import "./Instruction.css";
import ProviderRegistration from "../ProviderRegistration/ProviderRegistration";

const Instruction = ({ closeInstruct }) => {
  const [registration, setRegistration] = useState(false);

  return (
    <>
      <div className="instructions">
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
              <input type="checkbox" name="" id="" /> I agree the terms of
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
              onClick={() => {
                setRegistration(true);
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {registration && <ProviderRegistration comback={setRegistration} />}
    </>
  );
};

export default Instruction;
