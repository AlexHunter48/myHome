import supabase from "./supabase";

export async function createConversation({ propertyId, buyerId, ownerId }) {
  const { data, error } = await supabase
    .from("conversations")
    .insert([
      {
        property_id: propertyId,
        buyer_id: buyerId,
        owner_id: ownerId,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getConversation({ propertyId, buyerId, ownerId }) {
  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .eq("property_id", propertyId)
    .eq("buyer_id", buyerId)
    .eq("owner_id", ownerId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getMessages(conversationId) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function sendMessage({ conversationId, senderId, content }) {
  const { data, error } = await supabase
    .from("messages")
    .insert([
      {
        conversation_id: conversationId,
        sender_id: senderId,
        content,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getConversations(userId) {
  const { data, error } = await supabase
    .from("conversations")
    .select(
      `
      *,
      properties (
        id,
        title,
        location
      )
    `,
    )
    .or(`buyer_id.eq.${userId},owner_id.eq.${userId}`)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
