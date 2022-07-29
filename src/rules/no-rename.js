//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {},
  },
  create: (ctx) => ({
    Property(node) {
      if (
        node.parent.type === 'ObjectPattern' &&
        // Not renaming if it's shorthand
        !node.shorthand &&
        // Allow renaming if the key is literal (aka: quoted and probably not a valid identifier)
        node.key.type !== 'Literal' &&
        // Allow renaming if destructuring to pre-declared variables.
        (!node.parent.parent ||
          node.parent.parent.type !== 'AssignmentExpression' ||
          node.parent.parent.operator !== '=')
      ) {
        ctx.report(node, 'Do not rename valid identifiers when destructuring.');
      }
    },
  }),
};
