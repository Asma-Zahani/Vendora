import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCreditCard,
} from 'react-icons/fa';

const StripeForm = ({ amount, onSuccess, user , setIsCardValid }, ref) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardBrand, setCardBrand] = useState('unknown');
  const [cardState, setCardState] = useState({
    number: false,
    expiry: false,
    cvc: false,
  });

  const updateCardState = (field, complete) => {
    const newState = { ...cardState, [field]: complete };
    setCardState(newState);
    const allValid = Object.values(newState).every(val => val === true);
    setIsCardValid(allValid);
  };
  
  

  const brandIcons = {
    visa: <FaCcVisa className="text-blue-600 text-2xl" />,
    mastercard: <FaCcMastercard className="text-red-600 text-2xl" />,
    amex: <FaCcAmex className="text-indigo-600 text-2xl" />,
    discover: <FaCreditCard className="text-green-600 text-2xl" />,
    diners: <FaCreditCard className="text-purple-600 text-2xl" />,
    jcb: <FaCreditCard className="text-pink-600 text-2xl" />,
    unionpay: <FaCreditCard className="text-gray-600 text-2xl" />,
    unknown: <FaCreditCard className="text-gray-400 text-2xl" />,
  };

  const handleCardChange = (event) => {
    setCardBrand(event.brand || 'unknown');
  };

  const handleSubmit = async () => {
    try {
      const cardNumber = elements.getElement(CardNumberElement);

      const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardNumber,
      });

      if (paymentError) {
        console.error('[Payment Method Error]', paymentError.message);
        return null;
      }

      // Créer le PaymentIntent
      const res = await axios.post('http://localhost:8000/api/create-payment-intent', {
        amount: amount * 100, // en cents
        user_id: user.id,
      });

      const clientSecret = res.data.clientSecret;

      // Confirmer le paiement
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (result.error) {
        console.error('[Stripe Payment Error]', result.error.message);
        return null;
      }

      if (result.paymentIntent.status === 'succeeded') {
        // Sauvegarde transaction
        await axios.post('http://localhost:8000/api/save-transaction-id', {
          transaction_id: result.paymentIntent.id,
          user_id: user.id,
        });

        onSuccess(); // callback pour notifier le parent

        return result.paymentIntent.id; // ✅ ici on retourne bien l'ID
      }

      return null;
    } catch (error) {
      console.error('[StripeForm Error]', error);
      return null;
    }
  };

  useImperativeHandle(ref, () => ({
    submitPayment: handleSubmit,
  }));

  return (
    <form className="space-y-4">
      <div className="relative">
        <label className="block text-sm font-medium">Numéro de carte</label>
        <CardNumberElement
          onChange={(event) => {
            handleCardChange(event);
            updateCardState('number', event.complete);
          }}
          className="p-2 pr-10 border rounded w-full"
        />
        <div className="absolute right-3 top-6">{brandIcons[cardBrand]}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Date d'expiration</label>
          <CardExpiryElement  onChange={(event) => updateCardState('expiry', event.complete)} className="p-2 border rounded w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium">CVC</label>
          <CardCvcElement onChange={(event) => updateCardState('cvc', event.complete)} className="p-2 border rounded w-full" />
        </div>
      </div>
    </form>
  );
};

export default forwardRef(StripeForm);
