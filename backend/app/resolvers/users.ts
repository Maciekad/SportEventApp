import { getUserById } from "../services/userService"

const usersResolver = {
    Query: {
        getUserById: async (_: any, args: any) => {
            console.log(args.id);
            return await getUserById(args.id);
        },
    },
};
export default usersResolver;