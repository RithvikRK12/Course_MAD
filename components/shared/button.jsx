import {View,Text, Touchable, TouchableOpacity} from 'react-native'
import React from 'react'
import colors from '../../constant/Colors'
import { ActivityIndicator } from 'react-native'
export default function Button({text,type="fill",onPress,loading})
{
    return(
        <TouchableOpacity onPress={onPress} style={{
            width:'100%',
            padding:15,
            borderRadius:15,
            marginTop:15,
            borderWidth:1,
            borderColor:colors.PRIMARY,
            backgroundColor:type=='fill'?colors.PRIMARY:colors.WHITE
        }}
        disabled={loading}>
            {!loading?<Text
            style={{
                textAlign:'center',
                fontSize:18,
                color:type=='fill'?colors.WHITE:colors.PRIMARY
            }}>{text}</Text>:
            <ActivityIndicator size={'small'} color={type=='fill'?colors.WHITE:colors.PRIMARY}/>}
        </TouchableOpacity>
    )
}