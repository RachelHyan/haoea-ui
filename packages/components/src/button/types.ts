import { ExtractDefaultPropTypes } from "vue";

export const ButtonType = ["default", "primary", "success", "warning", "danger", "link"];

export const ButtonSize = ["large", "medium", "small", "mini"];

export const buttonProps = {
    type: {
        type: String,
        // values: ButtonType,
        validator: (value: string) => {
            return ButtonType.includes(value);
        }
    },
    size: {
        type: String,
        // values: ButtonSize,
        validator: (value: string) => {
            return ButtonSize.includes(value);
        }
    },
};

export type ButtonProps = ExtractDefaultPropTypes<typeof buttonProps>;