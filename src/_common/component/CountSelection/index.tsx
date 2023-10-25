interface CountSelection {
  count?: number;
}
const CountSelection = ({ count }: CountSelection) => {
  return (
    <>
      {count ? (
        <div className="flex items-center p-5 mb-6 text-green-700 bg-green-300 shadow-xsm rounded-2xl h-9 ">
          Đã chọn {count || 0} mục
        </div>
      ) : null}
    </>
  );
};

export default CountSelection;
