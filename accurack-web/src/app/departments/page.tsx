import Image from "next/image";

const DepartmentPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
      <Image
        src="/coming-soon-design.png"
        alt="Under Construction"
        width={500}
        height={500}
        className="mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">Sorry, this page is under construction</h1>
      <p className="text-gray-500 text-lg">{"We're working hard to bring this feature to life. Stay tuned!"}</p>
    </div>
  );
};

export default DepartmentPage;
