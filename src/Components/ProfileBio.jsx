const BioGraph = ({
  firstName ,
  lastName ,
  country , 
  birthday ,
  occupation,
  mobile ,
  email ,
  phone 
}) => (
  <div className="bg-white rounded-b-lg shadow p-6 border-t-4 border-gray-300 w-full h-full mx-auto">
    <h2 className="text-2xl font-semibold text-gray-600 mb-6">Bio Graph</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-3">
      <div className="flex  ">
        <span className="text-gray-500 min-w-[7rem]">First Name</span>
        <span className="text-gray-500">: {firstName}</span>
      </div>
      <div className="flex ">
        <span className="text-gray-500 min-w-[7rem]">Last Name</span>
        <span className="text-gray-500">: {lastName}</span>
      </div>
      <div className="flex ">
        <span className="text-gray-500 min-w-[7rem]">Country</span>
        <span className="text-gray-500">: {country}</span>
      </div>
      <div className="flex ">
        <span className="text-gray-500 min-w-[7rem]">Birthday</span>
        <span className="text-gray-500">: {birthday}</span>
      </div>
      <div className="flex ">
        <span className="text-gray-500 min-w-[7rem]">Occupation</span>
        <span className="text-gray-500">: {occupation}</span>
      </div>
      <div className="flex ">
        <span className="text-gray-500 min-w-[7rem]">Email</span>
        <span className="text-gray-500">: {email}</span>
      </div>
      <div className="flex ">
        <span className="text-gray-500 min-w-[7rem]">Mobile</span>
        <span className="text-gray-500">: {mobile}</span>
      </div>
      <div className="flex ">
        <span className="text-gray-500 min-w-[7rem]">Phone</span>
        <span className="text-gray-500">: {phone}</span>
      </div>
    </div>
  </div>
);

export default BioGraph;
