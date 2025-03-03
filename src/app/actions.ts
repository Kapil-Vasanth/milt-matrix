"use server";

import { createClerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

async function createClerkUser(
  prevState: { message: string },
  formData: FormData
) {
  try {
    console.log("Creating user...");

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const emailAddress = formData.get("emailAddress") as string;
    const password = formData.get("password") as string;

    if (!firstName || !lastName || !emailAddress || !password) {
      return { message: "⚠️ All fields are required!" };
    }

    const user = await clerkClient.users.createUser({
      firstName,
      lastName,
      emailAddress: [emailAddress],
      password,
      publicMetadata: {
        role: "user", // Default role
      },
    });
    revalidatePath("/");
    console.log(user)

    return { message: `✅ User "${user.firstName}" added successfully!` };
  } catch (error: unknown) {
    console.error("Error creating user:", error);

    // Extract error message
    let errorMessage = "❌ Failed to create user.";
    if (error instanceof Error) {
      errorMessage = `❌ ${error.message}`;
    }

    return { message: errorMessage };
  }
}

async function getClerkUser(userId: string) {
  try {
    const user = await clerkClient.users.getUser(userId);
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id,
      metadata: user.publicMetadata,
      password: "",
      imgUrl: user.imageUrl,
      emailAddress: user.emailAddresses[0].emailAddress,
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}


async function deleteClerkUser(userId: string) {
  try {
    await clerkClient.users.deleteUser(userId);
    revalidatePath("/");
    return { message: "✅ User deleted successfully!" };
  } catch (error: unknown) {
    console.error("Error deleting user:", error);
    let errorMessage = "❌ Failed to delete user.";
    if (error instanceof Error) {
      errorMessage = `❌ ${error.message}`;
    }
    return { message: errorMessage };
  }
}

async function updateClerkUser(
  prevState: any,
  formData: FormData
) {
  console.log(formData)
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const password = formData.get("password") as string;
    const userId = formData.get("userId") as string;


    if (!firstName || !lastName) {
      return { message: "⚠️ All fields are required!" };
    }

    const user = await clerkClient.users.updateUser(userId, {
      firstName,
      lastName,
      ...(password ? { password } : {})
    });
    console.log("user updated successfully")
    revalidatePath("/");
    return { message: `✅ User "${user.firstName}" updated successfully!` };
  } catch (error: unknown) {
    console.error("Error updating user:", error);
    let errorMessage = "❌ Failed to update user.";
    if (error instanceof Error) {
      errorMessage = `❌ ${error.message}`;
    }
    return { message: errorMessage };
  }
}




export { createClerkUser, getClerkUser, deleteClerkUser, updateClerkUser };
