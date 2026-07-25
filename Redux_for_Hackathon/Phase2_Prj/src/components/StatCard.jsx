const StatCard = ({ icon, title, value, bgColor, iconColor }) => {

  

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Icon */}
      <div
        className={`h-14 w-14 rounded-xl flex items-center justify-center ${bgColor}`}
      >
        <div className={iconColor}>{icon}</div>
      </div>

      {/* Text */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900">{value}</h2>
        <p className="text-slate-500 mt-1">{title}</p>
      </div>
    </div>
  );
};

export default StatCard;