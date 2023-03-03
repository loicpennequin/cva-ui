import { cva, type VariantProps } from 'class-variance-authority';
import { NuxtLink } from '#components';
import openProps from 'open-props';
import { ColorScheme } from '@ui/utils/types';

const BUTTON_SIZES = {
  sm: 0,
  md: 1,
  lg: 2,
  xl: 3
} as const;

const HIGH_LUMINANCE_SCHEMES: ColorScheme[] = [
  'yellow',
  'lime',
  'green',
  'teal',
  'cyan'
];

const button = cva('button', {
  variants: {
    variant: {
      full: 'full',
      outlined: 'outlined',
      ghost: 'ghost'
    }
  },
  defaultVariants: {
    variant: 'full'
  }
});

export type ButtonProps = Required<VariantProps<typeof button>> & {
  colorScheme?: ColorScheme;
  size?: keyof typeof BUTTON_SIZES;
};

export type ButtonStyle = {
  color: string;
  colorHsl: string;
  hoverColor: string;
  hoverColorHsl: string;
  focusColor: string;
  focusColorHsl: string;
  textColor: string;
  fontSize: string;
};

const defaultColors: Omit<ButtonStyle, 'fontSize'> = {
  color: openProps.gray10,
  colorHsl: openProps.gray10Hsl,
  hoverColor: openProps.gray8,
  hoverColorHsl: openProps.gray8Hsl,
  focusColor: openProps.gray7,
  focusColorHsl: openProps.gray7Hsl,
  textColor: openProps.gray1
};

export const useButton = (props: ButtonProps) => {
  const attrs = useAttrs();

  const colors = computed(() => {
    const { colorScheme } = props;
    if (!colorScheme) return defaultColors;

    const isHighLuminance = HIGH_LUMINANCE_SCHEMES.includes(colorScheme);

    return {
      color: openProps[`${colorScheme}5`],
      colorHsl: openProps[`${colorScheme}5Hsl`],
      hoverColor: openProps[`${colorScheme}6`],
      hoverColorHsl: openProps[`${colorScheme}6Hsl`],
      focusColor: openProps[`${colorScheme}7`],
      focusColorHsl: openProps[`${colorScheme}7Hsl`],
      textColor: isHighLuminance ? openProps.gray10 : openProps.gray1
    };
  });

  return {
    classes: computed(() => button(props)),

    tag: computed(() => {
      if (attrs.to) return NuxtLink;
      if (attrs.href) return 'a';

      return 'button';
    }),

    style: computed<ButtonStyle>(() => {
      const { size = 'md' } = props;

      return {
        ...colors.value,
        fontSize: openProps[`fontSize${BUTTON_SIZES[size]}`]
      };
    })
  };
};
