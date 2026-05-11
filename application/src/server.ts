import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🍎 The Daily Harvest API is running on http://localhost:${PORT}`);
  console.log(`   API endpoints: http://localhost:${PORT}/api`);
  console.log(`   Health check:  http://localhost:${PORT}/health`);
});
