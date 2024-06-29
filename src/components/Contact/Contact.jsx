import React from 'react'
import './Contact.css'
import msg_icon from '../../assets/msg-icon.png'
import mail from '../../assets/mail-icon.png'
import phone from '../../assets/phone-icon.png'
import address from '../../assets/location-icon.png'
import arrow from '../../assets/white-arrow.png'

const Contact = () => {

    const [result, setResult] = React.useState("");

    const onSubmit = async (event) => {
      event.preventDefault();
      setResult("Sending....");
      const formData = new FormData(event.target);
  
      formData.append("access_key", "82fae4db-eb30-4b1f-ae46-84ffeb2a6c18");
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
  
      const data = await response.json();
  
      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    }
  return (
    <div className="contact">
      <div className="contact-col">
        <h3>Send us a message <img src={msg_icon} alt="" /></h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam
          quis obcaecati, omnis, in earum recusandae maxime deserunt nulla
          consequuntur possimus dolores aut, excepturi qui. Rem, reiciendis
          culpa molestiae aspernatur eveniet quis, assumenda pariatur obcaecati
          eaque dolores fugit hic possimus odit accusamus ratione quibusdam.
          Perspiciatis omnis ad sapiente, unde ullam excepturi.
        </p>
        <ul>
          <li><img src={mail} alt="" />cst21020@gmail.com</li>
          <li><img src={phone} alt="" />+77 8337 669</li>
          <li><img src={address} alt="" />
            Courts Road, Mallakam <br />
            Jaffna <br />
            Sri Lanka
          </li>
        </ul>
      </div>
      <div className="contact-col">
        <form onSubmit={onSubmit}>
            <label>Your Name</label>
            <input type="text" name='name' placeholder='Enter Your Name ' required />
            <label htmlFor="">Phone Number</label>
            <input type="tel"  name='phone' placeholder='Enter Phone Number' required/>
            <label htmlFor="">Write Your Message Here</label>
            <textarea name="message" rows='6' placeholder='Enter Your Message' required></textarea>
            <button type='submit' className='btn dark-btn'>Submit Now <img src={arrow} alt="" /></button>
        </form>
        <span>{result}</span>
      </div>
    </div>
  )
}

export default Contact