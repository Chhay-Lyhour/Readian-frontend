import React from 'react';
import { useNavigate } from 'react-router-dom';
import SubscriptionCard from '../components/subscription/SubscriptionCard'; // We'll create this

// 1. Define your plan data in one place
const plans = [
  {
    name: 'Basic',
    price: 'Free',
    features: [
      'Public books only',
      'No downloads',
      'Read only',
      'Basic search',
      'Basic ads'
    ],
    isDefault: true,
    styles: {
      bg: 'bg-lime-200',
      button: 'bg-gray-300 cursor-default'
    }
  },
  {
    name: 'Silver',
    price: '5.99$',
    features: [
      'Full access to all books',
      '20 downloads a month',
      'Advanced search',
      'Partial ads'
    ],
    isDefault: false,
    styles: {
      bg: 'bg-gray-200',
      button: 'bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-all duration-300'
    }
  },
  {
    name: 'Gold',
    price: '12.99$',
    features: [
      'Early access to all books',
      'Unlimited downloads',
      'Advanced search',
      'No ads'
    ],
    isDefault: false,
    styles: {
      bg: 'bg-yellow-400',
      button: 'bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-all duration-300'
    }
  }
];

function SubscriptionPage({currentUser, setCurrentUser}) {
  const navigate = useNavigate();

  //Find user's current plan
  const currentPlan = plans.find(
    plan => plan.name === currentUser?.subscriptionTier
  );

  // Unsubscribe handler
  const handleUnsubscribe = () => {
    if (window.confirm("Are you sure you want to unsubscribe?")) {
      const updatedUser = {
        ...currentUser,
        isSubscribed: false,
        subscriptionTier: 'Basic'
      };
      setCurrentUser(updatedUser);
    }
  }

  // This function will be passed to the cards
  const handleSubscribeClick = (plan) => {
    // Navigate to the payment page, passing plan data in 'state'
    navigate('/confirm-payment', { 
      state: { 
        planName: plan.name, 
        price: plan.price 
      } 
    });
  };

  if (currentUser && currentUser.isSubscribed && currentPlan) {
    
    // --- RENDER THE "SUBSCRIBED" VIEW ---
    return (
      <div className="bg-[#FFFDEE] min-h-screen p-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-12">
          Your current subscription: {currentPlan.name}
        </h1>
        
        {/* Display their current plan benefits */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Your Benefits:</h2>
          <ul className="list-disc list-inside space-y-2">
            {currentPlan.features.map((feature, index) => (
              <li key={index} className="text-gray-700">{feature}</li>
            ))}
          </ul>
        </div>

        {/* Unsubscribe Button */}
        <button 
          onClick={handleUnsubscribe}
          className="mt-8 bg-red-500 text-white py-3 px-8 rounded-full font-semibold hover:bg-red-600"
        >
          Unsubscribe
        </button>
      </div>
    );

  } else {
    
    // --- RENDER THE "NOT SUBSCRIBED" (CHOOSE PLAN) VIEW ---
    return (
      <div className="bg-[#FFFDEE] min-h-screen p-8 flex flex-col items-center">
        <h1 className="geist text-4xl font-bold mb-12">Choose Your Plan</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {plans.map((plan) => (
            <SubscriptionCard 
              key={plan.name}
              plan={plan}
              onSubscribe={!plan.isDefault ? () => handleSubscribeClick(plan) : null}
            />
          ))}
        </div>

        <button 
          onClick={() => navigate('/')}
          className="mt-12 bg-[#1A5632] text-[#FFD7DF] py-4 px-10 rounded-full font-semibold hover:bg-[#FFD7DF] hover:text-[#1A5632] transition-all duration-300" 
        >
          Back To Home
        </button>
      </div>
    );
  }


  // return (
  //   <div className="bg-[#FFFDEE] min-h-screen p-8 flex flex-col items-center">
  //     <h1 className="text-4xl font-bold mb-12">Choose Your Plan</h1>
      
  //     {/* 3-Card Container */}
  //     <div className="flex flex-col md:flex-row gap-8">
  //       {plans.map((plan) => (
  //         <SubscriptionCard 
  //           key={plan.name}
  //           plan={plan}
  //           // Pass the handler down, only if it's not the default plan
  //           onSubscribe={!plan.isDefault ? () => handleSubscribeClick(plan) : null}
  //         />
  //       ))}
  //     </div>

  //     {/* Back to Home Button */}
  //     <button 
  //       onClick={() => navigate('/')}
  //       className="mt-12 bg-gray-800 text-white py-3 px-8 rounded-full font-semibold"
  //     >
  //       Back To Home
  //     </button>
  //   </div>
  // );
}

export default SubscriptionPage;