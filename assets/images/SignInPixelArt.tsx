import React from 'react';
import Svg, { Rect, G } from 'react-native-svg';

interface SignInPixelArtProps {
  width?: number;
  height?: number;
  color?: string;
}

export default function SignInPixelArt({
  width = 200,
  height = 150,
  color = '#18233a'
}: SignInPixelArtProps) {
  const pixelSize = width / 40; // Base pixel unit

  return (
    <Svg width={width} height={height} viewBox="0 0 40 30">
      <G>
        {/* Left Hand (reaching right) */}
        {/* Arm */}
        <Rect x="2" y="14" width="2" height="2" fill={color} />
        <Rect x="4" y="14" width="2" height="2" fill={color} />
        <Rect x="6" y="14" width="2" height="2" fill={color} />
        <Rect x="8" y="14" width="2" height="2" fill={color} />

        {/* Hand */}
        <Rect x="10" y="12" width="2" height="2" fill={color} />
        <Rect x="10" y="14" width="2" height="2" fill={color} />
        <Rect x="10" y="16" width="2" height="2" fill={color} />

        {/* Fingers */}
        <Rect x="12" y="10" width="2" height="2" fill={color} />
        <Rect x="12" y="12" width="2" height="2" fill={color} />
        <Rect x="12" y="16" width="2" height="2" fill={color} />
        <Rect x="12" y="18" width="2" height="2" fill={color} />

        {/* Right Hand (reaching left) */}
        {/* Arm */}
        <Rect x="36" y="14" width="2" height="2" fill={color} />
        <Rect x="34" y="14" width="2" height="2" fill={color} />
        <Rect x="32" y="14" width="2" height="2" fill={color} />
        <Rect x="30" y="14" width="2" height="2" fill={color} />

        {/* Hand */}
        <Rect x="28" y="12" width="2" height="2" fill={color} />
        <Rect x="28" y="14" width="2" height="2" fill={color} />
        <Rect x="28" y="16" width="2" height="2" fill={color} />

        {/* Fingers */}
        <Rect x="26" y="10" width="2" height="2" fill={color} />
        <Rect x="26" y="12" width="2" height="2" fill={color} />
        <Rect x="26" y="16" width="2" height="2" fill={color} />
        <Rect x="26" y="18" width="2" height="2" fill={color} />

        {/* Coins in the middle */}
        {/* Coin 1 */}
        <Rect x="18" y="12" width="2" height="2" fill={color} />
        <Rect x="16" y="14" width="2" height="2" fill={color} />
        <Rect x="18" y="14" width="2" height="2" fill={color} />
        <Rect x="20" y="14" width="2" height="2" fill={color} />
        <Rect x="18" y="16" width="2" height="2" fill={color} />

        {/* Coin 2 (slightly lower) */}
        <Rect x="20" y="16" width="2" height="2" fill={color} />
        <Rect x="18" y="18" width="2" height="2" fill={color} />
        <Rect x="20" y="18" width="2" height="2" fill={color} />
        <Rect x="22" y="18" width="2" height="2" fill={color} />
        <Rect x="20" y="20" width="2" height="2" fill={color} />

        {/* $ symbol on first coin */}
        <Rect x="18" y="14" width="2" height="1" fill="rgba(255,255,255,0.3)" />
      </G>
    </Svg>
  );
}
