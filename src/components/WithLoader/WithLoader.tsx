import React from "react";

import { LoaderSize } from "@components/Loader/Loader";

import Loader from "../Loader";

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
  className?: string;
}>;

const WithLoader: React.FC<WithLoaderProps> = ({
  loading,
  children,
  className,
}) => {
  return (
    <>
      {loading ? (
        <Loader className={className} size={LoaderSize.l} />
      ) : (
        children
      )}
    </>
  );
};

export default WithLoader;
