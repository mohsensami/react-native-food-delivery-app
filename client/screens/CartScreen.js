import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import * as Icon from 'react-native-feather';
import { featured } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectResturant } from '../slices/resturantSlice';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../slices/basketSlice';

export default function CartScreen() {
    // const restaurant = featured.restaurants[0];
    const [groupedItems, setGroupedItems] = useState([]);
    const restaurant = useSelector(selectResturant);
    const navigation = useNavigation();
    const basketItems = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal);
    const deliveryFee = 2;
    const dispatch = useDispatch();
    useEffect(() => {
        const items = basketItems.reduce((group, item) => {
            if (group[item.id]) {
                group[item.id].push(item);
            } else {
                group[item.id] = [item];
            }
            return group;
        }, {});
        setGroupedItems(items);
        // console.log('items: ', items);
    }, [basketItems]);
    return (
        <View className=" bg-white flex-1">
            {/* top button */}
            <View className="relative pt-4 shadow-sm"></View>
            <TouchableOpacity
                style={{ backgroundColor: themeColors.bgColor(1) }}
                onPress={navigation.goBack}
                className="absolute z-10 rounded-full p-1 shadow top-5 left-2"
            >
                <Icon.ArrowLeft strokeWidth={3} stroke="white" />
            </TouchableOpacity>
            <View>
                <Text className="text-center font-bold text-xl">Your cart</Text>
                <Text className="text-center text-gray-500 mb-4">{restaurant.name}</Text>
            </View>

            {/* delivery time */}
            <View style={{ backgroundColor: themeColors.bgColor(0.2) }} className="flex-row px-4 items-center">
                <Image source={require('../assets/images/bikeGuy.png')} className="w-20 h-20 rounded-full" />
                <Text className="flex-1 pl-4">Deliver in 20-30 minutes</Text>
                <TouchableOpacity>
                    <Text style={{ color: themeColors.text }} className="font-bold">
                        Change
                    </Text>
                </TouchableOpacity>
            </View>

            {/* dishes */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="bg-white pt-5"
                contentContainerStyle={{
                    paddingBottom: 50,
                }}
            >
                {Object.entries(groupedItems).map(([key, items]) => {
                    let dish = items[0];
                    return (
                        <View
                            key={key}
                            className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md"
                        >
                            <Text style={{ color: themeColors.text }} className="font-bold">
                                {items.length} x{' '}
                            </Text>
                            <Image className="h-14 w-14 rounded-full" source={dish.image} />
                            <Text className="flex-1 font-bold text-gray-700">{dish?.name}</Text>
                            <Text className="font-semibold text-base">${dish?.price}</Text>
                            <TouchableOpacity
                                className="p-1 rounded-full"
                                style={{ backgroundColor: themeColors.bgColor(1) }}
                                onPress={() => dispatch(removeFromBasket({ id: dish?.id }))}
                            >
                                <Icon.Minus strokeWidth={2} height={20} width={20} stroke="white" />
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </ScrollView>

            {/* totals */}
            <View style={{ backgroundColor: themeColors.bgColor(0.2) }} className=" p-6 px-8 rounded-t-3xl space-y-4">
                <View className="flex-row justify-between">
                    <Text className="text-gray-700">Subtotal</Text>
                    <Text className="text-gray-700">${basketTotal}</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="text-gray-700">Delivery Fee</Text>
                    <Text className="text-gray-700">${deliveryFee}</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="font-extrabold">Order Total</Text>
                    <Text className="font-extrabold">${deliveryFee + basketTotal}</Text>
                </View>
                <View>
                    <TouchableOpacity
                        style={{ backgroundColor: themeColors.bgColor(1) }}
                        onPress={() => navigation.navigate('PreparingOrder')}
                        className="p-3 rounded-full"
                    >
                        <Text className="text-white text-center font-bold text-lg">Place Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
