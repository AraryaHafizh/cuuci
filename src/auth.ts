import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      phoneNumber: string;
      profilePictureUrl: string;
      outletId: string;
      accessToken: string;
    };
  }
}

type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  phoneNumber: string;
  profilePictureUrl: string;
  outletId: string;
  accessToken: string;
};

function hasAuthUser(user: unknown): user is AuthUser {
  return typeof user === "object" && user !== null && "accessToken" in user;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(user) {
        if (!user) return null;
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 12,
  },
  jwt: {
    maxAge: 60 * 60 * 12,
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ token, account, user, trigger }) {
      if (
        account?.provider === "google" &&
        account.access_token &&
        !token.user
      ) {
        const backendUser = await loginWithGoogle(account.access_token);

        token.user = {
          id: backendUser.id,
          name: backendUser.name,
          email: backendUser.email,
          role: backendUser.role,
          phoneNumber: backendUser.phoneNumber,
          profilePictureUrl: backendUser.profilePictureUrl,
          outletId: backendUser.outletId,
          accessToken: backendUser.accessToken,
        };
      }

      if (account?.provider === "credentials" && user) {
        token.user = user;
      }

      if (trigger === "update" && hasAuthUser(token.user)) {
        console.log("jalan 0000000000x");

        const refreshedUser = await refetch(token.user.accessToken);

        token.user = {
          id: refreshedUser.id,
          email: refreshedUser.email,
          name: refreshedUser.name,
          role: refreshedUser.role,
          phoneNumber: refreshedUser.phoneNumber,
          profilePictureUrl: refreshedUser.profilePictureUrl,
          outletId: refreshedUser.outletId,
          accessToken: refreshedUser.accessToken,
        };
      }

      return token;
    },
    async session({ session, token }: any) {
      if (token.user) session.user = token.user;
      return session;
    },
  },
});

async function loginWithGoogle(accessToken: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_CUUCI_API}/auth/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accessToken }),
  });

  if (!res.ok) {
    throw new Error("Backend Google login failed");
  }

  return res.json();
}

async function refetch(accessToken: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_CUUCI_API}/auth/refetch`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("refetch user data failed");
  }

  return res.json();
}
