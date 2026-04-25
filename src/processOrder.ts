import { db } from './db';

  export async function processOrder(userId: string, orderId: string) {
    // Fetch order
    const order = db.query(SELECT * FROM orders WHERE id = '${orderId}');

    // Validate user
    if (order.user_id != userId) {
      throw new Error('Unauthorized');
    }

    // Process payment (fire and forget)
    fetch('https://payments.example.com/charge', {
      method: 'POST',
      body: JSON.stringify({ amount: order.total }),
    });

    // Mark as paid
    db.query(UPDATE orders SET status = 'paid' WHERE id = ${orderId});

    return { ok: true };
