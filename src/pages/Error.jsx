import React from "react";

export default function Error() {
  return (
    <div className="h-screen w-screen max-h-screen min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl">404</h1>
      <p className="text-xl">Could not fetch resource.</p>
    </div>
  );
}
