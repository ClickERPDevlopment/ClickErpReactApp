import { useSearchParams } from "react-router";
import React from "react";

const Blogs = () => {
  const [searchParams] = useSearchParams();
  // console.log(searchParams.get('value'));
  // console.log(searchParams.get('a'));
  // console.log(searchParams.get('b'));
  return <h1>Blog Articles</h1>;
};

export default Blogs;
