# Builder.io Tag Migration - Cache Key Isolation

## Overview

All cache keys for the Builder.io tag implementation now use the `_builder` suffix to isolate them from production Wix cache keys.

## Cache Key Mapping

| Purpose | Cache Key | TTL | Source |
|---------|-----------|-----|--------|
| Raw Builder.io tags (internal) | `builder-tags-raw_builder.json` | 4 hours | Builder.io SDK |
| Transformed tags (Wix format) | `tags_builder.json` | 4 hours | Transformed from Builder.io |
| Tags with popularity | `tags-with-popularity_builder.json` | 4 hours | Calculated from Builder.io tags + pages |

## Changed Files

### Core Implementation
- `app/utils/builderTagUtils.ts` - Updated cache key and invalidation calls
- `app/api/tags/route.ts` - Updated GET and POST endpoints
- `app/api/tags-with-popularity/route.ts` - Updated cache key and fetch
- `app/services/cacheWarmer.ts` - Updated cache warming logic

### Documentation
- `specs/004-tags-builder-migration/quickstart.md` - Updated examples and references

## Benefits

✅ **Isolated Testing** - Builder.io implementation won't interfere with production Wix cache  
✅ **Safe Deployment** - Can test Builder.io tags without affecting live users  
✅ **Clear Separation** - Easy to identify which cache keys are for Builder.io vs Wix  
✅ **Gradual Migration** - Can run both systems side-by-side if needed  

## Testing

After starting the dev server, clear and rebuild caches:

```bash
# Clear all caches
curl -X POST http://localhost:3000/api/invalidate-cache -H "Content-Type: application/json" -d '{"key":"*"}'

# Rebuild Builder.io tag cache
curl -X POST http://localhost:3000/api/tags

# Verify tags are cached
curl -s http://localhost:3000/api/tags | jq 'length'
# Should return: 3082

# Verify popularity calculation
curl -s http://localhost:3000/api/tags-with-popularity | jq '.[0:2]'
```

## Cache Invalidation

When tags are created or updated, all three Builder.io cache keys are invalidated:

```typescript
await RedisCacheService.invalidateCache("builder-tags-raw_builder.json");
await RedisCacheService.invalidateCache("tags_builder.json");
await RedisCacheService.invalidateCache("tags-with-popularity_builder.json");
```

## Migration Path

When ready to switch from Wix to Builder.io in production:

1. Deploy code with `_builder` suffix (current state)
2. Test thoroughly in staging/preview
3. When ready for cutover:
   - Option A: Remove `_builder` suffix from all keys
   - Option B: Update production to read from `_builder` keys
   - Option C: Keep `_builder` suffix as permanent marker

Recommendation: **Keep the `_builder` suffix** permanently to clearly identify Builder.io-sourced cache entries.
