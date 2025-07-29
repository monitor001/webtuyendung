#!/bin/bash

echo "🚀 Starting deployment process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

print_status "Building project..."
npm run build

if [ $? -ne 0 ]; then
    print_error "Build failed!"
    exit 1
fi

print_success "Build completed successfully!"

# Check git status
print_status "Checking git status..."
if [ -n "$(git status --porcelain)" ]; then
    print_status "Changes detected. Committing changes..."
    git add .
    git commit -m "Auto-deploy: $(date '+%Y-%m-%d %H:%M:%S')"
    
    print_status "Pushing to GitHub..."
    git push origin main
    
    if [ $? -eq 0 ]; then
        print_success "Successfully pushed to GitHub!"
    else
        print_error "Failed to push to GitHub!"
        exit 1
    fi
else
    print_warning "No changes to commit."
fi

# Deploy to Heroku
print_status "Deploying to Heroku..."
git push heroku main

if [ $? -eq 0 ]; then
    print_success "Successfully deployed to Heroku!"
    
    # Get app URL
    APP_URL="https://jobconnect-vietnam-app-588c0b4ff56c.herokuapp.com/"
    print_success "App is available at: $APP_URL"
    
    # Check if app is running
    print_status "Checking app status..."
    sleep 5
    
    if curl -f -s "$APP_URL" > /dev/null; then
        print_success "App is running successfully!"
    else
        print_warning "App might still be starting up. Please check manually."
    fi
    
else
    print_error "Failed to deploy to Heroku!"
    exit 1
fi

print_success "Deployment completed successfully! 🎉"
echo ""
echo "📋 Summary:"
echo "  ✅ Build completed"
echo "  ✅ Pushed to GitHub"
echo "  ✅ Deployed to Heroku"
echo "  🌍 App URL: $APP_URL"
echo ""
echo "🔗 Quick links:"
echo "  - GitHub: https://github.com/monitor001/webtuyendung"
echo "  - Heroku Dashboard: https://dashboard.heroku.com/apps/jobconnect-vietnam-app"
echo "  - App: $APP_URL" 