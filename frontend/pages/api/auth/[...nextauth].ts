import { firebaseDbUrl } from './../../../model/Constants';
import NextAuth, { DefaultUser, NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { User } from "../../../model/User";
import { verifyPassword, hashPassword } from '../../../utils/password-hasher';
import { FirebaseOptions, initializeApp } from '@firebase/app';
import { get, getDatabase, ref, set } from '@firebase/database';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                name: { label: "Name", type: "text" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials) {

                if (!credentials)
                    throw new Error("Invalid credentials.");

                // const firebaseConfig: FirebaseOptions = {
                //     databaseURL: firebaseDbUrl
                //     };
                
                // const app = initializeApp(firebaseConfig);
                // const db = getDatabase(app);
                // const snapshot = await get(ref(db, `users/${credentials.name}`));

                const res = await fetch(`${firebaseDbUrl}/users.json`);
                
                const data = await res.json();

                const users: User[] = [];

                for (const key in data) {
                    const temp = {
                        id: key,
                        ...data[key]
                    };
                    users.push(temp);
                }

                let user = users.find(u => u.name === credentials.name);

                if (!user) {
                    const hashedPassword = await hashPassword(credentials.password);

                    user = {
                        name: credentials.name,
                        password: hashedPassword
                    };

                    await fetch(`${firebaseDbUrl}/users.json`,{
                        method: "POST",
                        body: JSON.stringify(user),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    //await set(ref(db, 'users/' + user.name), user);
                } else {
                    //user = snapshot.val();
                    
                    const isValid = await verifyPassword(credentials.password, user.password);

                    if (!isValid) {
                        throw new Error("Invalid password.");
                    }
                }
                  
                return <DefaultUser>{ name: credentials.name };
            }
          })
    ]
  }

export default NextAuth(authOptions)