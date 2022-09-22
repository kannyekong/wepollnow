import React from "react";
import { useState, useEffect } from "react";
import { Item3, Item4 } from "../../Components/Layout/Landing/item";
import Nav from "../../Components/Layout/Landing/mainNav";

const GettingStartedThree = () => {
  const [isLoaded, setIsLoading] = useState(false);

  const loading = Item3;
  const hasLoaded = Item4;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(true), 5000);
    return () => clearTimeout(timer);
  });

  return (
    <>
      <Nav />
      <div className="">{isLoaded ? hasLoaded : loading}</div>
    </>
  );
};

export default GettingStartedThree;
