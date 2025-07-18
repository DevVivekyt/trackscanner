// src/components/RewardedAdComponent.jsx
import React, { useEffect } from 'react';
import { Button } from 'react-native';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-1403193178988874/6734136520';

export default function RewardedAdComponent() {
    const rewarded = RewardedAd.createForAdRequest(adUnitId);

    useEffect(() => {
        const showAd = () => {
            rewarded.load();
        };

        const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
            rewarded.show();
        });

        // Show ad immediately on mount
        showAd();

        return () => {
            unsubscribeLoaded();
        };
    }, []);

    return null;
}