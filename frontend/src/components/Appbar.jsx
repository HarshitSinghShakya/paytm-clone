export const Appbar = () => {
  return (
    <div className="shadow h-14 flex justify-between items-center px-4">
      <div className="text-lg font-semibold">Paytm App</div>
      <div className="flex items-center space-x-4">
        <div>Hello</div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex items-center justify-center">
          <span className="text-sm font-medium">U</span>
        </div>
      </div>
    </div>
  );
};
