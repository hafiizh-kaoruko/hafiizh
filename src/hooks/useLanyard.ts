import { useEffect, useState } from 'react';

export interface LanyardSpotify {
  track_id: string;
  timestamps: {
    start: number;
    end: number;
  };
  song: string;
  artist: string;
  album_art_url: string;
  album: string;
}

export interface LanyardActivity {
  id: string;
  name: string;
  type: number;
  state?: string;
  details?: string;
  application_id?: string;
}

export interface LanyardData {
  discord_user: {
    id: string;
    username: string;
    display_name?: string;
    global_name?: string;
    avatar: string | null;
    discriminator: string;
  };
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  listening_to_spotify: boolean;
  spotify: LanyardSpotify | null;
  activities: LanyardActivity[];
}

export function useLanyard(userId: string): LanyardData | null {
  const [data, setData] = useState<LanyardData | null>(null);

  useEffect(() => {
    let active = true;
    let ws: WebSocket | null = null;
    let heartbeat: ReturnType<typeof setInterval> | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

    const fetchInitial = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        if (!res.ok) return;
        const json = await res.json();
        if (active && json?.success && json?.data) {
          setData(json.data);
        }
      } catch {
        // Silent fallback on network error
      }
    };

    const connectWs = () => {
      if (!active || typeof WebSocket === 'undefined') return;
      try {
        ws = new WebSocket('wss://api.lanyard.rest/socket');
        ws.onmessage = (event) => {
          if (!active) return;
          try {
            const payload = JSON.parse(event.data);
            if (payload.op === 1) {
              const interval = payload.d?.heartbeat_interval ?? 30000;
              if (heartbeat) clearInterval(heartbeat);
              heartbeat = setInterval(() => {
                if (ws?.readyState === WebSocket.OPEN) {
                  ws.send(JSON.stringify({ op: 3 }));
                }
              }, interval);
              if (ws?.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: userId } }));
              }
            } else if (payload.op === 0 && payload.d) {
              if (payload.t === 'INIT_STATE' || payload.t === 'PRESENCE_UPDATE') {
                setData(payload.d);
              }
            }
          } catch {
            // Ignore malformed message
          }
        };
        ws.onclose = () => {
          if (heartbeat) {
            clearInterval(heartbeat);
            heartbeat = null;
          }
          if (active) {
            reconnectTimer = setTimeout(connectWs, 5000);
          }
        };
      } catch {
        // Ignore websocket error
      }
    };

    fetchInitial();
    connectWs();

    return () => {
      active = false;
      if (heartbeat) clearInterval(heartbeat);
      if (reconnectTimer) clearTimeout(reconnectTimer);
      if (ws) {
        try {
          ws.close(1000);
        } catch {
          // Ignore close error
        }
      }
    };
  }, [userId]);

  return data;
}
