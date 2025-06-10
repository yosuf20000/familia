import React, { useState, useEffect } from "react";

const subText = 'انشئ مجموعتك الان'

const TypingEffect = ({ text = subText, speed = 100, pauseBeforeDelete = 300 }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [doneTyping, setDoneTyping] = useState(false);
  
    useEffect(() => {
      let timeout;
  
      if (!isDeleting && index < text.length) {
        // Typing forward
        timeout = setTimeout(() => {
          setDisplayedText(prev => prev + text.charAt(index));
          setIndex(index + 1);
        }, speed);
      } else if (!isDeleting && index === text.length && !doneTyping) {
        // Finished typing, wait before deleting
        setDoneTyping(true);
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseBeforeDelete);
      } else if (isDeleting && index > 0) {
        // Deleting text
        timeout = setTimeout(() => {
          setDisplayedText(text.slice(0, index - 1));
          setIndex(index - 1);
        }, speed / 2);
      }
  
      return () => clearTimeout(timeout);
    }, [index, isDeleting, text, speed, pauseBeforeDelete, doneTyping]);
  
    return (
      <p className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
        {displayedText}
        {(index < text.length || isDeleting) && <span className="border-r-2 border-white animate-pulse ml-0.5" />}
      </p>
    );
  };
  
  export default TypingEffect;