import { Elysia, t } from "elysia";
import { prisma } from "../lib/prisma";

export const inventoryRoutes = new Elysia({ prefix: "/inventory" })

  // ─────────────────────────────────────────────────────────────────────────
  // Lab 1: GET /inventory — ดึงสินค้าทั้งหมด เรียง A-Z
  // Challenge: ?low_stock=true → เฉพาะสินค้าที่ quantity <= 10
  // ─────────────────────────────────────────────────────────────────────────
  .get(
    "/",
    async ({ query }) => {
      const isLowStock = query.low_stock === "true";

      return await prisma.product.findMany({
        where: isLowStock ? { quantity: { lte: 10 } } : undefined,
        orderBy: { name: "asc" },
      });
    },
    {
      query: t.Object({
        low_stock: t.Optional(t.String()),
      }),
    }
  )

  // ─────────────────────────────────────────────────────────────────────────
  // Lab 2: POST /inventory — เพิ่มสินค้าใหม่
  // Challenge: Validation ด้วย TypeBox (name, sku, zone ห้ามว่าง, quantity มีค่า default 0)
  // ─────────────────────────────────────────────────────────────────────────
  .post(
    "/",
    async ({ body, set }) => {
      set.status = 201;
      return await prisma.product.create({
        data: {
          name: body.name,
          sku: body.sku,
          quantity: body.quantity ?? 0,
          zone: body.zone,
        },
      });
    },
    {
      body: t.Object({
        name: t.String({ minLength: 1 }),
        sku: t.String({ minLength: 1 }),
        quantity: t.Optional(t.Number({ default: 0 })),
        zone: t.String({ minLength: 1 }),
      }),
    }
  )

  // ─────────────────────────────────────────────────────────────────────────
  // Lab 3: PATCH /inventory/:id/adjust — ปรับจำนวนสต็อก (บวก/ลบ)
  // Challenge: Body { "change": -5 } หรือ { "change": 10 }
  // ─────────────────────────────────────────────────────────────────────────
  .patch(
    "/:id/adjust",
    async ({ params, body, set }) => {
      // ตรวจสอบว่าสินค้ามีอยู่จริง
      const product = await prisma.product.findUnique({
        where: { id: params.id },
      });

      if (!product) {
        set.status = 404;
        return { message: "ไม่พบสินค้า" };
      }

      const newQuantity = product.quantity + body.change;

      // ป้องกันสต็อกติดลบ
      if (newQuantity < 0) {
        set.status = 400;
        return { message: "จำนวนสต็อกไม่เพียงพอ (ไม่สามารถติดลบได้)" };
      }

      return await prisma.product.update({
        where: { id: params.id },
        data: { quantity: newQuantity },
      });
    },
    {
      params: t.Object({ id: t.String() }),
      body: t.Object({
        change: t.Number(),
      }),
    }
  )

  // ─────────────────────────────────────────────────────────────────────────
  // Lab 4: DELETE /inventory/:id — ลบสินค้า
  // Challenge: ห้ามลบถ้า quantity > 0
  // ─────────────────────────────────────────────────────────────────────────
  .delete(
    "/:id",
    async ({ params, set }) => {
      const product = await prisma.product.findUnique({
        where: { id: params.id },
      });

      if (!product) {
        set.status = 404;
        return { message: "ไม่พบสินค้า" };
      }

      if (product.quantity > 0) {
        set.status = 400;
        return { message: "ไม่สามารถลบสินค้าที่ยังมีอยู่ในสต็อกได้" };
      }

      await prisma.product.delete({
        where: { id: params.id },
      });

      return { message: "ลบสินค้าสำเร็จ" };
    },
    {
      params: t.Object({ id: t.String() }),
    }
  );
