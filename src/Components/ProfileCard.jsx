const ProfileCard = ({ image, name, email }) => (
  <div className="w-80 h-80 bg-gray-600 rounded-xl flex flex-col items-center justify-center mx-auto ">
    <div className="w-28 h-28 rounded-full border-4 border-gray-400 bg-gray-200 flex items-center justify-center mb-6 shadow-inner">
      <img 
        src={image} 
        alt={name} 
        className="w-24 h-24 rounded-full object-cover"
      />
    </div>
    <h2 className="text-2xl font-bold text-gray-100 mb-1">{name}</h2>
    <p className="text-lg text-gray-300 truncate max-w-[14rem] text-center">{email}</p>
  </div>
);

export default ProfileCard;
