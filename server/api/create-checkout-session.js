import Stripe from 'stripe';
import { doc, setDoc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create a webhook to listen for checkout session completion
export default defineEventHandler(async (event) => {
  const { priceId, origin, name, userId } = await readBody(event);

  try {
    // Create the Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
      metadata: {
        userId,
        name,
      },
    });

    // Return the session ID to the client
    return { sessionId: session.id };
  } catch (err) {
    console.error('Error creating Stripe session:', err);
    return { error: 'Failed to create Stripe session' };
  }
});

// Webhook handler for Stripe events (listens for session completion)
export const webhookHandler = defineEventHandler(async (event) => {
  const signature = event.req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let stripeEvent;

  try {
    // Verify that the event comes from Stripe
    stripeEvent = stripe.webhooks.constructEvent(event.rawBody, signature, webhookSecret);
  } catch (err) {
    console.error('Stripe webhook signature verification failed.', err);
    return { error: 'Webhook signature verification failed' };
  }

  // Handle the event
  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;

    // Extract userId and subscription name from the session metadata
    const { userId, name } = session.metadata;

    // Update the chef's subscription in Firestore
    const db = useFirestore();
    const chefRef = doc(db, 'chefs', userId);
    try {
      await setDoc(chefRef, { subscription: name }, { merge: true });
      console.log('Chef subscription updated successfully');
    } catch (err) {
      console.error('Failed to update Firestore:', err);
    }
  }

  return { received: true };
});
