export interface Message {
    id?: number | null;
    created_at?: string;
    content: string;
    sender_id: string;
    conversation_id: string;
}
  