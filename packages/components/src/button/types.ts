import { ExtractDefaultPropTypes } from "vue";

export const ButtonType = ["default", "primary", "success", "warning", "danger"];

export const ButtonSize = [ "medium", "small", "mini"];

export const buttonProps = {
    type: {
        type: String,
        validator: (value: string) => {
            return ButtonType.includes(value);
        }
    },
    size: {
        type: String,
        validator: (value: string) => {
            return ButtonSize.includes(value);
        }
    },
    icon: String,
    iconPosition: {
        type: String,
        validator: (value: string) => {
            return ["left", "right"].includes(value);
        }
    },
    loading: Boolean,
    disabled: Boolean,
    border: Boolean,
    round: Boolean,
    circle: Boolean,
    link:Boolean,
};

export type ButtonProps = ExtractDefaultPropTypes<typeof buttonProps>;