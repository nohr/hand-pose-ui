"use client";

// import useInView from "./useInView";

export function Section(props: JSX.IntrinsicElements["div"]) {
  const { children } = props;
  // useInView(`/${props?.id}`);
  return (
    <div className=" w-screen border-4 border-red-500 p-2" {...props}>
      {children}
    </div>
  );
}
