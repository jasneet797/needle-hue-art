import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerSession } from "next-auth/next";

export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy", {
  apiVersion: "2023-10-16" as any,
});

export async function POST(req: Request) {
  const { prisma } = await import("@/lib/prisma");
  try {
    const session = await getServerSession();
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    console.log("Checkout items:", items);
    console.log("Stripe Key present:", !!process.env.STRIPE_SECRET_KEY);

    // 1. Calculate total
    const totalCents = items.reduce((acc: number, item: any) => acc + item.priceCents * item.quantity, 0);
    console.log("Total cents:", totalCents);

    // 2. Create Order in Database
    console.log("Attempting to create order in DB...");
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
    console.log("Order created:", order.id);

    // 3. Create Stripe Session
    console.log("Attempting to create Stripe session...");
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
    console.log("Stripe session created:", stripeSession.id);

    return NextResponse.json({ url: stripeSession.url });
  } catch (error: any) {
    console.error("CRITICAL CHECKOUT ERROR:", {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
