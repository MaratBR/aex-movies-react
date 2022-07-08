import classNames from "classnames";
import React from "react";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    className={classNames(
      className,
      "text-white p-2 rounded-lg bg-slate-900 hover:bg-slate-500 px-4"
    )}
    ref={ref}
    {...props}
  />
));

export default Button;
