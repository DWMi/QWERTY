import s from "../styles/contact.module.css";
import { Abel } from "@next/font/google";
const fontStyle = Abel({ weight: "400", subnets: ["sans-serif"] });

const contact = () => {
  return (
    <div className={s.container}>
      <div className={`${s.contactCon} ${fontStyle.className}`}>
        <h1 style={{ fontSize: "40px" }}> Contact Us</h1>
        <div className={s.formCon}>
          <input
            className={s.contactInput}
            type="text"
            placeholder="First Name*"
            required
          />
          <input
            className={s.contactInput}
            type="text"
            placeholder="Last Name*"
            required
          />
          <input
            className={s.contactInput}
            type="email"
            placeholder="Email"
            required
          />
          <input
            className={s.contactInput}
            type="tel"
            placeholder="Phone Number*"
            required
          />
          <textarea
            className={s.contactInputText}
            placeholder="Write your message here*"
            type="text"
            required
          />
          <button className={s.submitBtn} type="submit">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default contact;
