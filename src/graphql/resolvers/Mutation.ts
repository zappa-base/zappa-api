export const Mutation = {
  testMutation: (_: any, args: { name: any; }) => {
    return `Hello ${args.name}`;
  }
};