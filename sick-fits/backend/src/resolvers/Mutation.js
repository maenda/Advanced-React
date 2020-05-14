const Mutation = {
  async createItem(parents, args, ctx, info) {
    // todo: check if they're logged in

    const item = await ctx.db.mutation.createItem({
      data: {
        ...args
      }
    }, info)

    return item;
  }
};

module.exports = Mutation;
