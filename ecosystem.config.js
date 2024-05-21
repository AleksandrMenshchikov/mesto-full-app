require('dotenv')
  .config();

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_REF,
  DEPLOY_REPO,
  DEPLOY_PATH
} = process.env;

module.exports = {
  apps: [{
    name: 'backend',
    script: './packages/backend/dist/app.js',
    env_production: {
      NODE_ENV: 'production'
    }
  }],
  deploy: {
    production: {
      'user': DEPLOY_USER,
      'host': DEPLOY_HOST,
      'ref': DEPLOY_REF,
      'repo': DEPLOY_REPO,
      'path': DEPLOY_PATH,
      'pre-deploy': `scp ./.env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH} && scp ./packages/backend/.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/packages/backend`,
      'post-deploy': 'npm ci && npm run build'
    }
  }
};
