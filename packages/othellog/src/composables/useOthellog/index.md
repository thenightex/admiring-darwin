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

function doLogs(): void {
  // TODO add example and implement the test
  logger.capture
  logger.captureMessage
}

/*
onMounted(() => {
  logger
})
*/
</script>

<template>
  <button @click="doLogs">
</template>
```
