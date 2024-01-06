import React from 'react';
import { useLayoutEffect } from 'react';
import Lottie from 'react-lottie';
import './About.css';
import './Intro.css';
import animation from '../../assets/img/animation.gif';

import {
  GithubIcon,
  GithubIconLink,
  StackoverflowIcon,
  StackoverflowIconLink,
} from './About.styled';

import animationData from '../../assets/img/animation.json';

const About = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  useLayoutEffect(() => {
    let intro = document.querySelector('.intro');
    // let logo = document.querySelector('.logo-header');
    let logoSpan = document.querySelectorAll('.logo');

    setTimeout(() => {
      logoSpan.forEach((span, idx) => {
        setTimeout(() => {
          span.classList.add('active');
        }, (idx + 1) * 400);
      });

      setTimeout(() => {
        logoSpan.forEach((span, idx) => {
          setTimeout(() => {
            span.classList.remove('active');
            span.classList.add('fade');
          }, (idx + 1) * 50);
        });
      }, 2000);

      setTimeout(() => {
        intro.style.top = '-100vh';
      }, 2300);
    }, 0); // Выполнить код после рендера компонента
  }, []);
  return (
    <div className="about-container">
      <div className="intro">
        <h1 className="logo-header">
          <span className="logo">👋 Thanks </span>{' '}
          <span className="logo"> for installing</span>
        </h1>
      </div>
      <div className="about-content">
        <h2 className="about-title">About Stackoverflow Copypaster</h2>
        <p className="about-text">
          This application is designed to help you efficiently save code
          snippets, titles, and links from Stack Overflow directly to your
          Google Sheets.
        </p>
        <h3 className="about-features-title">Main Features:</h3>
        <ul className="about-features-list">
          <li className="about-features-item">
            Save Code: Easily store valuable code snippets found on Stack
            Overflow.
          </li>
          <li className="about-features-item">
            Titles and Links: Save not only code but also titles and links for
            quick reference.
          </li>
        </ul>
        <h3 className="about-features-title">Ease of Use:</h3>
        <ul className="about-features-list">
          <li className="about-features-item">
            Google Sheets Integration: Effortlessly save information to your
            Google Sheets with minimal effort.
          </li>
          <li className="about-features-item">
            Intuitive Interface: A simple and clear interface makes using the
            application easy and enjoyable.
          </li>
        </ul>
        <h3 className="about-features-title">Security and Confidentiality:</h3>
        <ul className="about-features-list">
          <li className="about-features-item">
            Your Code, Your Property: All your saved data remains exclusively
            yours.
          </li>
          <li className="about-features-item">
            Data Security: The application ensures the security of your saved
            data and access to it.
          </li>
        </ul>
        <GithubIconLink
          href="https://github.com/Solod-S/google_extension_overflowcopypaster"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon size="3.2rem" />
        </GithubIconLink>
        <StackoverflowIconLink
          href="https://stackoverflow.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StackoverflowIcon size="3.2rem" />
        </StackoverflowIconLink>
      </div>
      <div className="animation-container">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
      <div className="about-animation">
        <img
          src={animation}
          alt="how to instal animation"
          width="100%"
          className="about-animation-item"
        />
      </div>
    </div>
  );
};

export default About;
