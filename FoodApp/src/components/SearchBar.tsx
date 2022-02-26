import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';

interface SearchBarProps {
    onEndEditing: any | undefined,
    didTouch?: any | undefined,
    autoFocus?: boolean | undefined,
    onTextChange: Function
}

const SearchBar: React.FC<SearchBarProps> = ({ onEndEditing, didTouch, autoFocus = false, onTextChange }) => {

    return(
        <View style={styles.container} >
            <View style={styles.searchBar} >
                <Image style={{width: 20, height: 20}} source={require('../images/search.png')} />
                    <TextInput 
                        style={styles.textInput}
                        placeholder={'Search Foods'}
                        autoFocus={autoFocus}
                        onTouchStart={didTouch}
                        onChangeText={(text) => onTextChange(text)}
                        onEndEditing={onEndEditing}
                        keyboardType='numeric'
                        showSoftInputOnFocus={false}
                    />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 44,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
    },
    searchBar: {
        flex: 1,
        display: "flex",
        height: 35,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: "#E5E5E5",
        borderWidth: 2,
        backgroundColor: "#E5E5E5",
    },
    textInput: {
        marginLeft: 5,
        flex: 9,
        display: "flex",
        fontSize: 20,
        height: 42
    }
})

export { SearchBar }