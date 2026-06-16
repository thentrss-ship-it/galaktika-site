import { NextResponse } from "next/server";

type LeadProduct = {
  id?: number | string;
  brand?: string;
  category?: string;
  name?: string;
  slug?: string;
  section?: string;
};

type LeadData = {
  name?: string;
  phone?: string;
  city?: string;
  shop?: string;
  telegram?: string;
  comment?: string;
  product?: LeadProduct;
  selectedProduct?: LeadProduct;
  products?: LeadProduct[];
  selectedProducts?: LeadProduct[];
};

const safeValue = (value: unknown) => {
  if (typeof value !== "string" && typeof value !== "number") {
    return "-";
  }

  const text = String(value).trim();

  return text.length > 0 ? text : "-";
};

const getLeadProducts = (data: LeadData): LeadProduct[] => {
  if (Array.isArray(data.products)) {
    return data.products;
  }

  if (Array.isArray(data.selectedProducts)) {
    return data.selectedProducts;
  }

  if (data.product) {
    return [data.product];
  }

  if (data.selectedProduct) {
    return [data.selectedProduct];
  }

  return [];
};

const formatProduct = (product: LeadProduct, index: number) => {
  const parts = [
    `${index + 1}. ${safeValue(product.name)}`,
    `   Бренд: ${safeValue(product.brand)}`,
    `   Категория: ${safeValue(product.category)}`,
    `   Серия: ${safeValue(product.section)}`,
    `   ID: ${safeValue(product.id)}`,
  ];

  return parts.join("\n");
};

export async function POST(req: Request) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Telegram env variables are missing");

      return NextResponse.json(
        {
          ok: false,
          error: "Telegram is not configured",
        },
        { status: 500 }
      );
    }

    const data = (await req.json()) as LeadData;
    const leadProducts = getLeadProducts(data);

    const productsText =
      leadProducts.length > 0
        ? `\n\n🛒 Товары в запросе: ${leadProducts.length}\n${leadProducts
            .slice(0, 25)
            .map(formatProduct)
            .join("\n\n")}${
            leadProducts.length > 25
              ? `\n\n...и ещё ${leadProducts.length - 25} позиций`
              : ""
          }`
        : "";

    const text = `🔥 Новая заявка с сайта ГАЛАКТИКА

👤 Имя: ${safeValue(data.name)}
📞 Телефон: ${safeValue(data.phone)}
🏙 Город: ${safeValue(data.city)}
💬 Telegram: ${safeValue(data.telegram)}
🏪 Магазин: ${safeValue(data.shop)}
📝 Комментарий: ${safeValue(data.comment)}${productsText}`;

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          disable_web_page_preview: true,
        }),
      }
    );

    if (!telegramResponse.ok) {
      const errorText = await telegramResponse.text();
      console.error("Telegram sendMessage error:", errorText);

      return NextResponse.json(
        {
          ok: false,
          error: "Telegram sendMessage failed",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Lead route error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Lead request failed",
      },
      { status: 500 }
    );
  }
}
