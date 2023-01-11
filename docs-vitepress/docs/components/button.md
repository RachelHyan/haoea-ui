# Button 按钮

## 基础用法

使用 `type`、`round`、`circle` 属性来定义按钮的样式。

<div class="example">
    <h-button>default</h-button>
    <h-button type="primary">primary</h-button>
    <h-button type="success">success</h-button>
    <h-button type="warning">warning</h-button>
    <h-button type="danger">danger</h-button>
    <br>
    <br>
    <h-button round>default</h-button>
    <h-button type="primary" round>primary</h-button>
    <h-button type="success" round>success</h-button>
    <h-button type="warning" round>warning</h-button>
    <h-button type="danger" round>danger</h-button>
    <br>
    <br>
    <h-button circle icon="edit" />
    <h-button type="primary" circle icon="message" />
    <h-button type="success" circle icon="search" />
    <h-button type="warning" circle icon="star" />
    <h-button type="danger" circle icon="like" />
</div>

::: details 查看代码

```vue
<template>
    <div>
        <h-button>default</h-button>
        <h-button type="primary">primary</h-button>
        <h-button type="success">success</h-button>
        <h-button type="warning">warning</h-button>
        <h-button type="danger">danger</h-button>


        <h-button round>default</h-button>
        <h-button type="primary" round>primary</h-button>
        <h-button type="success" round>success</h-button>
        <h-button type="warning" round>warning</h-button>
        <h-button type="danger" round>danger</h-button>


        <h-button circle icon="edit" />
        <h-button type="primary" circle icon="message" />
        <h-button type="success" circle icon="search" />
        <h-button type="warning" circle icon="star" />
        <h-button type="danger" circle icon="like" />
    </div>
</template>
```
:::

## 按钮尺寸

使用 `size` 属性来定义按钮的尺寸。

<div class="example">
    <h-button>default</h-button>
    <h-button size="medium">medium</h-button>
    <h-button size="small">small</h-button>
    <h-button size="mini">mini</h-button>
    <br>
    <br>
    <h-button round>default</h-button>
    <h-button round size="medium">medium</h-button>
    <h-button round size="small">small</h-button>
    <h-button round size="mini">mini</h-button>
    <br>
    <br>
    <h-button circle icon="edit" />
    <h-button circle size="medium" icon="edit" />
    <h-button circle size="small" icon="edit" />
    <h-button circle size="mini" icon="edit" />
</div>

::: details 查看代码

```vue
<template>
    <div>
        <h-button>default</h-button>
        <h-button size="medium">medium</h-button>
        <h-button size="small">small</h-button>
        <h-button size="mini">mini</h-button>

        <h-button round>default</h-button>
        <h-button round size="medium">medium</h-button>
        <h-button round size="small">small</h-button>
        <h-button round size="mini">mini</h-button>

        <h-button circle icon="edit" />
        <h-button circle size="medium" icon="edit" />
        <h-button circle size="small" icon="edit" />
        <h-button circle size="mini" icon="edit" />
    </div>
</template>
```
:::

## 禁用状态

使用 `disabled` 属性来定义按钮的禁用状态。

<div class="example">
    <h-button disabled>default</h-button>
    <h-button type="primary" disabled>primary</h-button>
    <h-button type="success" disabled>success</h-button>
    <h-button type="warning" disabled>warning</h-button>
    <h-button type="danger" disabled>danger</h-button>
</div>

::: details 查看代码

```vue
<template>
    <div>
        <h-button disabled>default</h-button>
        <h-button type="primary" disabled>primary</h-button>
        <h-button type="success" disabled>success</h-button>
        <h-button type="warning" disabled>warning</h-button>
        <h-button type="danger" disabled>danger</h-button>
    </div>
</template>
```
:::

## 加载状态

使用 `loading` 属性来定义按钮的加载状态，加载时按钮会自动禁用。

<div class="example">
    <h-button type="primary" loading>default</h-button>
</div>


::: details 查看代码

```vue
<template>
    <div>
        <h-button type="primary" loading>default</h-button>
    </div>
</template>

```
:::

## 图标按钮

使用 `icon` 属性来定义按钮的图标。

<div class="example">
    <h-button type="danger" icon="edit" />
    <h-button type="primary" icon="message" iconPosition="left">消息</h-button>
    <h-button type="success" icon="search" iconPosition="right">搜索</h-button>
</div>

::: details 查看代码

```vue
<template>
    <div>
        <h-button type="danger" icon="edit" />
        <h-button type="primary" icon="message" iconPosition="left">消息</h-button>
        <h-button type="success" icon="search" iconPosition="right">搜索</h-button>
    </div>
</template>
```
:::
