import supabase from "./supabase";

export async function signUpApi({ name, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (data.user?.identities?.length === 0) {
    throw new Error("An account with this email already exists.");
  }

  return data;
}

export async function logIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);

  return data;
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
