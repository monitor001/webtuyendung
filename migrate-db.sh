#!/bin/bash

echo "🗄️ Running database migration..."

# Set the app name
BACKEND_APP="jobconnect-vietnam-backend"

# Run database migration
heroku run "psql \$DATABASE_URL -f database.sql" --app $BACKEND_APP

echo "✅ Database migration completed!" 