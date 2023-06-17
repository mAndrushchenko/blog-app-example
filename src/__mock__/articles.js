export const ARTICLES_MOCK = Array.from({length: 30}, (_, index) => ({
  id: index + 1,
  title: `Article Title ${index + 1}`,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  body: `Article body content for article number ${index + 1}. This is a mock article used for testing purposes.`,
}));
