import { NextResponse } from 'next/server';

// Aceasta este funcția ta POST care va primi datele de la Shopify
export async function POST(request) {
  try {
    // 1. Primim datele (payload-ul) de la Shopify
    const review = await request.json();

    // 2. Logăm datele ca să vedem ce primim
    console.log('Am primit un review:', JSON.stringify(review, null, 2));

    // 3. Logica de Bază (Filtrarea)
    if (review.rating && review.rating >= 4) {
      // Aici vom trimite email-ul
      console.log('Review Pozitiv! Se trimite email către:', review.email);

      // TODO: Adaugă logica Resend aici
      // await sendReviewEmail(review);

    } else {
      // Review negativ sau fără rating
      console.log('Review negativ sau invalid. Ignorăm.');
    }

    // 4. Răspundem Shopify că am primit datele (e obligatoriu!)
    return NextResponse.json({ status: 'success' }, { status: 200 });

  } catch (error) {
    console.error('Eroare la procesarea webhook-ului:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}