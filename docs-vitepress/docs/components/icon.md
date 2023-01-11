# Icon 图标

## 基础用法

```vue
<template>
    <div>
        <h-icon name="link" color="color" size="size"></h-icon>
    </div>
</template>
```

<div>
    <h-icon name="link" size='30'></h-icon>
</div>

## 徽标

```vue
<template>
    <div>
        <h-icon dot badge="1"></h-icon>
    </div>
    <div>
        <h-icon dot badge="100"></h-icon>
    </div>  
</template>
```

<div>
    <h-icon dot badge="1"></h-icon>
</div>
<div>
    <h-icon dot badge="100"></h-icon>
</div>

<style>
    .h-dot {
        display: flex;
    }
</style>

## 图标集合

<div class="icon-content">
    <div v-for="item in iconList" :key="item" class="icon-list" @click=copy(item)>
        <h-icon :name="item" size="20"></h-icon>
        <span class="icon-name">{{item}}</span>
    </div>
</div>

<script lang="ts">
import { defineComponent,ref } from 'vue';

export default defineComponent({
    setup (props) {
        const iconList = ref(['view','view_off','message','order','search','edit','link','share', 'setting','upload','download','play','region','notification','notification_off','user','sub_account','list','refresh','close_filled','check','close','check_filled','forbidden','forbidden_filled','info_filled','info','help_filled','help','caution','caution_filled','like','like_filled','star','star_filled','arrow_up','arrow_left','arrow_down','arrow_right','page_first','down_to_bottom','up_to_top','page_last','page_turning_left','page_turning_right','show_less','show_more','go-to-link','benefits'
        ])

        const copy = (item) => {
            const input = document.createElement('input');
            input.setAttribute('readonly', 'readonly');
            input.setAttribute('value', item);
            document.body.appendChild(input);
            input.select();
            if (document.execCommand('copy')) {
                document.execCommand('copy');
                console.log('复制成功');
            }
            document.body.removeChild(input);
        }

        return {
            iconList,
            copy
        }
    }
})
</script>

<style>
    .icon-content{
    overflow:hidden;
    border-top:1px solid #f5f5f5;
    border-left:1px solid #f5f5f5;
    }
    .icon-content .icon-list {
        float:left;
        width:20%;
        height:110px;
        border-right:1px solid #f5f5f5;
        border-bottom:1px solid #f5f5f5;
        padding:20px;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content: space-evenly;
        flex-wrap:wrap;
        box-sizing:border-box;
        cursor: pointer;
    }
   .icon-list .icon-name {
        color:gray;
        font-size:12px;
        width:100%;
        text-align:center
    }
</style>


## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 图标名称 | `String` | - |
| color | 图标颜色 | `String` | - |
| size | 图标大小 | `Number` | - |
| dot | 是否显示徽标 | `Boolean` | `false` |
| badge | 徽标内容 | `String` | - |
