import React, {useState} from 'react';
import MapView, {Polyline, LatLng, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {Alert, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import GPSButtonGroup from '../Components/GPSButtonGroup';
import {Block} from '../styled/Block';

const GPSNavigation: React.FC = () => {
  const [path, setPath] = useState<LatLng[]>([]);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [pathId, setPathId] = useState<string | null>(null);
  const [lastFirestoreUpdate, setLastFirestoreUpdate] = useState<number>(
    Date.now(),
  );
  const [isPathOnScreen, setIsPathOnScreen] = useState(true);

  const getLocationPermission = async () => {
    Geolocation.requestAuthorization();
  };

  const addToFirestore = async (
    newPathId: string,
    latitude: number,
    longitude: number,
    timestamp: number,
  ) => {
    if (timestamp - lastFirestoreUpdate >= 10000) {
      await firestore()
        .collection('paths')
        .doc(newPathId)
        .collection('locationPoints')
        .add({latitude, longitude, timestamp});
      setLastFirestoreUpdate(timestamp);
    }
  };

  const startTracking = async () => {
    await getLocationPermission();

    const newPathId = firestore().collection('paths').doc().id;
    setPathId(newPathId);

    const startTime = new Date();
    await firestore()
      .collection('paths')
      .doc(newPathId)
      .set({startTime: startTime.toISOString()});

    const id = Geolocation.watchPosition(
      async position => {
        const {latitude, longitude} = position.coords;
        const timestamp = Date.now();

        setPath(currentRoute => {
          const newPath = [...currentRoute, {latitude, longitude}];
          while (newPath.length > 1000) {
            newPath.shift();
          }
          return newPath;
        });

        await addToFirestore(newPathId, latitude, longitude, timestamp);
      },
      error => console.log(error),
      {distanceFilter: 10, interval: 1000, fastestInterval: 500},
    );

    setWatchId(id);

    Alert.alert('Tracking is active');
  };

  const stopTracking = async (idToStop?: string) => {
    if (watchId !== null) {
      Geolocation.clearWatch(watchId);
      setWatchId(null);

      const id = idToStop ?? pathId;
      if (id !== null) {
        const endTime = new Date();
        await firestore()
          .collection('paths')
          .doc(id)
          .set({endTime: endTime.toISOString()}, {merge: true});
        setPathId(null);
      }
    }

    Alert.alert('Tracking has been stopped');
  };

  const showPath = () => {
    if (isPathOnScreen) {
      setIsPathOnScreen(false);
    } else {
      setIsPathOnScreen(true);
    }
  };

  return (
    <Block flex={1}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFill}
        showsMyLocationButton={true}
        followsUserLocation={true}
        showsUserLocation={true}
        zoomControlEnabled={true}>
        {isPathOnScreen && (
          <Polyline coordinates={path} strokeWidth={3} strokeColor={'blue'} />
        )}
      </MapView>
      <Block position={'absolute'} bottom={'20px'} width={'100%'}>
        <GPSButtonGroup
          startTracking={startTracking}
          stopTracking={stopTracking}
          showPath={showPath}
          isPathOnScreen={isPathOnScreen}
        />
      </Block>
    </Block>
  );
};

export default GPSNavigation;
