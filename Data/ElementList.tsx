import { Columns2, Facebook, Frame, Framer, Image, Link2, PanelTop, Projector, RectangleEllipsis, SquareSplitVertical, Text, TextSelectionIcon, Twitter } from "lucide-react";

export const ElementList = [



    {
        icon: RectangleEllipsis,
        label: 'Button',
        type: 'Button',
        content: 'Sample Button',
        url: '#',
        style: {
            textAlign: 'center',
            backgroundColor: '#007bff',
            color: '#ffffff',
            padding: '10px',
            width: 'auto',
            fontSize: '16px',
            borderRadius: '0px',
            fontWeight: 'normal',
            objectFit: 'contain',

        },
        outerStyle: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
        }
    },





    {
        icon: RectangleEllipsis,
        label: 'CTA Button',
        type: 'Button',
        content: 'Get Started Now',
        url: '#',
        style: {
            textAlign: 'center',
            backgroundColor: '#FF4D4D',
            color: '#ffffff',
            padding: '15px 30px',
            width: 'auto',
            fontSize: '18px',
            borderRadius: '8px',
            fontWeight: 'bold',
            objectFit: 'contain',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'pointer',
            border: 'none',
            textTransform: 'uppercase',
            letterSpacing: '1px',
        },
        outerStyle: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            margin: '20px 0',
        }
    },
    {
        icon: TextSelectionIcon,
        type: 'Text',
        label: 'Text',
        textarea: 'Sample Text',
        style: {
            backgroundColor: '#7a3e3e',
            color: '#000000',
            padding: '10px',
            textAlign: 'left',
            fontSize: '22px',
            fontWeight: 'normal',
            textTransform: 'uppercase'//lowercase , capitilized
        },
        outerStyle: {
            backgroundColor: '#7a3e3e',
            width: '100%'
        }
    },
    {
        icon: Image,
        type: 'Image',
        label: 'Image',
        imageUrl: "/image.jfif",
        alt: 'Image',
        url: '#',
        style: {
            backgroundColor: '#ffffff',
            padding: '10px',
            height: '50%',
            width: '100%',
            margin: '0px',
            borderRadius: '0px'
        },
        outerStyle: {
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff'
        }
    },
    {
        icon: Frame,
        type: 'Logo',
        label: 'Logo',
        imageUrl: "/logo.svg",
        alt: 'logo',
        url: '#',
        style: {
            backgroundColor: '#ffffff',
            padding: '10px',
            height: '30%',
            width: '100%',
        },
        outerStyle: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            width: '100%'
        }
    },
    
    {
        icon: SquareSplitVertical,
        type: 'Divider',
        label: 'Divider',
        content: '',
        style: {
            color: '#000000',
            padding: '10px',
            width: '100%'
        }
    },
    {
        icon: Columns2,
        type: 'Spacer',
        label: 'Spacer',
        content: '',
        style: {
            height: '20px',
            width: '100%',
            backgroundColor: 'transparent'
        },
        outerStyle: {
            width: '100%'
        }
    },


   
]


