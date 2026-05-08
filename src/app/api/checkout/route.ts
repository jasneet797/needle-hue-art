import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16" as any,
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // 1. Calculate total (should be done on server to prevent tampering)
    const totalCents = items.reduce((acc: number, item: any) => acc + item.priceCents * item.quantity, 0);

    // 2. Create Order in Database (Status: PENDING)
    const order = await prisma.order.create({
      data: {
        totalCents,
        status: "PENDING",
        userId: session?.user?.email ? (await prisma.user.findUnique({ where: { email: session.user.email } }))?.id : null,
        items: {
          create: items.map((item: any) => ({
            name: item.name,
            quantity: item.quantity,
            priceCents: item.priceCents,
            image: item.image,
          })),
        },
      },
    });

    // 3. Create Stripe Session
    // Note: In a real app, you'd verify prices against your DB here.
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
            images: [item.image.startsWith("/") ? `${process.env.NEXTAUTH_URL}${item.image}` : item.image],
          },
          unit_amount: item.priceCents,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order_id=${order.id}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
      metadata: {
        orderId: order.id,
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error: any) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
