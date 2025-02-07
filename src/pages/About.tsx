import React from "react";
import { useSearchParams } from "react-router";

const About = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams.get('value'));
  // console.log(searchParams.get('a'));
  // console.log(searchParams.get('b'));
  return <h1>About Page</h1>;
};

export default About;
