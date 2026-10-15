import { StyleSheet } from 'react-native';

export default function ({ FontSize, Colors }) {
  return StyleSheet.create({
    mmicro: {
      fontSize: FontSize.mmicro,
      color: Colors.textWhite,
      fontFamily: 'DM-Sans-Regular',
    },
    smicro: {
      fontSize: FontSize.smicro,
      color: Colors.textWhite,
      fontFamily: 'DM-Sans-Regular',
    },
    mdmicro: {
      fontSize: FontSize.mdmicro,
      fontFamily: 'DM-Sans-Regular',
    },
    micro: {
      fontSize: FontSize.micro,
      color: Colors.textWhite,
      fontFamily: 'DM-Sans-Regular',
    },
    lmicro: {
      fontSize: FontSize.lmicro,
      fontFamily: 'DM-Sans-Regular',
    },
    microB: {
      fontSize: FontSize.micro,
      fontFamily: 'DM-Sans-Bold',
    },
    tiny: {
      fontSize: FontSize.tiny,
      fontFamily: 'DM-Sans-Regular',
    },
    ltiny: {
      fontSize: FontSize.ltiny,
      fontFamily: 'DM-Sans-Regular',
    },
    ssmall: {
      fontSize: FontSize.ssmall,
      fontFamily: 'DM-Sans-Regular',
    },
    small: {
      fontSize: FontSize.small,
      fontFamily: 'DM-Sans-Regular',
    },
    lsmall: {
      fontSize: FontSize.lsmall,
      fontFamily: 'DM-Sans-Medium',
    },
    regular: {
      fontSize: FontSize.regular,
      fontFamily: 'DM-Sans-Medium',
    },
    lregular: {
      fontSize: FontSize.lregular,
      fontFamily: 'DM-Sans-Bold',
    },
    medium: {
      fontSize: FontSize.medium,
      fontFamily: 'DM-Sans-Bold',
    },
    large: {
      fontSize: FontSize.large,
      fontFamily: 'DM-Sans-Bold',
    },
    slarge: {
      fontSize: FontSize.slarge,
      fontFamily: 'DM-Sans-Bold',
    },
    semibold: {
      fontFamily: 'DM-Sans-Medium',
    },
    italic: {
      fontFamily: 'DM-Sans-Regular',
      fontStyle: 'italic',
    },
    bold: {
      fontFamily: 'DM-Sans-Bold',
    },
    fw500: {
      fontFamily: 'DM-Sans-Medium',
    },
    fw600: {
      fontFamily: 'DMSans_600SemiBold',
    },
    fw700: {
      fontFamily: 'DMSans_700Bold',
    },
    fw300: {
      fontFamily: 'DM-Sans-Regular',
    },
    dmSans: {
      fontFamily: 'DM-Sans-Regular',
    },
    uppercase: {
      textTransform: 'uppercase',
    },
    titleSmall: {
      fontSize: FontSize.small * 1.5,
      fontFamily: 'DM-Sans-Bold',
      color: Colors.textWhite,
    },
    titleRegular: {
      fontSize: FontSize.regular * 2,
      fontFamily: 'DM-Sans-Bold',
      color: Colors.textWhite,
    },
    titleLarge: {
      fontSize: FontSize.large * 2,
      fontFamily: 'DM-Sans-Bold',
      color: Colors.textWhite,
    },
    center: {
      textAlign: 'center',
    },
    justify: {
      textAlign: 'justify',
    },
    left: {
      textAlign: 'left',
    },
    right: {
      textAlign: 'right',
    },
  });
}
