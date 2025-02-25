'use server'
import { createClerkClient } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache';

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })


async function createClerkUser(
  prevState: {
    message: string;
  },
  formData: FormData) {
  try {
    console.log('Creating user...');

    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const emailAddress = formData.get('emailAddress') as string;
    const password = formData.get('password') as string;

    console.log(formData.get('firstName'))
    console.log(firstName, lastName, emailAddress, password)

    if (!firstName || !lastName || !emailAddress || !password) {
      return { message: "All fields are required" };
    }

    const user = await clerkClient.users.createUser({
      firstName,
      lastName,
      emailAddress: [emailAddress],
      password,
    });

    revalidatePath('/miltonians');
    return { message: `Added user ${user.firstName}` };
  } catch (error: unknown) {
    console.error("Error creating user:", error);

    // Ensure we correctly extract the error message
    let errorMessage = "Failed to create user";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return { message: errorMessage };
  }
}

export { createClerkUser }