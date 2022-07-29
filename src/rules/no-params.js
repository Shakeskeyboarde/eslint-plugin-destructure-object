module.exports = {
  meta: {
    docs: {},
    schema: [
      {
        type: 'object',
        properties: { allowOnlyParam: { type: 'boolean' } },
        additionalProperties: false,
      },
    ],
  },
  create: (ctx) => {
    const [option] = ctx.options;
    const allowOnlyParam = option != null && typeof option === 'object' && Boolean(typeof option.allowOnlyParam);

    return {
      ObjectPattern(node) {
        // If the parameter has a default value, then the immediate parent will
        // be an AssignmentPattern, with the function being the parent of the
        // assignment.
        const functionParent =
          node.parent.type === 'AssignmentPattern' && node.parent.parent ? node.parent.parent : node.parent;

        if (functionParent.type.includes('Function')) {
          if (!allowOnlyParam || functionParent.params.length > 1) {
            ctx.report(node, 'Do not destructure function parameters.');
          }
        }
      },
    };
  },
};
