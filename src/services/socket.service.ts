import { io, Socket } from "socket.io-client";
import type { ScreenType } from "../types/CanvasItem";
import { api } from ".";

class SocketService {
  private socket: Socket | null = null;

  connect() {
    if (!this.socket) {
      this.socket = io(api, {
        transports: ["websocket"],
      });

      this.socket.on("connect", () => {
        console.log(`🔌 Conectado al servidor con ID: ${this.socket?.id}`);
      });

      this.socket.on("disconnect", () => {
        console.log("🔌 Desconectado del servidor");
      });

      this.socket.on("access-granted", (data) => {
        console.log("✅ Access granted:", data.message);
      });

      this.socket.on("access-denied", (data) => {
        console.error("🚫 Access denied:", data.message);
        alert("Access denied: Invalid edit key");
      });
    }
  }

  joinRoom(projectId: string, editKey: string, userId?: string) {
    if (this.socket) {
      console.log(
        `🧩 Solicitando unirse a la sala: ${projectId} con editKey: ${editKey}, userId: ${
          userId || "none"
        }`
      );
      this.socket.emit("join-room", { roomId: projectId, editKey, userId });
    }
  }
  sendCanvasUpdate(projectId: string, screens: ScreenType[]) {
    console.log("📤 Emitiendo update-canvas a room", projectId, screens);
    if (this.socket) {
      this.socket.emit("update-canvas", {
        roomId: projectId,
        data: screens,
      });
    }
  }

  onCanvasUpdated(callback: (screens: ScreenType[]) => void) {
    if (this.socket) {
      this.socket.on("canvas-updated", callback);
    }
  }

  on(event: string, callback: (...args: any[]) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  offCanvasUpdated() {
    if (this.socket) {
      this.socket.off("canvas-updated");
    }
  }

  off(event: string, callback?: (...args: any[]) => void) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const socketService = new SocketService();
