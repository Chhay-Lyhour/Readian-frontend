import React from 'react';

function SubscriptionCard({ plan, onSubscribe }) {
  const { name, price, features, isDefault, styles } = plan;

  return (
    <div className={`w-72 ${styles.bg} rounded-lg shadow-lg p-6 flex flex-col`}>
      {/* Plan Name */}
      <h2 className="text-4xl font-bold text-center mb-2">{name}</h2>
      {/* Price */}
      <p className="text-3xl font-bold text-center mb-6">{price}</p>
      
      {/* Features Box */}
      <div className="bg-white rounded-md p-4 min-h-[200px] mb-6">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="text-gray-700">{feature}</li>
          ))}
        </ul>
      </div>

      {/* Button */}
      {isDefault ? (
        <span className={`w-full py-2 text-center rounded-lg font-semibold ${styles.button}`}>
          Default
        </span>
      ) : (
        <button 
          onClick={onSubscribe}
          className={`w-full py-2 text-center rounded-lg font-semibold ${styles.button}`}
        >
          Subscribe
        </button>
      )}
    </div>
  );
}

export default SubscriptionCard;