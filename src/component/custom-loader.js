import React from "react";
import { Loader, Title } from "rizzui";

function CustomLoader({showLoadingText = true}) {
  return (
    <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
      <Loader variant="spinner" size="xl" />
      {showLoadingText ? (
        <Title as="h6" className="-ml-2 mt-4 font-medium text-gray-500">
          Loading...
        </Title>
      ) : null}
    </div>
  );
}

export default CustomLoader;
