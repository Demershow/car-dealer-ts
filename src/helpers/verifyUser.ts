import prisma from "../prisma";

export async function verifyIfUserAlreadyExists(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: email,
        },
      ],
    },
  });

  return user;
}