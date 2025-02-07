import React from "react";
import { useSearchParams } from "react-router";

interface params {
  a: string;
  b: string;
  c: number;
}

export default function TsReport() {
  const [searchParams, setSearchParams] = useSearchParams();

  // console.log(searchParams.get('a'));
  // console.log(searchParams.get('b'));
  // console.log(searchParams.get('c'));

  return (
    <>
      <h1 className="text-center my-20">this is tyscript report page</h1>
    </>
  );
}
