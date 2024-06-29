import React, { useState } from "react";
import "./Instruction.css";
import ProviderRegistration from "../ProviderRegistration/ProviderRegistration";

const Instruction = ({closeInstruct}) => {

       const [registration,setRegistration]  = useState(false);
     
  return (
    <>
      <div className="login">
        <div className="instruction-container">
          <div>
            <h3>Service Provider Instructions</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              voluptatem veritatis similique, eligendi ea explicabo saepe eaque
              tempora nihil! Qui nemo similique perferendis commodi autem
              expedita, ducimus quaerat magnam provident dolorem alias ratione
              et facere maiores facilis quia laborum suscipit temporibus. Ipsam
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              voluptatem veritatis similique, eligendi ea explicabo saepe eaque
              tempora nihil! Qui nemo similique perferendis commodi autem
              expedita, ducimus quaerat magnam provident dolorem alias ratione
              tempora nihil! Qui nemo similique perferendis commodi autem
              expedita, ducimus quaerat magnam provident dolorem alias ratione
            
            </p>
             <h6><input type="checkbox" name="" id="" /> I agree the terms of conditions.</h6>
          </div>

          <div className="button-div">
          <button className="button" onClick={()=>{
            closeInstruct(false);
          }}>Back</button>
            <button className="button" onClick={()=>{
                setRegistration(true);
            }}>Next</button>

          </div>
        </div>
      </div>
      {
        registration && (
            <ProviderRegistration comback={setRegistration}/>
        )
      }
    </>
  );
};

export default Instruction;
