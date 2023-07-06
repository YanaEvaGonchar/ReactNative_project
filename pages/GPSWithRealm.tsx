import React, {useState, useEffect} from 'react';
import {PermissionsAndroid, Platform, Alert, StyleSheet} from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import realm from '../schemas/RouteSchema';
import {Route} from '../types/Route';
import GPSButtonGroup from '../Components/GPSButtonGroup';
import Routes from '../Components/Routes';

import {Block} from '../styled/Block';

const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'GPS Tracking needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        return false;
      }
    } catch (err) {
      return false;
    }
  } else if (Platform.OS === 'ios') {
    Geolocation.requestAuthorization();
  }
  return true;
};

const useLocationTracking = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    timestamp: number;
  } | null>(null);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const timestamp = position.timestamp;

        setLocation({latitude, longitude, timestamp});
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        interval: 1000,
        fastestInterval: 500,
      },
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  return location;
};

const GPSWithRealm = () => {
  const [watchId, setWatchId] = useState<number | null>(null);
  const [routeId, setRouteId] = useState<string | null>(null);
  const [lastFirestoreUpdate, setLastFirestoreUpdate] = useState<number>(
    Date.now(),
  );
  const [isRoutesVisible, setIsRoutesVisible] = useState(false);
  const [routes, setRoutes] = useState<Route[]>([]);
  const location = useLocationTracking();
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  useEffect(() => {
    setRoutes(getRoutes());
  }, []);

  const getRoutes = (): Route[] => {
    const routes = realm.objects<Route>('Route');
    return Array.from(routes);
  };

  const startTracking = async () => {
    const hasLocationPermission: boolean = await requestLocationPermission();
    if (!hasLocationPermission) {
      return;
    }

    const newRouteId = Math.random().toString(36).substring(2, 16);

    const startTime = new Date();
    realm.write(() => {
      realm.create('Route', {
        id: newRouteId,
        startTime: startTime,
      });
    });

    if (location) {
      const {latitude, longitude, timestamp} = location;
      await addToRealm(newRouteId, latitude, longitude, timestamp);
    } else {
      return;
    }

    Alert.alert('Tracking is active');
  };

  const addToRealm = async (
    newRouteId: string,
    latitude: number,
    longitude: number,
    timestamp: number,
  ) => {
    if (timestamp - lastFirestoreUpdate >= 10000) {
      realm.write(() => {
        const route = realm
          .objects<Route>('Route')
          .filtered(`id == "${newRouteId}"`)[0];
        route.locations.push({latitude, longitude, timestamp});
      });
      setLastFirestoreUpdate(timestamp);
    }
  };

  const stopTracking = async (idToStop?: string) => {
    if (watchId !== null) {
      setWatchId(null);

      const id = idToStop ?? routeId;
      if (id !== null) {
        const endTime = new Date();
        realm.write(() => {
          const route = realm
            .objects<Route>('Route')
            .filtered(`id == "${id}"`)[0];
          route.endTime = endTime;
        });
        setRouteId(null);
      }
    }

    Alert.alert('Tracking has been stopped');
    setRoutes(getRoutes());
  };

  const handleRouteSelect = (route: Route) => {
    setSelectedRoute(route);
    setIsRoutesVisible(false);
  };

  const deleteRoute = (routeId: string) => {
    realm.write(() => {
      const route = realm
        .objects<Route>('Route')
        .filtered(`id == "${routeId}"`)[0];
      realm.delete(route);
    });
    setSelectedRoute(null);
    setRoutes(getRoutes());
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
        {selectedRoute && selectedRoute.locations.length > 0 && (
          <>
            {selectedRoute.locations[0] && (
              <Marker
                coordinate={{
                  latitude: selectedRoute.locations[0].latitude,
                  longitude: selectedRoute.locations[0].longitude,
                }}
              />
            )}
            {selectedRoute.locations[selectedRoute.locations.length - 1] && (
              <Marker
                coordinate={{
                  latitude:
                    selectedRoute.locations[selectedRoute.locations.length - 1]
                      .latitude,
                  longitude:
                    selectedRoute.locations[selectedRoute.locations.length - 1]
                      .longitude,
                }}
              />
            )}
            {selectedRoute.locations[0] &&
              selectedRoute.locations[selectedRoute.locations.length - 1] && (
                <MapViewDirections
                  origin={{
                    latitude: selectedRoute.locations[0].latitude,
                    longitude: selectedRoute.locations[0].longitude,
                  }}
                  destination={{
                    latitude:
                      selectedRoute.locations[
                        selectedRoute.locations.length - 1
                      ].latitude,
                    longitude:
                      selectedRoute.locations[
                        selectedRoute.locations.length - 1
                      ].longitude,
                  }}
                  apikey={'AIzaSyBTlBDKwEMqQGW6PZan_DukLWT9tBC-BmM'}
                  strokeWidth={3}
                  strokeColor="red"
                  onReady={result => {
                    console.log('Directions Result:', result);
                  }}
                  onError={errorMessage => {
                    console.log('Directions Error:', errorMessage);
                  }}
                />
              )}
          </>
        )}
      </MapView>
      <GPSButtonGroup
        onStartTracking={startTracking}
        onStopTracking={stopTracking}
        onShowRoutes={() => setIsRoutesVisible(true)}
      />
      <Routes
        isRoutesVisible={isRoutesVisible}
        onClose={() => setIsRoutesVisible(false)}
        routes={routes}
        onRouteSelect={handleRouteSelect}
        onRouteDelete={deleteRoute}
      />
    </Block>
  );
};

export default GPSWithRealm;
