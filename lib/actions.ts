"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db";
import { authSchema, petDataSchema, petIdSchema } from "./validation";
import { signIn, signOut } from "./auth-no-edge";
import bcrypt from "bcryptjs";
import { checkAuth } from "./server-utils";
import { Prisma } from "@prisma/client";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// sign up

export async function signup(prevState: unknown, formData: unknown) {
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data",
    };
  }

  const formDataObjects = Object.fromEntries(formData.entries());

  const validatedFormData = authSchema.safeParse(formDataObjects);

  if (!validatedFormData.success) {
    return {
      message: "Invalid form data",
    };
  }

  const { email, password } = validatedFormData.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          message: "Email already exist.",
        };
      }
    }
    return {
      message: "could not create user.",
    };
  }

  await signIn("credentials", formData);
}

//sign out

export async function logout() {
  await signOut({
    redirectTo: "/",
  });
}
//user actions
export async function login(prevState: unknown, formData: unknown) {
  if (!(formData instanceof FormData)) {
    return {
      message: "Wrong form data",
    };
  }

  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return {
            message: "Invalid credentials.",
          };
        }

        default: {
          return {
            message: "Couldnot sign in.",
          };
        }
      }
    }

    throw error; //netjs redirect throws error so we need to rethrow it
  }
}

//Pet actions
export async function addPet(newPet: unknown) {
  //Authenitcation

  const session = await checkAuth();

  const validatedPet = petDataSchema.safeParse(newPet);

  if (!validatedPet.success) return { message: "Invalid pet data" };

  //Database mutation
  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        User: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
  } catch (error) {
    return {
      message: "Pet not added",
    };
  }

  revalidatePath("/app", "layout");
}

export async function editPet(petId: unknown, editedPet: unknown) {
  //Authentication
  const session = await checkAuth();

  const validatedPet = petDataSchema.safeParse(editedPet);
  const validatedPetId = petIdSchema.safeParse(petId);

  if (!validatedPet.success || !validatedPetId.success)
    return { message: "Invalid pet data" };

  //Authorization
  const pet = await prisma.pet.findUnique({
    where: {
      id: validatedPetId.data,
    },
  });

  if (!pet) {
    return {
      message: "Pet not found",
    };
  }

  if (pet.userId !== session.user.id) {
    return {
      message: "Not authorized",
    };
  }
  //Database Mutation

  try {
    await prisma.pet.update({
      where: {
        id: validatedPetId.data,
      },
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: "Can't complete the pet edit",
    };
  }

  revalidatePath("/app", "layout");
}

export async function deletePet(petId: unknown) {
  //Authentication
  const session = await checkAuth();

  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) return { message: "Invalid pet data" };

  //Authorization
  const pet = await prisma.pet.findUnique({
    where: {
      id: validatedPetId.data,
    },
  });

  if (!pet) {
    return { message: "No pet found" };
  }

  if (pet.userId !== session.user.id) {
    return {
      message: "Not authorized",
    };
  }
  //Database Mutation
  try {
    await prisma.pet.delete({
      where: {
        id: validatedPetId.data,
      },
    });
  } catch (error) {
    return {
      message: "couldn't delete pet",
    };
  }
  revalidatePath("/app", "layout");
}

// payment actions

export async function createCheckoutSession() {
  const session = await checkAuth();

  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: session.user.email,
    line_items: [
      {
        price: "price_1OvHA904AcSTYsE5Epo9hXnU",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CANONICAL_URL}/payment?success=true`,
    cancel_url: `${process.env.CANONICAL_URL}/payment?cancelled=true`,
  });
  //redirect user

  redirect(checkoutSession.url);
}
