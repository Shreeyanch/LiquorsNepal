import type { NextPage } from "next";
import Form from "../components/form";
import styles from "./index.module.css";

const DemoForm: NextPage = () => {
  return (
    <div className={styles.demoForm1}>
      <div className={styles.shareYourTravelsFormParent}>
        <div className={styles.shareYourTravelsForm}>
          <div className={styles.formHeader}>
            <div className={styles.welcomeToLiquors}>
              Welcome to Nepal Liquors Pvt. Ltd.
            </div>
            <div className={styles.newcallout}>
              <div className={styles.newcalloutChild} />
              <div className={styles.newcalloutItem} />
              <img className={styles.vectorIcon} alt="" src="/vector.svg" />
              <div className={styles.completeTheFormContainer}>
                <span>
                Please take a moment to complete this form, follow us on Instagram, and leave us a review.
                </span>
              </div>
            </div>
          </div>
          <Form />
        </div>
        <img
          className={styles.dRenderingIsometricFdgdf1Icon}
          alt=""
          src="/1.png"
        />
      </div>
      <div className={styles.demoForm1Inner}>
        <div className={styles.poweredByParent}>
          <div className={styles.poweredBy}>powered by</div>
          <img
            className={styles.letterLogo2}
            alt=""
            src="/letter-logo-2@2x.png"
          />
        </div>
      </div>
    </div>
  );
};

export default DemoForm;
