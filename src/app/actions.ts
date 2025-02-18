'use server'
import { createClerkClient } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache';

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

// interface CreateUserInput {
//   firstName: string;
//   lastName: string;
//   emailAddress: string;
//   password: string;
// }

// interface CreateUserResponse {
//   message: string;
// }

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
  } catch (error: any) {
    console.error('Error creating user:', error);
    return { message: error.message || "Failed to create user" };
  }
}

export { createClerkUser }