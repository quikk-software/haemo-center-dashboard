FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json ./
RUN yarn install

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --chown=nextjs:nodejs package.json ./
COPY --from=builder --chown=nextjs:nodejs /app/next.config.js ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/BUILD_ID /app/.next/BUILD_ID
COPY --from=builder --chown=nextjs:nodejs /app/.next/build-manifest.json /app/.next/build-manifest.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/export-marker.json /app/.next/export-marker.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/images-manifest.json /app/.next/images-manifest.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/next-minimal-server.js.nft.json /app/.next/next-minimal-server.js.nft.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/next-server.js.nft.json /app/.next/next-server.js.nft.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/prerender-manifest.js /app/.next/prerender-manifest.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/prerender-manifest.json /app/.next/prerender-manifest.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/react-loadable-manifest.json /app/.next/react-loadable-manifest.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/required-server-files.json /app/.next/required-server-files.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/routes-manifest.json /app/.next/routes-manifest.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/trace /app/.next/trace
COPY --from=builder --chown=nextjs:nodejs /app/.next/server /app/.next/server
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]
