---
category: Utilities
---

# useOthellog

Basic opinionated logging utilites for OTel (OpenTelemetry Logging)

## Usage

```vue
<script setup lang="ts">
import { unrefElement } from '@thenightex/othellog'
import { onMounted, useTemplateRef } from 'vue'

const logger = useOthellog()

onMounted(() => {
  logger
})
</script>

<template>
  <div ref="div" />
  <HelloWorld ref="hello" />
</template>
```
