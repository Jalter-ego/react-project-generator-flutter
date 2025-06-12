import { io, Socket } from 'socket.io-client';
import type { ScreenType } from '../types/CanvasItem';

class SocketService {
  private socket: Socket | null = null;

  connect() {
    if (!this.socket) {
      this.socket = io('http://localhost:3000', {
        transports: ['websocket'],
      });

      this.socket.on('connect', () => {
        console.log(`🔌 Conectado al servidor con ID: ${this.socket?.id}`);
      });

      this.socket.on('disconnect', () => {
        console.log('🔌 Desconectado del servidor');
      });
    }
  }

  joinRoom(projectId: string) {
    if (this.socket) {
      this.socket.emit('join-room', projectId);
      console.log(`🧩 Solicitando unirse a la sala: ${projectId}`);
    }
  }

  sendCanvasUpdate(projectId: string, screens: ScreenType[]) {
    if (this.socket) {
      this.socket.emit('update-canvas', {
        roomId: projectId,
        data: screens,
      });
    }
  }

  onCanvasUpdated(callback: (screens: ScreenType[]) => void) {
    if (this.socket) {
      this.socket.on('canvas-updated', callback);
    }
  }

  offCanvasUpdated() {
    if (this.socket) {
      this.socket.off('canvas-updated');
    }
  }
}

export const socketService = new SocketService();
