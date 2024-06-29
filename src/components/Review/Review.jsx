import React from 'react'
import './Review.css'
import next from "../../assets/next-icon.png";
import back from "../../assets/back-icon.png";
import user_1 from "../../assets/user-1.png";
import user_2 from "../../assets/user-2.png";
import user_3 from "../../assets/user-3.png";
import user_4 from "../../assets/user-4.png";
import { useRef } from "react";


const Review = () => {

    const slider = useRef()
      let tx=0
     
    const slideForward =()=>{
        if(tx>-50){
            tx-=25
        }
        slider.current.style.transform=`translateX(${tx}%)`

    }

    const slideBackward =()=>{
        if(tx<0){
            tx+=25
        }
        slider.current.style.transform=`translateX(${tx}%)` 


        
    }

  return (
    <div className='review'>
        <img src={next} alt="" className="next-btn"  onClick={slideForward}/>
      <img src={back} alt="" className="back-btn" onClick={slideBackward} />
      <div className="slider">
        <ul ref={slider}>
          <li>
            <div className="slide">
              <div className="user-info">
                <img src={user_1} alt="" />
                <div>
                  <h3>Rajeepan</h3>
                  <span>Jaffna, Sri Lanka</span>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                modi doloremque mollitia corporis adipisci quia, tenetur culpa
                tempora similique at fugit magni ducimus voluptatibus voluptates
                obcaecati ab quos qui nostrum incidunt minima et eius alias!
              </p>
            </div>
          </li>

          <li>
            <div className="slide">
              <div className="user-info">
                <img src={user_2} alt="" />
                <div>
                  <h3>Thanujan</h3>
                  <span>Jaffna, Sri Lanka</span>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                modi doloremque mollitia corporis adipisci quia, tenetur culpa
                tempora similique at fugit magni ducimus voluptatibus voluptates
                obcaecati ab quos qui nostrum incidunt minima et eius alias!
              </p>
            </div>
          </li>

          <li>
            <div className="slide">
              <div className="user-info">
                <img src={user_3} alt="" />
                <div>
                  <h3>Ainkaran</h3>
                  <span>Jaffna, Sri Lanka</span>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                modi doloremque mollitia corporis adipisci quia, tenetur culpa
                tempora similique at fugit magni ducimus voluptatibus voluptates
                obcaecati ab quos qui nostrum incidunt minima et eius alias!
              </p>
            </div>
          </li>

          <li>
            <div className="slide">
              <div className="user-info">
                <img src={user_4} alt="" />
                <div>
                  <h3>Manula</h3>
                  <span>Jaffna, Sri Lanka</span>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                modi doloremque mollitia corporis adipisci quia, tenetur culpa
                tempora similique at fugit magni ducimus voluptatibus voluptates
                obcaecati ab quos qui nostrum incidunt minima et eius alias!
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Review