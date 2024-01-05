import { View, Text } from 'react-native';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { featured } from '../constants';

export default function DeliveryScreen() {
    const resturant = featured.restaurants[0];
    const navigation = useNavigation();
    return (
        <View className="flex-1">
            <MapView
                initialRegion={{
                    latitude: resturant.lat,
                    longitude: resturant.lng,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                className="flex-1"
                mapType="standard"
            >
                <Marker
                    coordinate={{
                        latitude: resturant.lat,
                        longitude: resturant.lng,
                    }}
                />
            </MapView>
        </View>
    );
}
