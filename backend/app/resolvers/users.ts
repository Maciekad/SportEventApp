import { getAllUsers, getUserById } from "../services/userService"

const usersResolver = {
    Query: {
        getUser: async (_: any, args: any) => {
            return await getUserById(args.id);
        },
        getAllUsers: async () => {
            return await getAllUsers();
        }
    },
};
export default usersResolver;