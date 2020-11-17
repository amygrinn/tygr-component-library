import { Email, Github, Twitter } from '@tygr/contact';
import React from 'react';

export default function Contact() {
  return (
    <div className="tygr-contact-container">
      <Github />
      <Email />
      <Twitter />
    </div>
  );
}
