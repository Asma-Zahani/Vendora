/* eslint-disable react/prop-types */
import { forwardRef, useImperativeHandle, useState } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCreditCard } from 'react-icons/fa';

const StripeForm = ({ amount, onSuccess, user, setIsCardValid }, ref) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardBrand, setCardBrand] = useState('unknown');
  const [cardState, setCardState] = useState({ number: false, expiry: false, cvc: false });

  const brandIcons = {
    visa: <FaCcVisa className="text-blue-600 text-2xl" />,
    mastercard: <FaCcMastercard className="text-red-600 text-2xl" />,
    amex: <FaCcAmex className="text-indigo-600 text-2xl" />,
    unknown: <FaCreditCard className="text-gray-400 text-2xl" />,
  };

  const updateCardState = (field, complete) => {
    const updatedState = { ...cardState, [field]: complete };
    setCardState(updatedState);
    setIsCardValid(Object.values(updatedState).every(Boolean));
  };

  const handleSubmit = async () => {
    try {
      const cardElement = elements.getElement(CardNumberElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement
      });

      if (error) return console.error('[Payment Method Error]', error.message);

      const { data } = await axios.post('http://localhost:8000/api/create-payment-intent', {
        amount: amount * 100,
        user_id: user.id,
      });

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (result.error) return console.error('[Stripe Payment Error]', result.error.message);

      if (result.paymentIntent.status === 'succeeded') {
        await axios.post('http://localhost:8000/api/save-transaction-id', {
          transaction_id: result.paymentIntent.id,
          user_id: user.id,
        });
        onSuccess();
        return result.paymentIntent.id;
      }

      return null;
    } catch (err) {
      console.error('[StripeForm Error]', err);
      return null;
    }
  };

  useImperativeHandle(ref, () => ({ submitPayment: handleSubmit }));

  return (
    <form className="space-y-4">
      <div className="relative">
        <label className="block text-sm font-medium">Numéro de carte</label>
        <CardNumberElement
          onChange={(e) => {
            setCardBrand(e.brand || 'unknown');
            updateCardState('number', e.complete);
          }}
          className="p-2 pr-10 border rounded w-full"
        />
        <div className="absolute right-3 top-6">{brandIcons[cardBrand] || brandIcons.unknown}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Date d&apos;expiration</label>
          <CardExpiryElement
            onChange={(e) => updateCardState('expiry', e.complete)}
            className="p-2 border rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">CVC</label>
          <CardCvcElement
            onChange={(e) => updateCardState('cvc', e.complete)}
            className="p-2 border rounded w-full"
          />
        </div>
      </div>
    </form>
  );
};

export default forwardRef(StripeForm);