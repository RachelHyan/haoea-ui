<template>
    <div>

        <h-button type="primary" text>
            <!-- <h-icon name="edit"  ></h-icon> -->

            按钮
            <!-- <h-icon dot badge="1"></h-icon> -->
        </h-button>
        <h-button border :disabled="true" type="primary" icon="edit" iconPosition="left" size="medium">
            按钮
        </h-button>
        <h-button border circle type="warning" icon="edit" iconPosition="right" size="mini">
            按钮
        </h-button>
        <button>111</button>
    </div>
</template>

<script lang="ts" setup>
import { Button,Icon } from 'haoea-ui';
</script>

<style>
body {
    /* background-color: #000; */
}
</style>