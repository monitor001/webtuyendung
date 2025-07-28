#!/bin/bash

echo "🚀 Starting Heroku deployment..."

# Set the app name
APP_NAME="jobconnect-vietnam-app"

echo "📦 Building frontend..."
npm run build

echo "🔧 Setting up Heroku environment variables..."
heroku config:set NODE_ENV=production --app $APP_NAME
heroku config:set JWT_SECRET=$(openssl rand -base64 32) --app $APP_NAME
heroku config:set SESSION_SECRET=$(openssl rand -base64 32) --app $APP_NAME

echo "🗄️ Setting up database..."
# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 30

# Check if database is ready
DB_STATUS=$(heroku addons:info postgresql-convex-52815 --app $APP_NAME | grep "State:" | awk '{print $2}')
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
if ! git remote | grep -q heroku; then
    git remote add heroku https://git.heroku.com/$APP_NAME.git
fi

# Commit changes
git add .
git commit -m "Deploy to Heroku"

# Push to Heroku
git push heroku main

echo "🎉 Deployment completed!"
echo "🌍 Your app is available at: https://$APP_NAME.herokuapp.com"

echo "📋 Next steps:"
echo "1. Run database migrations: heroku run 'psql $DATABASE_URL -f database.sql' --app $APP_NAME"
echo "2. Check logs: heroku logs --tail --app $APP_NAME"
echo "3. Open app: heroku open --app $APP_NAME" 