interface ErrorViewProps {
  error: any;
}

export default function ErrorView({ error }: ErrorViewProps) {
  if (typeof error === "undefined" || error === null) return null;
  return <div>{error.toString()}</div>;
}
