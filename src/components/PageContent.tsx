import classNames from "classnames";
import React, { HTMLAttributes } from "react";

type PageContentProps = React.PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export default function PageContent({
  children,
  className,
  ...props
}: PageContentProps) {
  return (
    <article
      className={classNames(
        "bg-white mb-10 border-blue-700 border-t-8",
        className
      )}
      {...props}
    >
      {children}
    </article>
  );
}
