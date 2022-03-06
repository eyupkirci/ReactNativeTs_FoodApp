import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ButtonProps {
    onTap: Function,

}


const ButtonAddRemove: React.FC<ButtonProps> = ({ onTap}) => {


        return(
            
                <TouchableOpacity style={styles.btn}>
                    <Text style={{fontSize:18, color: '#FFF'}} >Add</Text>
                </TouchableOpacity>
                
           
        )
}

const styles = StyleSheet.create({
    btn:{ display: 'flex', justifyContent: 'center', alignItems:'center', width:60, height:40, alignSelf:'center', borderRadius:30, backgroundColor: '#f15b5b'}
})
export { ButtonAddRemove }