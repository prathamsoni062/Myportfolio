const CustomIconSet : Record<string, CustomIcon> ={

    close_Icon:{
        iconUrl: 'assets/icons/close.svg'
    },
    error_Icon:{
        iconUrl: 'assets/icons/error-Icon.svg'
    },
} as const;

interface CustomIcon {
  iconUrl: string;
}

export default CustomIconSet;