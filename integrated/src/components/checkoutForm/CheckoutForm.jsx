import { PaymentElement } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import "./checkoutFrom.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function CheckoutForm({ data, alldates, roomId, available }) {
  const { user, loading, error, dispatch } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const showReserve =
    available?.length > 1
      ? available
          .map((item) => new Date(item).toLocaleDateString().split("/")[1])
          .join(",")
      : "Sorry, Room is already reserved!";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    if (isChecked) {
      const getData = async () => {
        try {
          const reserve = await axios.post(
            `/reserve/${roomId}`,
            {
              reserveUser: user.username,
              reserveDate: alldates,
            }
          );
          const forcheck = await axios.put(
            `http://localhost:8800/api/rooms/availability/${roomId}`,
            {
              unavailableDates: alldates,
            }
          );
        } catch (err) {}
      };
      getData();
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <div>
      <form id="payment-form" onSubmit={handleSubmit}>
        <div className="itemContainer">
          <div className="reserveItem">
            <label className="rLabel">Name</label>
            <span className="rSpan">{user.username}</span>
          </div>
          <div className="reserveItem">
            <label className="rLabel">Reserve Room</label>
            <span className="rSpan">Room {data.roomnumber}</span>
          </div>
          <div className="reserveItem">
            <label className="rLabel">Room Type</label>
            <span className="rSpan">{data.roomtype} Room</span>
          </div>
          <div className="reserveItem">
            <label className="rLabel">Amount</label>
            <span className="rSpan">{data.price}$</span>
          </div>
          <label className="rLabel">Reserve Date</label>
          <span className="rSpan">
            {showReserve}
          </span>
        </div>
        <br />
        <PaymentElement id="payment-element" />
        <div className="pamentbutton">
          <div className="checkForm">
            <label htmlFor="checkbox">Ready For Payment?</label>
            <input
              type="checkbox"
              id="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked((prev) => !prev)}
              className="paymentCheck"
            />
          </div>
          <button
            disabled={isProcessing || !stripe || !elements || !isChecked}
            id="submit"
            className="submit"
          >
            <span id="button-text">
              {isProcessing ? "Processing ... " : "Pay now"}
            </span>
          </button>
        </div>

        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
}
