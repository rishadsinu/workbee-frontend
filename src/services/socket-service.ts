import { io, Socket } from 'socket.io-client';

class SocketService {
  private static instance: SocketService;
  private socket: Socket | null = null;
  private token: string | null = null;

  private constructor() {}

  static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  connect(token: string) {
    if (this.socket?.connected) {
      console.log('Socket already connected');
      return;
    }

    this.token = token;
    
    this.socket = io(import.meta.env.VITE_COMMUNICATION_URL, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket?.id);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    this.socket.on('error', (error: any) => {
      console.error('Socket error:', error.message);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinChat(chatId: string) {
    if (!this.socket?.connected) {
      console.error('Socket not connected');
      return;
    }
    this.socket.emit('join_chat', chatId);
  }

  leaveChat(chatId: string) {
    if (!this.socket?.connected) return;
    this.socket.emit('leave_chat', chatId);
  }

  sendMessage(data: { 
    chatId: string; 
    content: string; 
    type?: string;
    recipientId?: string; 
  }) {
    if (!this.socket?.connected) {
      console.error('Cannot send message: Socket not connected');
      return;
    }
    this.socket.emit('send_message', data);
  }

  onNewMessage(callback: (message: any) => void) {
    if (!this.socket) return;
    this.socket.on('new_message', callback);
  }

  offNewMessage() {
    if (!this.socket) return;
    this.socket.off('new_message');
  }

  sendTyping(chatId: string, isTyping: boolean) {
    if (!this.socket?.connected) return;
    this.socket.emit('typing', { chatId, isTyping });
  }

  onUserTyping(callback: (data: { userId: string; isTyping: boolean }) => void) {
    if (!this.socket) return;
    this.socket.on('user_typing', callback);
  }

  offUserTyping() {
    if (!this.socket) return;
    this.socket.off('user_typing');
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

export const socketService = SocketService.getInstance();