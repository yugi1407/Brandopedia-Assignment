import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useMemo, useState, useEffect } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, Image, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useTheme from '../../hooks/useTheme';
import useCurrentUser from '../../hooks/useUser';
import { requestConnection } from '../../services/connection';

function ProfileCard({ item, requested, connecting, onConnect }) {
  const { Colors, Fonts, Gutters, Layout } = useTheme();

  return (
    <View style={[Gutters.tinyBMargin, { width: '48%', borderRadius: 18, overflow: 'hidden', backgroundColor: Colors.white }]}>

      <View style={[Layout.row, Layout.alignItemsCenter, Layout.justifyContentCenter, Gutters.microVPadding, { gap: 7, backgroundColor: '#f7fdfd' }]}>
        <MaterialIcons name="join-inner" size={14} color={Colors.primary} />
        <Text style={[Fonts.tiny, { color: Colors.textSecondary }]}> 2 Connects </Text>
      </View>

      <View style={[Layout.alignItemsCenter, Gutters.smallHPadding, Gutters.defTPadding, Gutters.smallBPadding]}>
        {item.profileImage ? (
          <Image
            source={{ uri: item.profileImage }}
            style={{ width: 58, height: 58, borderRadius: 29, backgroundColor: '#F3F3F3' }}
            resizeMode="cover"
          />
        ) : (
          <View style={[Layout.center, { width: 58, height: 58, borderRadius: 29, backgroundColor: '#E9F5F5' }]} >
            <Ionicons name="person" size={28} color={Colors.primary} />
          </View>
        )}

        <Text style={[Fonts.small, Fonts.fw600, Gutters.defTMargin, { color: '#222', textAlign: 'center' }]} numberOfLines={1}>
          {item.name}
        </Text>

        <Text style={[Fonts.tiny, Gutters.microTMargin, Gutters.smallBMargin, { color: Colors.textSecondary, textAlign: 'center' }]} numberOfLines={1}>
          {item.occupation}
        </Text>

        <TouchableOpacity
          style={[Layout.row, Layout.alignItemsCenter, Layout.justifyContentCenter, { alignSelf: 'stretch', height: 30, borderRadius: 8, gap: 8, backgroundColor: requested ? '#E9F5F5' : Colors.primary, opacity: connecting ? 0.7 : 1 }]}
          activeOpacity={0.8}
          disabled={requested || connecting}
          onPress={() => onConnect(item._id)}
        >
          {connecting ? (
            <ActivityIndicator
              size="small"
              color={Colors.white}
            />
          ) : (
            <>
              <Ionicons
                name={requested ? 'checkmark-circle' : 'person-add'}
                size={17}
                color={requested ? Colors.primary : Colors.white}
              />
              <Text style={[Fonts.ssmall, { fontWeight: '600', color: requested ? Colors.primary : Colors.white }]}>
                {requested ? 'Requested' : 'Connect'}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function Discover() {
  const { Colors, Fonts, Gutters, Layout } = useTheme();

  const { user, loading, error } = useCurrentUser();

  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [requestedIds, setRequestedIds] = useState([]);
  const [connectingIds, setConnectingIds] = useState([]);

  useEffect(() => {
    if (user) {
      setData(user.users || []);
      setRequestedIds(user.requestedUserIds || []);
    }
  }, [user]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return data;

    return data.filter(
      (person) =>
        person.name?.toLowerCase().includes(q) ||
        person.occupation?.toLowerCase().includes(q)
    );
  }, [query, data]);



  const handleConnect = async (receiverId) => {
    const currentUserId = user?.currentUser?._id;

    if (
      !currentUserId ||
      !receiverId ||
      requestedIds.includes(receiverId) ||
      connectingIds.includes(receiverId)
    ) {
      return;
    }

    setConnectingIds((prev) => [...prev, receiverId]);

    try {
      await requestConnection(currentUserId, receiverId);

      setRequestedIds((prev) =>
        prev.includes(receiverId)
          ? prev
          : [...prev, receiverId]
      );
    } catch (err) {
      Alert.alert(
        'Connection request failed',
        err.message || 'Please try again.'
      );
    } finally {
      setConnectingIds((prev) =>
        prev.filter((id) => id !== receiverId)
      );
    }
  };


  const errorTextStyle = [
    Layout.fill,
    Fonts.tiny,
    Layout.center,
    Gutters.lmicroTMargin,
    {
      color: Colors.error,
      textAlign: 'center',
      lineHeight: 20,
    },
  ];

  const loadingTextStyle = [
    Fonts.small,
    Layout.alignItemsCenter,
    Gutters.microTMargin,
    {
      color: Colors.primary,
      letterSpacing: 0.2,
    },
  ];

  if (loading) {
    return (
      <SafeAreaView
        style={[Layout.fill, { backgroundColor: Colors.white }]}
        edges={['top']}
      >
        <View style={[Layout.fill, Layout.center]}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={loadingTextStyle}>
            Loading profiles...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={[Layout.fill, { backgroundColor: Colors.white }]}
        edges={['top']}
      >
        <View style={[Layout.fill, Layout.center, Gutters.defHPadding]}>
          <Ionicons
            name="alert-circle-outline"
            size={30}
            color={Colors.error}
          />
          <Text style={errorTextStyle}>
            {typeof error === 'string'
              ? error
              : error.message || 'Unable to load profiles. Please try again.'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View
      style={[Layout.fill, { backgroundColor: '#F7F7F7' }]}
      edges={['top']}
    >
      <View
        style={[
          Gutters.defHPadding,
          Gutters.smallTPadding,
          Gutters.smallBPadding,
          {
            backgroundColor: Colors.white,
            borderBottomWidth: 2,
            borderBottomColor: '#EFEFEF',
          },
        ]}
      >
        <View
          style={[
            Layout.row,
            Layout.alignItemsCenter,
            Gutters.defHPadding,
            {
              height: 48,
              borderRadius: 16,
              backgroundColor: '#F3F3F3',
            },
          ]}
        >
          <Ionicons
            name="search"
            size={22}
            color={Colors.textSecondary}
          />

          <TextInput
            style={[
              Fonts.small,
              Layout.fill,
              {
                marginLeft: 10,
                color: '#111',
                paddingVertical: 0,
              },
            ]}
            placeholder="Search profiles, organizations..."
            placeholderTextColor="#8A8A8A"
            value={query}
            onChangeText={setQuery}
          />
        </View>

        <Text
          style={[
            Fonts.small,
            Gutters.defTMargin,
            { color: Colors.textSecondary },
          ]}
        >
          People you may know
        </Text>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item._id}
        numColumns={2}
        renderItem={({ item }) => (
          <ProfileCard
            item={item}
            requested={requestedIds.includes(item._id)}
            connecting={connectingIds.includes(item._id)}
            onConnect={handleConnect}
          />
        )}
        columnWrapperStyle={[
          Layout.justifyContentBetween,
        ]}
        contentContainerStyle={[
          Gutters.defHPadding,
          Gutters.defTPadding,
          Gutters.smallBPadding,
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={[Layout.center, Gutters.defTPadding]}>
            <Ionicons
              name="people-outline"
              size={32}
              color={Colors.textSecondary}
            />
            <Text style={errorTextStyle}>
              {query.trim()
                ? 'No matching profiles found.'
                : 'No profiles available.'}
            </Text>
          </View>
        }
      />
    </View>
  );
}