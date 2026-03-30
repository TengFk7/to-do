import { Elysia, t } from "elysia";
import { prisma } from "../lib/prisma";

export const todoRoutes = new Elysia({ prefix: "/todos" })

  // Lab 1: GET /todos — ดึง todos ทั้งหมด (พร้อม Filtering & Sorting)
  .get("/", async ({ query }) => {
    const { filter = "all", sortBy = "createdAt", sortOrder = "desc" } = query;

    const where =
      filter === "all" ? {} : { completed: filter === "completed" };

    return await prisma.todo.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
    });
  }, {
    query: t.Object({
      filter: t.Optional(
        t.Union([t.Literal("all"), t.Literal("active"), t.Literal("completed")])
      ),
      sortBy: t.Optional(
        t.Union([t.Literal("createdAt"), t.Literal("title")])
      ),
      sortOrder: t.Optional(
        t.Union([t.Literal("asc"), t.Literal("desc")])
      ),
    }),
  })

  // Step 2: GET /todos/:id — ดึง todo เดี่ยว
  .get("/:id", async ({ params, set }) => {
    const todo = await prisma.todo.findUnique({
      where: { id: params.id },
    });
    if (!todo) {
      set.status = 404;
      return { message: "Todo not found" };
    }
    return todo;
  }, { params: t.Object({ id: t.Numeric() }) })

  // Lab 2: POST /todos — สร้าง todo ใหม่
  .post("/", async ({ body, set }) => {
    set.status = 201;
    return await prisma.todo.create({
      data: body,
    });
  }, {
    body: t.Object({
      title: t.String({ minLength: 1 }),
    }),
  })

  // Lab 3: PATCH /todos/:id/toggle — สลับสถานะ completed
  .patch("/:id/toggle", async ({ params, set }) => {
    const todo = await prisma.todo.findUnique({
      where: { id: params.id },
    });
    if (!todo) {
      set.status = 404;
      return { message: "Todo not found" };
    }
    return await prisma.todo.update({
      where: { id: params.id },
      data: { completed: !todo.completed },
    });
  }, { params: t.Object({ id: t.Numeric() }) })

  // Step 4: PATCH /todos/:id — อัปเดต todo (title หรือ completed)
  .patch("/:id", async ({ params, body, set }) => {
    const todo = await prisma.todo.findUnique({
      where: { id: params.id },
    });
    if (!todo) {
      set.status = 404;
      return { message: "Todo not found" };
    }
    return await prisma.todo.update({
      where: { id: params.id },
      data: body,
    });
  }, {
    params: t.Object({ id: t.Numeric() }),
    body: t.Object({
      title: t.Optional(t.String({ minLength: 1 })),
      completed: t.Optional(t.Boolean()),
    }),
  })

  // Lab 4: DELETE /todos/:id — ลบ todo
  .delete("/:id", async ({ params, set }) => {
    const todo = await prisma.todo.findUnique({
      where: { id: params.id },
    });
    if (!todo) {
      set.status = 404;
      return { message: "Todo not found" };
    }
    await prisma.todo.delete({
      where: { id: params.id },
    });
    return { message: "ลบข้อมูลสำเร็จ" };
  }, { params: t.Object({ id: t.Numeric() }) });
