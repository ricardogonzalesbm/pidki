import React from 'react';
import Svg, { Rect, G } from 'react-native-svg';

interface SignUpPixelArtProps {
  width?: number;
  height?: number;
  color?: string;
}

export default function SignUpPixelArt({
  width = 200,
  height = 150,
  color = '#18233a'
}: SignUpPixelArtProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 40 30">
      <G>
        {/* Left Person */}
        {/* Head */}
        <Rect x="8" y="6" width="3" height="3" fill={color} />

        {/* Body */}
        <Rect x="7" y="10" width="2" height="2" fill={color} />
        <Rect x="9" y="10" width="2" height="2" fill={color} />
        <Rect x="8" y="12" width="3" height="2" fill={color} />
        <Rect x="8" y="14" width="3" height="3" fill={color} />

        {/* Left arm reaching right */}
        <Rect x="11" y="11" width="2" height="2" fill={color} />
        <Rect x="13" y="12" width="2" height="2" fill={color} />

        {/* Legs */}
        <Rect x="8" y="17" width="2" height="3" fill={color} />
        <Rect x="10" y="17" width="2" height="3" fill={color} />

        {/* Right Person */}
        {/* Head */}
        <Rect x="29" y="6" width="3" height="3" fill={color} />

        {/* Body */}
        <Rect x="29" y="10" width="2" height="2" fill={color} />
        <Rect x="31" y="10" width="2" height="2" fill={color} />
        <Rect x="29" y="12" width="3" height="2" fill={color} />
        <Rect x="29" y="14" width="3" height="3" fill={color} />

        {/* Right arm reaching left */}
        <Rect x="27" y="11" width="2" height="2" fill={color} />
        <Rect x="25" y="12" width="2" height="2" fill={color} />

        {/* Legs */}
        <Rect x="28" y="17" width="2" height="3" fill={color} />
        <Rect x="30" y="17" width="2" height="3" fill={color} />

        {/* Handshake in middle */}
        <Rect x="15" y="13" width="2" height="2" fill={color} />
        <Rect x="17" y="13" width="2" height="2" fill={color} />
        <Rect x="19" y="13" width="2" height="2" fill={color} />
        <Rect x="21" y="13" width="2" height="2" fill={color} />
        <Rect x="23" y="13" width="2" height="2" fill={color} />

        {/* Coin/Dollar symbol above handshake */}
        {/* Coin circle */}
        <Rect x="19" y="3" width="2" height="1" fill={color} />
        <Rect x="17" y="4" width="2" height="2" fill={color} />
        <Rect x="21" y="4" width="2" height="2" fill={color} />
        <Rect x="19" y="4" width="2" height="2" fill={color} />
        <Rect x="17" y="6" width="2" height="2" fill={color} />
        <Rect x="21" y="6" width="2" height="2" fill={color} />
        <Rect x="19" y="6" width="2" height="2" fill={color} />
        <Rect x="19" y="8" width="2" height="1" fill={color} />

        {/* $ symbol inside */}
        <Rect x="19" y="5" width="2" height="1" fill="rgba(255,255,255,0.4)" />
        <Rect x="19" y="6" width="2" height="1" fill="rgba(255,255,255,0.4)" />
      </G>
    </Svg>
  );
}
