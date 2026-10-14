import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ArticleCard from "../../../components/article-card";
import { Article, ARTICLES } from "../../../data/articles";
import { SafeAreaView } from "react-native-safe-area-context";
const CATEGORIES = [...new Set(ARTICLES.map((a) => a.category))];

export default function ArticleList() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filtered = selectedCategory
    ? ARTICLES.filter((a) => a.category === selectedCategory)
    : ARTICLES;

  const handlePress = (article: Article) => {
    router.push({
      pathname: "/(home)/[id]",
      params: { id: article.id },
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ArticleCard article={item} onPress={handlePress} />
        )}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.pills}
            >
              {[null, ...CATEGORIES].map((category) => {
                const active = category === selectedCategory;
                return (
                  <Pressable
                    key={category ?? "all"}
                    onPress={() => setSelectedCategory(category)}
                    style={[styles.pill, active && styles.pillActive]}
                  >
                    <Text
                      style={[styles.pillText, active && styles.pillTextActive]}
                    >
                      {category ?? "All"}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
            <Text style={styles.listHeaderText}>{filtered.length} stories</Text>
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

  pills: { gap: 8, paddingBottom: 12 },

  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#1D4ED8",
    backgroundColor: "transparent",
  },

  pillActive: { backgroundColor: "#1D4ED8" },

  pillText: { fontSize: 14, color: "#1D4ED8", fontWeight: "500" },

  pillTextActive: { color: "#FFFFFF" },

  listHeaderText: {
    fontSize: 12,
    color: "#94A3B8",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
