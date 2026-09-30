import supabase from "./supabase";

export async function getProfile(id) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateProfileRole({ userId }) {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      role: "owner",
    })
    .eq("id", userId)

    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateProfile({ userId, name }) {
  const { data, error } = await supabase
    .from("profiles")
    .update({ name })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function changeEmail({ newEmail }) {
  const email = newEmail.trim();

  if (!email) {
    throw new Error("Please enter your new email address.");
  }

  const { data, error } = await supabase.auth.updateUser(
    {
      email,
    },
    {
      emailRedirectTo: "http://localhost:5173/settings/login-security",
    },
  );

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function changePasswordApi({
  email,
  currentPassword,
  newPassword,
}) {
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password: currentPassword,
  });

  if (signInError) {
    throw new Error("Your current password is incorrect.");
  }

  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
