import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import useTheme from '../../hooks/useTheme';
import useCurrentUser from '../../hooks/useUser';
import usePosts from '../../hooks/usePosts';
import { useState } from 'react'


export default function HomeScreen() {
  const [isLiked, setIsLiked] = useState(false);

  const { Colors, Fonts, Gutters, Layout, FontSize } = useTheme();

  const { user, loading: userLoading, error: userError } = useCurrentUser();

  const { posts, loading: postsLoading, error: postsError } = usePosts();

  const currentUser = user?.currentUser;

  const profileSection = (
    <View style={[Layout.center, Gutters.smallHPadding, Gutters.smallTPadding, Gutters.ltinyBPadding, { backgroundColor: '#F6F6F6' }]}>
      {currentUser?.profileImage ? (
        <Image
          source={{ uri: currentUser.profileImage }}
          style={[Layout.center, { width: 100, height: 100, borderRadius: 29 }]}
          resizeMode="cover"
        />

      ) : (
        <View style={{}}>
          <Ionicons name="person" size={40} color="#999" />
        </View>
      )}

      <View style={[Layout.row, Layout.alignItemsCenter, Gutters.defTMargin, Gutters.defHPadding, Gutters.microVPadding, { gap: 6, borderRadius: 20, backgroundColor: '#f0f8f8', borderWidth: 1, borderColor: '#CFEBE9' }]}>
        <MaterialIcons name="join-inner" size={14} color={Colors.primary} />
        <Text style={[Fonts.tiny, { color: '#898989' }]}>
          {currentUser?.connects ?? 2} Connects
        </Text>
      </View>

      <Text style={[Gutters.defTMargin, Fonts.regular, { fontWeight: '700', color: '#222' }]}>
        {currentUser?.name}
      </Text>

      <Text style={[Fonts.tiny, Gutters.microMargin, { color: '#666' }]}>
        {currentUser?.occupation}
      </Text>
    </View>
  );

  const renderPost = ({ item }) => (
    <View style={[Gutters.defTPadding, { backgroundColor: '#fff' }]}>
      <View style={[Layout.row, Layout.alignItemsCenter, Gutters.tinyBMargin, Gutters.defHPadding]}>
        {item.author?.profileImage ? (
          <Image
            source={{ uri: item.author.profileImage }}
            style={[Layout.center, Gutters.lmicroRMargin, { width: 38, height: 38, borderRadius: 50, borderWidth: 1, borderColor: '#d0d0d0' }]}
            resizeMode="cover"
          />
        ) : (
          <View style={{}}>
            <Ionicons name="medkit" size={22} color="#fff" />
          </View>
        )}

        <View style={{}}>
          <Text style={[Fonts.small, { fontWeight: '700', color: '#111' }]}>
            {item.author?.name}
          </Text>

          <Text style={[Fonts.tiny, { color: '#666' }]}>
            {item.author?.occupation}
          </Text>
        </View>
      </View>

      <Text style={[Fonts.ltiny, Gutters.tinyBMargin, Gutters.defHPadding, { color: '#000', fontWeight: '600' }]}>
        {item.content}
      </Text>

      {item.image ? (
        <Image
          source={{ uri: item.image }}
          style={{ width: '100%', height: 400, backgroundColor: '#cfe3e6' }}
          resizeMode="cover"
        />
      ) : null}

      <View style={[Layout.justifyContentBetween, Layout.row, Gutters.defHPadding, Gutters.tinyVPadding, { borderBottomWidth: 5, borderBottomColor: '#ededed' }]}>
        <TouchableOpacity style={[Layout.row]}onPress={() => setIsLiked(!isLiked)}>
          <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={22} color={isLiked ? 'red' : '#555'}/>
          <Text style={[Fonts.ltiny, Gutters.smicroLMargin, { color: Colors.textSecondary, top: 3 }]}> 5</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[Layout.row]} onPress={() => { }}>
          <Ionicons name="paper-plane-outline" size={22} color="#555" />
          <Text style={[Fonts.ltiny, Gutters.smicroLMargin, { color: Colors.textSecondary, top: 3 }]}> 3</Text>
        </TouchableOpacity>
      </View>

    </View>
  );

  const errorTextStyle = [
    Layout.fill, 
    Fonts.tiny,
    Layout.center, 
    Gutters.lmicroTMargin,
    { color: Colors.error, textAlign: 'center', lineHeight: 20 },
  ];

  const loadingTextStyle = [
    Fonts.small,
    Layout.alignItemsCenter,
    Gutters.microTMargin,
    { color: Colors.primary, letterSpacing: 0.2 },
  ];

  const profileHeader = userLoading ? (
    <View style={[Layout.center, { marginBottom: 12, transform: [{ scale: 1.1 }] }]}>
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text style={[loadingTextStyle]}>Loading profile...</Text>
    </View>
  ) : userError ? (
    <View style={[errorTextStyle]}>
      <Text>Unable to load profile. Please try again!.</Text>
    </View>
  ) : (
    profileSection
  );

  const postsFooter = postsLoading ? (
    <View style={[Layout.center, { marginBottom: 12, transform: [{ scale: 1.1 }] }]}>
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text style={[loadingTextStyle]}>Loading posts...</Text>
    </View>
  ) : postsError ? (
    <Text style={[errorTextStyle]}>Unable to load posts. Please try again!.</Text>
  ) : null;

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.white }]}>
      <View style={[Layout.row, Layout.justifyContentBetween, Gutters.defHPadding, Gutters.defVPadding, {
      }]}>

        <Text style={[{ letterSpacing: 0.3 }]}>
          <Text style={[Fonts.lregular, { color: '#111' }]}>Doc</Text>
          <Text style={[Fonts.lregular, { color: Colors.primary }]}>Connect</Text>
        </Text>

        <TouchableOpacity style={[Layout.center, { width: 38, height: 38, borderRadius: 10, backgroundColor: Colors.secondary }]} activeOpacity={0.8}>
          <Ionicons name="add" size={22} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={renderPost}
        ListHeaderComponent={profileHeader}
        ListFooterComponent={postsFooter}
        ListEmptyComponent={
          !postsLoading && !postsError ? (
            <Text style={[errorTextStyle]}>
              No posts available
            </Text>
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
