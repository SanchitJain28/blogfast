import React, { Suspense } from "react";
import OnBoardingClient from "./onBoardingClient";

export default function page() {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <OnBoardingClient />
    </Suspense>
  );
}
