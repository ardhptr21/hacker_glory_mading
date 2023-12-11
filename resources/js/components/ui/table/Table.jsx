export default function Table({ children }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full my-0 align-middle text-dark border-neutral-200">
        {children}
      </table>
    </div>
  );
}
