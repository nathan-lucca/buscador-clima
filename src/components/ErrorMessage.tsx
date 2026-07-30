interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="w-full max-w-md bg-red-500/20 border border-red-400/30 rounded-xl px-4 py-3">
      <p className="text-red-200 text-sm">{message}</p>
    </div>
  );
}
