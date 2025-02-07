import { useSearchParams } from "react-router";

const Blogs = () => {
  const [searchParams] = useSearchParams();
  // console.log(searchParams.get('value'));
  // console.log(searchParams.get('a'));
  // console.log(searchParams.get('b'));
  return <h1>Blog Articles</h1>;
};

export default Blogs;
