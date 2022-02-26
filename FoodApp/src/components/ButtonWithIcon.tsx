import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';

interface ButtonProps {
    onTap: Function,
    width: number,
    height: number,
    icon: ImageSourcePropType
}

const ButtonWithIcon: React.FC<ButtonProps> = ({ onTap, width, height, icon }) => {
    
    return(
        <TouchableOpacity style={[styles.button, { width, height }]} 
            onPress={() => onTap()}
        >
            <Image style={{width: (width - 3), height: (height - 3)}} source={icon} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        height: 20
    }
})

export { ButtonWithIcon }