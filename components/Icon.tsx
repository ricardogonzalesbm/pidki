import { useTheme } from '@shopify/restyle';
import { Theme } from '@/theme';
import { icons, LucideIcon } from 'lucide-react-native';

interface IconProps {
  name: keyof typeof icons;
  size?: number;
  color?: keyof Theme['colors'];
  strokeWidth?: number;
}

export default function Icon({ name, size = 24, color = 'textPrimary', strokeWidth = 2 }: IconProps) {
  const theme = useTheme<Theme>();
  const IconComponent = icons[name] as LucideIcon;

  return <IconComponent size={size} color={theme.colors[color]} strokeWidth={strokeWidth} />;
}
