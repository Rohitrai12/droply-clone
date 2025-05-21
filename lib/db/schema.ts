import { pgTable, text, uuid, integer, boolean, timestamp } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const files = pgTable("files", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    path: text("path").notNull(),
    size: integer("size").notNull(),
    type: text("type").notNull(),
    fileUrl: text("file_url").notNull(),
    thumbnailURL: text("thumbnail_url"),
    userId: text("user_id").notNull(),
    parentId: uuid("parent_id"),
    isStarted: boolean("is_started").default(false).notNull(),
    isTrash: boolean("is_trash").default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
});


export const filesRelations = relations(files, ({ one, many }) => ({
    parent: one(files, {
        fields: [files.parentId],
        references: [files.id]
    }),
    children: many(files)
}));

export const File = typeof files.$inferInsert
export const newFile = typeof files.$inferInsert