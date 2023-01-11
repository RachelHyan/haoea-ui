import { ExtractPropTypes } from "vue";

export const iconProps = {
    // icon name
    name: String,
    // icon color
    color: String,
    // icon size
    size: String,
    // dot mode
    dot: Boolean,
    // badge mode
    badge: [String, Number],
}

export type IconProps = ExtractPropTypes<typeof iconProps>;