import React, { useState, useCallback, FormEvent } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import styles from "./form.module.css";
import { NextPage } from "next";

export type FormType = {
  className?: string;
};

const Form: NextPage<FormType> = () => {
  const [Name, setName] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [DOB, setDOB] = useState('');
  const [Email, setEmail] = useState('');
  const [instagramLoading, setInstagramLoading] = useState(false);
  const [instagramVerified, setInstagramVerified] = useState(false);
  const [instagram1Loading, setInstagram1Loading] = useState(false);
  const [instagram1Verified, setInstagram1Verified] = useState(false);

  const onSSOLoginClick = useCallback(async () => {
    setInstagramLoading(true);
    window.open("https://www.instagram.com/signaturenepal/");
    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 4000)); // Set to 7 seconds
    setInstagramLoading(false);
    setInstagramVerified(true);
  }, []);

  const onSSOLoginClick1 = useCallback(async () => {
    setInstagram1Loading(true);
    window.open("https://www.instagram.com/smirnoff.nepal/");
    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 4000)); // Set to 7 seconds
    setInstagram1Loading(false);
    setInstagram1Verified(true);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!instagramVerified) {
      alert("Please complete all steps before submitting.");
      return;
    }

    const form = {
      Name,
      PhoneNumber,
      DOB,
      Email,
    };

    // submit via api
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    const content = await response.json();
    alert("Your review has been submitted.");

    setName('');
    setPhoneNumber('');
    setDOB('');
    setEmail('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formFields}>
        <div className={styles.nameInput}>
          <TextField
            className={styles.input}
            color="primary"
            name="Name"
            id="Name"
            label="Name"
            required
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={Name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className={styles.nameInput}>
          <TextField
            className={styles.input}
            color="primary"
            name="PhoneNumber"
            label=" 10 Digit Phone Number"
            id="PhoneNumber"
            InputLabelProps={{ shrink: true }}
            required
            variant="outlined"
            value={PhoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className={styles.nameInput}>
        <TextField
            className={styles.input}
            color="primary"
            name="DOB"
            id="DOB"
            label="Date of Birth (YYYY-MM-DD)"
            required
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={DOB}
            onChange={e => setDOB(e.target.value)}
          />
        </div>
        <div className={styles.nameInput}>
          <TextField
            className={styles.input}
            color="primary"
            name="Email"
            id="Email"
            label="Email"
            type="email"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={Email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
      </div>

      <Button
        className={`${styles.instagram1} ${instagramVerified ? styles.green : ''}`}
        onClick={onSSOLoginClick}
        disabled={instagramLoading || instagramVerified}
      >
        <img className={styles.ssoIcon} alt="" src="/sso-icon@2x.png" />
        <div className={styles.label}>Follow @signaturenepal</div>
        {instagramLoading ? <CircularProgress size={20} color="inherit" className={styles.circularProgress} /> : instagramVerified ? <img className={styles.checkedIcon} alt="Verified" src="/checked-icon.svg" /> : null}
      </Button>

      <Button
        className={`${styles.instagram1} ${instagram1Verified ? styles.green : ''}`}
        onClick={onSSOLoginClick1}
        disabled={instagram1Loading || instagram1Verified}
      >
        <img className={styles.ssoIcon} alt="" src="/sso-icon@2x.png" />
        <div className={styles.label}>Follow @smirnoff.nepal</div>
        {instagram1Loading ? <CircularProgress size={20} color="inherit" className={styles.circularProgress} /> : instagram1Verified ? <img className={styles.checkedIcon} alt="Verified" src="/checked-icon.svg" /> : null}
      </Button>
      
      <Button className={styles.formSubmitButton} type="submit">
        <div className={styles.submit}>Submit</div>
      </Button>
    </form>
  );
};

export default Form;
