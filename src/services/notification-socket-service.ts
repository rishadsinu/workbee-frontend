
import { io, Socket } from 'socket.io-client';
import type { Notification } from './notification-service';

class NotificationSocketService {
  private static instance: NotificationSocketService;
  private socket: Socket | null = null;
  private token: string | null = null;
  private notificationCallbacks: ((notification: Notification) => void)[] = [];

  private constructor() {}

  static getInstance(): NotificationSocketService {
    if (!NotificationSocketService.instance) {
      NotificationSocketService.instance = new NotificationSocketService();
    }
    return NotificationSocketService.instance;
  }

  connect(token: string) {
    if (this.socket?.connected) {
      console.log('Notification socket already connected');
      return;
    }

    this.token = token;
    
    this.socket = io(import.meta.env.VITE_NOTIFICATION_URL || 'http://localhost:4004', {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.socket.on('connect', () => {
      console.log('Notification socket connected:', this.socket?.id);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Notification socket connection error:', error.message);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Notification socket disconnected:', reason);
    });

    this.socket.on('new_notification', (notification: Notification) => {
      console.log('New notification received:', notification);
      this.notificationCallbacks.forEach(callback => callback(notification));
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  onNotification(callback: (notification: Notification) => void) {
    this.notificationCallbacks.push(callback);
  }

  offNotification(callback: (notification: Notification) => void) {
    this.notificationCallbacks = this.notificationCallbacks.filter(cb => cb !== callback);
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

export const notificationSocketService = NotificationSocketService.getInstance();
