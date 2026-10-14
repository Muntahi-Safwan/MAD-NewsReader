import { router } from "expo-router";

import { FlatList, StyleSheet, Text, View } from "react-native";

import ArticleCard from "../../../components/article-card";

import { Article, ARTICLES } from "../../../data/articles";

import { SafeAreaView } from "react-native-safe-area-context";

export default function ArticleList() {
  const handlePress = (article: Article) => {
    router.push({
      pathname: "/(home)/[id]",

      params: { id: article.id },
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={ARTICLES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ArticleCard article={item} onPress={handlePress} />
        )}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>{ARTICLES.length} stories</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F0F4F8" },

  list: { paddingTop: 12, paddingBottom: 32 },

  listHeader: { paddingHorizontal: 16, paddingBottom: 8 },

  listHeaderText: {
    fontSize: 12,
    color: "#94A3B8",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
