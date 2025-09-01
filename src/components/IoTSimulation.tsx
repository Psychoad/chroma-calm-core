import { useEffect, useState } from 'react';
import { Lightbulb, Speaker, Wifi, WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EmotionType } from '@/lib/emotionDetection';

interface IoTSimulationProps {
  emotion: EmotionType;
}

interface Device {
  id: string;
  name: string;
  type: 'light' | 'speaker';
  connected: boolean;
  color?: string;
  brightness?: number;
  volume?: number;
}

const emotionToColor = {
  calm: '#3B82F6',      // Blue
  healing: '#10B981',   // Green
  strength: '#F97316',  // Orange
  wisdom: '#8B5CF6',    // Purple
  joy: '#EAB308',       // Yellow
  balance: '#EC4899',   // Pink
  neutral: '#6B7280'    // Gray
};

export const IoTSimulation = ({ emotion }: IoTSimulationProps) => {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: 'living-room-light',
      name: 'Living Room Light',
      type: 'light',
      connected: true,
      color: emotionToColor.neutral,
      brightness: 50
    },
    {
      id: 'bedroom-light',
      name: 'Bedroom Light',
      type: 'light',
      connected: true,
      color: emotionToColor.neutral,
      brightness: 30
    },
    {
      id: 'alexa-echo',
      name: 'Alexa Echo',
      type: 'speaker',
      connected: true,
      volume: 40
    },
    {
      id: 'smart-speaker',
      name: 'Smart Speaker',
      type: 'speaker',
      connected: false,
      volume: 0
    }
  ]);

  const [isConnecting, setIsConnecting] = useState(false);

  // Update devices when emotion changes
  useEffect(() => {
    setDevices(prev => prev.map(device => {
      if (device.type === 'light' && device.connected) {
        return {
          ...device,
          color: emotionToColor[emotion],
          brightness: emotion === 'neutral' ? 30 : 70
        };
      }
      
      if (device.type === 'speaker' && device.connected) {
        return {
          ...device,
          volume: emotion === 'neutral' ? 20 : 60
        };
      }
      
      return device;
    }));
  }, [emotion]);

  const toggleDeviceConnection = async (deviceId: string) => {
    setIsConnecting(true);
    
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setDevices(prev => prev.map(device => 
      device.id === deviceId 
        ? { ...device, connected: !device.connected }
        : device
    ));
    
    setIsConnecting(false);
  };

  const connectedDevices = devices.filter(d => d.connected);
  const disconnectedDevices = devices.filter(d => !d.connected);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-light text-foreground mb-4">
          Ambient Environment
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Your smart devices respond to your emotional state, creating a synchronized ambient environment 
          that enhances your meditation experience.
        </p>
      </div>

      {/* Current Emotion Status */}
      <div className="mb-8 p-6 bg-surface-elevated/50 backdrop-blur-xl rounded-2xl border border-border/30">
        <div className="flex items-center justify-center space-x-4">
          <div 
            className="w-6 h-6 rounded-full animate-pulse"
            style={{ backgroundColor: emotionToColor[emotion] }}
          />
          <span className="text-lg font-medium text-foreground capitalize">
            {emotion === 'neutral' ? 'Neutral State' : `${emotion.charAt(0).toUpperCase() + emotion.slice(1)} Mode`}
          </span>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-2">
          All connected devices are synchronized to this emotional state
        </p>
      </div>

      {/* Connected Devices */}
      {connectedDevices.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-medium text-foreground mb-4 flex items-center">
            <Wifi className="w-5 h-5 mr-2 text-green-500" />
            Connected Devices
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {connectedDevices.map(device => (
              <div 
                key={device.id}
                className="p-6 bg-surface-elevated/30 backdrop-blur-xl rounded-xl border border-border/30 hover:bg-surface-elevated/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {device.type === 'light' ? (
                      <Lightbulb 
                        className="w-6 h-6" 
                        style={{ color: device.color }}
                      />
                    ) : (
                      <Speaker className="w-6 h-6 text-primary" />
                    )}
                    <span className="font-medium text-foreground">{device.name}</span>
                  </div>
                  <button
                    onClick={() => toggleDeviceConnection(device.id)}
                    disabled={isConnecting}
                    className="px-3 py-1 text-xs bg-green-500/20 text-green-400 rounded-full border border-green-500/30 hover:bg-green-500/30 transition-colors disabled:opacity-50"
                  >
                    {isConnecting ? 'Updating...' : 'Connected'}
                  </button>
                </div>

                {device.type === 'light' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Brightness</span>
                      <span className="text-foreground">{device.brightness}%</span>
                    </div>
                    <div className="w-full bg-surface h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${device.brightness}%`,
                          backgroundColor: device.color
                        }}
                      />
                    </div>
                  </div>
                )}

                {device.type === 'speaker' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Volume</span>
                      <span className="text-foreground">{device.volume}%</span>
                    </div>
                    <div className="w-full bg-surface h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-1000"
                        style={{ width: `${device.volume}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Playing: {emotion === 'neutral' ? 'Ambient sounds' : `${emotion} meditation music`}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Disconnected Devices */}
      {disconnectedDevices.length > 0 && (
        <div>
          <h3 className="text-xl font-medium text-foreground mb-4 flex items-center">
            <WifiOff className="w-5 h-5 mr-2 text-muted-foreground" />
            Available Devices
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {disconnectedDevices.map(device => (
              <div 
                key={device.id}
                className="p-6 bg-surface-elevated/20 backdrop-blur-xl rounded-xl border border-border/20 hover:bg-surface-elevated/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {device.type === 'light' ? (
                      <Lightbulb className="w-6 h-6 text-muted-foreground" />
                    ) : (
                      <Speaker className="w-6 h-6 text-muted-foreground" />
                    )}
                    <span className="font-medium text-muted-foreground">{device.name}</span>
                  </div>
                  <button
                    onClick={() => toggleDeviceConnection(device.id)}
                    disabled={isConnecting}
                    className="px-3 py-1 text-xs bg-primary/20 text-primary rounded-full border border-primary/30 hover:bg-primary/30 transition-colors disabled:opacity-50"
                  >
                    {isConnecting ? 'Connecting...' : 'Connect'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-12 p-6 bg-surface-elevated/30 backdrop-blur-xl rounded-2xl border border-border/30">
        <h4 className="text-lg font-medium text-foreground mb-3">How It Works</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
          <div className="space-y-2">
            <h5 className="font-medium text-foreground">Smart Lights</h5>
            <p>Change color and brightness based on your emotional state to create the perfect ambient lighting.</p>
          </div>
          <div className="space-y-2">
            <h5 className="font-medium text-foreground">Audio Systems</h5>
            <p>Automatically play curated music and sounds that complement your current mood and meditation needs.</p>
          </div>
          <div className="space-y-2">
            <h5 className="font-medium text-foreground">Real-time Sync</h5>
            <p>All devices update instantly as your emotional state changes, creating a seamless ambient experience.</p>
          </div>
        </div>
      </div>
    </div>
  );
};