import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const text = `
🔥 Новая заявка с сайта ГАЛАКТИКА

👤 ФИО: ${data.name || "-"}
📞 Телефон: ${data.phone || "-"}
🏙 Город: ${data.city || "-"}
💬 Telegram: ${data.telegram || "-"}
🏪 Магазин: ${data.shop || "-"}
📝 Комментарий: ${data.comment || "-"}
`;

    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text,
      }),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
