import { Comment } from "@/schema/Comment"
import * as Inputs from '@/schema/inputs'
import { db } from "@/db"
import { builder } from "@/schema/builder"

const querys = builder.queryFields((t) => ({
  findFirstComment: t.field({
    type: Comment,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.CommentWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.CommentOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.CommentWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.CommentScalarFieldEnum], required: false }),
    },
    resolve: async (root, args) => {
      const user = await db.comment.findFirst({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      })

      return user
    }
  })
}))

export default querys