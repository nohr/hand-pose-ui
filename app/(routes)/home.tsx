"use client";

import { Section } from "../(ui)/Section";
// import Trigger from "../(ml)/Trigger";

export function Home() {
  return (
    <Section id="home">
      <p className=" w-60">
        welcome to my hand pose controlled user interface! <br />
        <br />
        to navigate, reach out in front of you and slowly swipe the air in any
        direction; as if you were scrolling a page. <br />
      </p>
      {/* <Trigger /> */}
    </Section>
  );
}
