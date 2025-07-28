#!/bin/bash

echo "🚀 Deploying backend to Heroku..."

# Set the app name
BACKEND_APP="jobconnect-vietnam-backend"

echo "📦 Installing backend dependencies..."
npm install

echo "🔧 Setting up Heroku environment variables..."
heroku config:set NODE_ENV=production --app $BACKEND_APP
heroku config:set JWT_SECRET=your-super-secret-jwt-key-for-production-change-this-in-production --app $BACKEND_APP
heroku config:set SESSION_SECRET=your-super-secret-session-key-for-production-change-this-in-production --app $BACKEND_APP

echo "🗄️ Setting up database..."
# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 30

# Check if database is ready
DB_STATUS=$(heroku addons:info postgresql-reticulated-78283 --app $BACKEND_APP | grep "State:" | awk '{print $2}')
if [ "$DB_STATUS" != "available" ]; then
    echo "❌ Database is not ready yet. Please wait and try again."
    exit 1
fi

echo "✅ Database is ready!"

echo "📊 Initializing database schema..."
# Copy database.sql to backend
cp database.sql backend/

echo "🌐 Deploying to Heroku..."
# Add Heroku remote if not exists
if ! git remote | grep -q backend; then
    git remote add backend https://git.heroku.com/$BACKEND_APP.git
fi

# Commit changes
git add .
git commit -m "Deploy backend to Heroku"

# Push to Heroku
git push backend master

echo "🎉 Backend deployment completed!"
echo "🌍 Your backend API is available at: https://$BACKEND_APP.herokuapp.com"

echo "📋 Next steps:"
echo "1. Run database migrations: heroku run 'psql $DATABASE_URL -f database.sql' --app $BACKEND_APP"
echo "2. Check logs: heroku logs --tail --app $BACKEND_APP"
echo "3. Test API: curl https://$BACKEND_APP.herokuapp.com/api/jobs" 